/// <reference path="../define.ts"/>
/// <reference path="data.db.stateful.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {

  export class Database implements DatabaseInterface {

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBKeyRange: typeof IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    protected name: string = DEF.NAME
    protected version: number = 8
    protected refresh: number = 10
    protected upgrade: number = 0 // 0:virtual 1:native
    protected state_: State = State.blank
    state(): State { return this.state_; }
    protected stateful: DatabaseStatefulInterface = new DB.Stateful(this, () => this.connect(), () => this.extend())

    protected age: number = 10 * 1000
    protected expires: number = 0
    protected extend(): void {
      this.expires = new Date().getTime() + this.age;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.check(), this.age);
    }

    protected timer: number = 0
    protected check(): void {
      if (!this.age || new Date().getTime() <= this.expires) { return; }

      State.open === this.state() && this.close();
    }

    protected database_: IDBDatabase
    database(): IDBDatabase {
      this.extend();
      return this.database_;
    }

    stores = {
      meta: new STORE.Meta(this),
      history: new STORE.History(this),
      server: new STORE.Server(this)
    }
    meta = {
      version: { key: 'version', value: undefined },
      update: { key: 'update', value: undefined }
    }

    up(): void {
      this.state_ = State.blank;
      this.open();
    }

    down(): void {
      this.reject();
      this.close();
      this.state_ = State.error;
    }

    open(): DatabaseTaskReserveInterface {
      !this.IDBFactory && this.down();
      return this.stateful.open();
    }

    close(): void {
      this.database_ && this.database_.close && this.database_.close();
      this.state_ = State.close;
    }

    resolve(): void {
      this.stateful.resolve();
    }

    reject(): void {
      this.stateful.reject();
    }

    protected connect(): void{
      this.create();
    }

    // 以降、connect()以外からアクセス禁止

    protected create(): void {
      try {
        this.close();
        this.state_ = State.initiate;

        var req = this.IDBFactory.open(this.name, this.upgrade ? this.version : 1);

        var verify = () => {
          this.verify(this.version, () => {
            this.state_ = State.open;
            this.resolve();
            this.extend();
          });
        };

        if ('done' === req.readyState) {
          this.database_ = req.result;
          if (this.database()) {
            verify();
          } else {
            this.format();
          }
        } else {
          var timer = setTimeout(() => this.down(), 3000);

          req.onblocked = () => {
            clearTimeout(timer);
            this.database_ = req.result;
            this.close();
            setTimeout(() => this.open(), 1000);
          };

          req.onupgradeneeded = () => {
            clearTimeout(timer);
            this.database_ = req.result;
            this.createStores();
          };

          req.onsuccess = () => {
            clearTimeout(timer);
            this.database_ = req.result;
            verify();
          };

          req.onerror = () => {
            clearTimeout(timer);
            this.database_ = req.result;
            this.down();
          };
        }
      } catch (err) {
        this.down();
      }
    }

    protected destroy(success?: () => void, failure?: () => void): void {
      try {
        this.close();
        this.state_ = State.terminate;

        var req = this.IDBFactory.deleteDatabase(this.name);
        
        if (req) {
          req.onsuccess = success;
          req.onerror = failure;
        }
        setTimeout(() => State.terminate === this.state() && this.down(), 3000);
      } catch (err) {
        this.down();
      }
    }

    protected format(): void {
      this.destroy(() => this.up(), () => this.down());
    }

    protected verify(version: number, success: () => void): void {
      var db = this.database(),
          scheme = this.meta,
          meta = this.stores.meta,
          failure = () => this.format();

      if (db.objectStoreNames.length !== Object.keys(this.stores).length) {
        return void failure();
      }

      for (var i in this.stores) {
        var store = db.transaction((<StoreInterface<void>>this.stores[i]).name, 'readonly').objectStore((<StoreInterface<void>>this.stores[i]).name);
        switch (false) {
          case store.keyPath === this.stores[i].keyPath:
          case store.indexNames.length === this.stores[i].indexes.length:
            return void failure();
        }
      }

      var cancel = false;

      meta.get(scheme.version.key, (event) => {
        // version check
        if (cancel) { return; }
        var data: MetaStoreSchema = (<IDBRequest>event.target).result;
        if (!data || this.upgrade) {
          meta.set(meta.setBuffer({ key: scheme.version.key, value: version }));
        } else if (data.value > version) {
          cancel = true;
          this.down();
        } else if (data.value < version) {
          cancel = true;
          failure();
        }
      });

      meta.get(scheme.update.key, (event) => {
        // refresh check
        if (cancel) { return; }
        var data: MetaStoreSchema = (<IDBRequest>event.target).result;
        var days: number = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
        if (!data || !this.refresh) {
          meta.set(meta.setBuffer({ key: scheme.update.key, value: days + this.refresh }));
          success();
        } else if (data.value > days) {
          success();
        } else if (data.value <= days) {
          failure();
        }
      });
    }

    protected createStores(): void {
      this.destroyStores();

      var db = this.database();
      for (var i in this.stores) {
        var schema = <StoreInterface<void>>this.stores[i];
        var store = db.createObjectStore(schema.name, { keyPath: schema.keyPath, autoIncrement: schema.autoIncrement });
        for (var j = 0, indexes = schema.indexes, index: StoreIndexOptionInterface; index = indexes[j]; j++) {
          store.createIndex(index.name, index.keyPath, index.option);
        }
      }
    }

    protected destroyStores(): void {
      var db = this.database();
      for (var i = db.objectStoreNames ? db.objectStoreNames.length : 0; i--;) {
        db.deleteObjectStore(db.objectStoreNames[i]);
      }
    }

  }

}
