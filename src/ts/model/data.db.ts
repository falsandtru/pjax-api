/// <reference path="../define.ts"/>
/// <reference path="data.db.stateful.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {

  export class Database implements DatabaseInterface {

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBKeyRange: IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    private database_: IDBDatabase
    private name_: string = DEF.NAME
    private version_: number = 8
    private refresh_: number = 10
    private upgrade_: number = 0 // 0:virtual 1:native
    private state_: State = State.blank

    private age_: number = 10 * 1000
    private expires_: number = 0
    private extend_(): void {
      this.expires_ = new Date().getTime() + this.age_;
      clearTimeout(this.timer_);
      this.timer_ = setTimeout(() => this.check_(), this.age_);
    }

    private timer_: number = 0
    private check_(): void {
      if (!this.age_ || new Date().getTime() <= this.expires_) { return; }

      State.open === this.state() && this.close();
    }
    
    public state(): State { return this.state_; }
    private stateful_: DatabaseStatefulInterface = new DB.Stateful(this, () => this.connect_(), () => this.extend_())

    stores = {
      meta: new STORE.Meta(this),
      history: new STORE.History(this),
      server: new STORE.Server(this)
    }
    meta = {
      version: { key: 'version', value: undefined },
      update: { key: 'update', value: undefined }
    }

    database(): IDBDatabase {
      this.extend_();
      return this.database_;
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
      return this.stateful_.open();
    }

    close(): void {
      this.database_ && this.database_.close && this.database_.close();
      this.state_ = State.close;
    }

    resolve(): void {
      this.stateful_.resolve();
    }

    reject(): void {
      this.stateful_.reject();
    }

    private connect_(): void{
      this.create_();
    }

    // 以降、connect_()以外からアクセス禁止

    private create_(): void {
      try {
        this.close();
        this.state_ = State.initiate;

        var req = this.IDBFactory.open(this.name_, this.upgrade_ ? this.version_ : 1);

        var verify = () => {
          this.verify_(this.version_, () => {
            this.state_ = State.open;
            this.resolve();
            this.extend_();
          });
        };

        if ('done' === req.readyState) {
          this.database_ = req.result;
          if (this.database()) {
            verify();
          } else {
            this.format_();
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
            this.createStores_();
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

    private destroy_(success?: () => void, failure?: () => void): void {
      try {
        this.close();
        this.state_ = State.terminate;

        var req = this.IDBFactory.deleteDatabase(this.name_);
        
        if (req) {
          req.onsuccess = success;
          req.onerror = failure;
        }
        setTimeout(() => State.terminate === this.state() && this.down(), 3000);
      } catch (err) {
        this.down();
      }
    }

    private format_(): void {
      this.destroy_(() => this.up(), () => this.down());
    }

    private verify_(version: number, success: () => void): void {
      var db = this.database(),
          scheme = this.meta,
          meta = this.stores.meta,
          failure = () => this.format_();

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
        if (!data || this.upgrade_) {
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
        if (!data || !this.refresh_) {
          meta.set(meta.setBuffer({ key: scheme.update.key, value: days + this.refresh_ }));
          success();
        } else if (data.value > days) {
          success();
        } else if (data.value <= days) {
          failure();
        }
      });
    }

    private createStores_(): void {
      this.destroyStores_();

      var db = this.database();
      for (var i in this.stores) {
        var schema = <StoreInterface<void>>this.stores[i];
        var store = db.createObjectStore(schema.name, { keyPath: schema.keyPath, autoIncrement: schema.autoIncrement });
        for (var j = 0, indexes = schema.indexes, index: StoreIndexOptionInterface; index = indexes[j]; j++) {
          store.createIndex(index.name, index.keyPath, index.option);
        }
      }
    }

    private destroyStores_(): void {
      var db = this.database();
      for (var i = db.objectStoreNames ? db.objectStoreNames.length : 0; i--;) {
        db.deleteObjectStore(db.objectStoreNames[i]);
      }
    }

  }

}
