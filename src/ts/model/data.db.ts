/// <reference path="../define.ts"/>
/// <reference path="data.db.stateful.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class DB implements DBInterface {

    constructor() {
      this.check_();
    }

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBKeyRange: IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    private database_: IDBDatabase
    private name_: string = NAME
    private version_: number = 7
    private refresh_: number = 10
    private upgrade_: number = 0 // 0:virtual 1:native
    private state_: State = State.blank

    private age_: number = 10 * 1000
    private expires_: number = 0
    private extend_(): void {
      this.expires_ = new Date().getTime() + this.age_;
    }

    private check_ = (): void => {
      if (!this.age_) { return; }

      if (new Date().getTime() > this.expires_) {
        State.open === this.state_ && this.close();
        this.extend_();
      }
      setTimeout(this.check_, Math.max(this.expires_ - new Date().getTime(), 100));
    }

    private tasks_: { (): void }[] = []

    stateful: DBStatefulInterface = new DBStatefulDown()

    stores = {
      meta: new MetaStore(this),
      history: new HistoryStore(this),
      server: new ServerStore(this)
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
      this.stateful = new DBStatefulUp(() => this.extend_(), this.tasks_);
      this.open();
    }

    down(): void {
      this.close();
      this.state_ = State.error;
      this.stateful = new DBStatefulDown();
    }

    open(): DBInstanceInterface {
      !this.IDBFactory && this.down();

      switch (this.state_) {
        case State.blank:
          this.create_();
          break;

        case State.initiate:
          break;

        case State.open:
          this.stateful.digestTask();
          break;

        case State.close:
          this.tasks_.length &&
          this.create_();
          break;

        case State.error:
          break;

        default:
          this.down();
      }
      return this.stateful;
    }

    close(): void {
      this.database_ && this.database_.close && this.database_.close();

      this.database_ = null;
      this.state_ = State.close;
    }

    private create_(): void {
      try {
        this.state_ = State.initiate;

        var req = this.IDBFactory.open(this.name_, this.upgrade_ ? this.version_ : 1);

        var that = this;
        req.onblocked = function () {
          that.database_ = this.result;
          that.close();
          setTimeout(() => that.open(), 1000);
        };

        req.onupgradeneeded = function () {
          that.database_ = this.result;
          that.createStores_();
          that.database_ = null;
        };

        req.onsuccess = function () {
          that.database_ = this.result;

          that.verify_(that.version_, () => {
            that.database_ = this.result;
            that.state_ = State.open;

            that.stateful.digestTask();
          });

          that.database_ = null;
        };

        req.onerror = function (event) {
          that.database_ = this.result;
          that.down();
        };
      } catch (err) {
        that.down();
      }
    }

    private destroy_(success?: () => void, failure?: () => void): void {
      try {
        this.close();
        var IDBFactory = this.IDBFactory;
        var req = IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
        this.state_ = State.initiate;
        if (req) {
          req.onsuccess = success;
          req.onerror = failure;
        }
      } catch (err) {
        this.down();
      }
    }

    private format_(delay?: number): void {
      var retry = () => this.destroy_(() => this.up(), () => this.down());
      !delay ? retry() : void setTimeout(retry, delay);
    }

    private verify_(version: number, success: () => void): void {
      var that = this,
          db = this.database(),
          scheme = this.meta,
          meta = this.stores.meta,
          format = () => this.format_();

      if (db.objectStoreNames.length !== Object.keys(this.stores).length) {
        return void format();
      }

      for (var i in this.stores) {
        var store = db.transaction((<StoreInterface<void>>this.stores[i]).name, 'readonly').objectStore((<StoreInterface<void>>this.stores[i]).name);
        switch (false) {
          case store.keyPath === that.stores[i].keyPath:
          case store.indexNames.length === that.stores[i].indexes.length:
            return void format();
        }
      }

      var cancel = false;

      meta.get(scheme.version.key, function () {
        // version check
        var data: MetaStoreSchema = this.result;
        if (!data || that.upgrade_) {
          meta.set(meta.setBuffer({ key: scheme.version.key, value: version }));
        } else if (data.value < version) {
          cancel = true;
          format();
        } else if (data.value > version) {
          cancel = true;
          that.down();
        }
      });

      meta.get(scheme.update.key, function () {
        // refresh check
        if (cancel) { return; }
        var data: MetaStoreSchema = this.result;
        var days: number = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
        if (!data || !that.refresh_) {
          meta.set(meta.setBuffer({ key: scheme.update.key, value: days + that.refresh_ }));
        } else if (data.value <= days) {
          return void format();
        }
        success();
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
