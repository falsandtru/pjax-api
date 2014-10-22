/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class DB implements DBInterface {
    constructor() {
      var check = () => {
        var now = new Date().getTime(),
            expires = this.conExpires_;
        if (expires && now > expires) {
          this.closedb();
          this.conExpires_ = 0;
        }
        setTimeout(check, Math.max(this.conExpires_ - now + 100, this.conInterval_));
        this.tasks_.length && State.initiate !== this.state() && this.opendb(null, true);
      }
      this.conAge_ && setTimeout(check, this.conInterval_);
    }

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBKeyRange: IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    private database_: IDBDatabase
    private name_: string = NAME
    private version_: number = 7
    private refresh_: number = 10
    private upgrade_: number = 0 // 0:virtual 1:native
    private state_: State = State.blank
    database = () => this.database_
    state = () => this.state_

    private conAge_: number = 10 * 1000
    private conExpires_: number = 0
    private conInterval_: number = 1000
    private tasks_: { (): void }[] = []

    stores = {
      meta: new MetaStore<MetaStoreSchema>(this),
      history: new HistoryStore<HistoryStoreSchema>(this),
      server: new ServerStore<ServerStoreSchema>(this)
    }
    meta = {
      version: { key: 'version', value: undefined },
      update: { key: 'update', value: undefined }
    }

    opendb(task?: () => void, noRetry?: boolean): void {
      if (!this.IDBFactory) { return; }

      var that = this;

      that.conExtend();

      if (State.blank === that.state()) {
        task = 'function' === typeof task ? task : () => undefined;
      }

      'function' === typeof task && that.reserveTask_(task);

      if (!that.tasks_.length) { return; }
      if (State.initiate === that.state()) { return; }

      try {
        that.state_ = State.initiate;

        var request = that.IDBFactory.open(that.name_, that.upgrade_ ? that.version_ : 1);

        request.onblocked = function () {
          that.closedb(State.pause);
          try {
            this.result.close();
            !noRetry && setTimeout(() => that.opendb(null, true), 1000);
          } catch (err) {
            !noRetry && that.initdb_(1000);
          }
        };

        request.onupgradeneeded = function () {
          try {
            var database: IDBDatabase = this.result;

            that.createStore_(database);
          } catch (err) {
            !noRetry && that.initdb_(1000);
          }
        };

        request.onsuccess = function () {
          try {
            var database: IDBDatabase = this.result;

            that.database_ = database;

            that.checkdb_(database, that.version_, () => {
              that.database_ = database;
              that.state_ = State.open;
              that.conExtend();

              that.digestTask_();
            }, () => {
              !noRetry && that.initdb_();
            });

            that.database_ = null;
          } catch (err) {
            database.close();
            !noRetry && that.initdb_(1000);
          }
        };

        request.onerror = function (event) {
          that.closedb(State.error);
          try {
            this.result.close();
            !noRetry && setTimeout(() => that.opendb(null, true), 1000);
          } catch (err) {
            !noRetry && that.initdb_(1000);
          }
        };
      } catch (err) {
        that.closedb(State.error);
        !noRetry && that.initdb_(1000);
      }
    }

    closedb(state: State = State.close): void {
      this.database() && this.database().close && this.database().close();

      this.database_ = null;
      this.state_ = state;
    }

    conExtend(): void {
      this.conExpires_ = new Date().getTime() + this.conAge_;
    }

    private initdb_(delay?: number): void {
      var retry = () => {
        this.deletedb_(() => this.opendb(null, true));
      };

      !delay ? retry() : void setTimeout(retry, delay);
    }

    private deletedb_(success?: () => void, failure?: () => void): void {
      this.closedb();
      var IDBFactory = this.IDBFactory;
      var request = IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
      if (request) {
        request.onsuccess = success;
        request.onerror = failure;
      }
    }

    private checkdb_(database: IDBDatabase, version: number, success: () => void, upgrade: () => void): void {
      var that = this,
          scheme = this.meta,
          store = this.stores.meta;

      store.get(scheme.version.key, function () {
        // version check
        var data: MetaStoreSchema = this.result;
        if (!data || that.upgrade_) {
          store.set(store.setBuffer({ key: scheme.version.key, value: version }));
        } else if (data.value < version) {
          upgrade();
        } else if (data.value > version) {
          that.closedb(State.error);
        }
      });

      store.get(scheme.update.key, function () {
        // refresh check
        var data: MetaStoreSchema = this.result;
        var days: number = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
        if (!data || !that.refresh_) {
          store.set(store.setBuffer({ key: scheme.update.key, value: days + that.refresh_ }));
        } else if (data.value <= days) {
          return void upgrade();
        }
        success();
      });
    }

    private createStore_(database: IDBDatabase): void {
      for (var i = database.objectStoreNames ? database.objectStoreNames.length : 0; i--;) {
        database.deleteObjectStore(database.objectStoreNames[i]);
      }

      for (var i in this.stores) {
        var schema = <StoreInterface<void>>this.stores[i];
        var store = database.createObjectStore(schema.name, { keyPath: schema.keyPath, autoIncrement: schema.autoIncrement });
        for (var j = 0, indexes = schema.indexes, index: StoreIndexOptionInterface; index = indexes[j]; j++) {
          store.createIndex(index.name, index.keyPath, index.option);
        }
      }
    }

    private reserveTask_(task: () => void): void {
      this.tasks_.length > 200 && this.tasks_.splice(100, 100);
      (this.state() !== State.error || this.tasks_.length < 100) &&
      this.tasks_.push(task);
    }

    private digestTask_(): void {
      var task: () => void;
      while (task = this.tasks_.pop()) {
        task();
      }
    }

  }

}
