/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.log.ts"/>
/// <reference path="data.store.server.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class DataDB implements DataDBInterface {
    constructor() {
      var check = () => {
        var now = new Date().getTime(),
            expires = this.conExpires_;
        if (expires && now > expires) {
          this.closedb();
          this.conExpires_ = 0;
        }
        setTimeout(check, Math.max(this.conExpires_ - now + 100, this.conInterval_));
      }
      this.conAge_ && setTimeout(check, this.conInterval_);
    }

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBKeyRange: IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    database_: IDBDatabase
    name_: string = NAME
    version_: number = 4
    refresh_: number = 10
    upgrade_: number = 1 // 0:virtual 1:naitive
    state_: State = State.wait
    nowInitializing: boolean = false
    nowRetrying: boolean = false
    conAge_: number = 10 * 1000
    conExpires_: number
    conInterval_: number = 1000
    state(): State { return this.state_; }
    store = {
      meta: new MODEL.DataStoreMeta<MetaSchema>(this),
      history: new MODEL.DataStoreHistory<HistorySchema>(this),
      log: new MODEL.DataStoreLog<LogSchema>(this),
      server: new MODEL.DataStoreServer<ServerSchema>(this)
    }
    metaNames = {
      version: 'version',
      update: 'update'
    }

    opendb(success: () => void, noRetry?: boolean): void {
      var that = this;

      if (!that.IDBFactory) { return; }

      that.conExtend_();

      try {
        that.nowInitializing = true;

        var request = that.IDBFactory.open(that.name_, that.upgrade_ ? that.version_ : 1);

        request.onblocked = function () {
          this.result.close();
          !noRetry && that.initdb_(success, 1000);
        };

        request.onupgradeneeded = function () {
          try {
            var database: IDBDatabase = this.result;
            
            for (var i = database.objectStoreNames ? database.objectStoreNames.length : 0; i--;) { database.deleteObjectStore(database.objectStoreNames[i]); }

            database.createObjectStore(that.store.meta.name, { keyPath: that.store.meta.keyPath, autoIncrement: false }).createIndex(that.store.meta.keyPath, that.store.meta.keyPath, { unique: true });

            database.createObjectStore(that.store.history.name, { keyPath: that.store.history.keyPath, autoIncrement: false }).createIndex('date', 'date', { unique: false });

            database.createObjectStore(that.store.log.name, { keyPath: that.store.log.keyPath, autoIncrement: true }).createIndex('date', 'date', { unique: false });

            database.createObjectStore(that.store.server.name, { keyPath: that.store.server.keyPath, autoIncrement: false }).createIndex(that.store.server.keyPath, that.store.server.keyPath, { unique: true });
          } catch (err) {
            !noRetry && that.initdb_(success, 1000);
          }
        };

        request.onsuccess = function () {
          try {
            var database: IDBDatabase = this.result;
            
            that.checkdb_(database, that.version_, () => {
              that.database_ = database;
              that.state_ = State.ready;
              that.conExtend_();
              that.nowInitializing = false;

              success();

              that.nowRetrying = false;
            }, () => {
              !noRetry && that.initdb_(success);
            });
          } catch (err) {
            database.close();
            !noRetry && that.initdb_(success, 1000);
          }
        };

        request.onerror = function (event) {
          !noRetry && that.initdb_(success, 1000);
        };
      } catch (err) {
        !noRetry && that.initdb_(success, 1000);
      }
    }

    closedb(): void {
      var database = this.database_;
      this.database_ = null;
      this.state_ = State.wait;
      database && database.close && database.close();
    }

    deletedb(): void {
      this.closedb();
      var IDBFactory = this.IDBFactory;
      IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
    }

    initdb_(success: () => void, delay?: number): void {
      var retry = () => {
        if (!this.nowRetrying) {
          this.nowRetrying = true;
          this.deletedb();
        }
        this.opendb(success, true);
      };

      !delay ? retry() : void setTimeout(retry, delay);
    }

    checkdb_(database: IDBDatabase, version: number, success: () => void, upgrade: () => void): void {
      var that = this;

      var req = database.transaction(that.store.meta.name, 'readwrite').objectStore(that.store.meta.name).get(that.metaNames.version);
      req.onsuccess = function () {
        // version check
        var data: MetaSchema = this.result;
        if (!data || that.upgrade_) {
          this.source.put(<MetaSchema>{ id: that.metaNames.version, value: version });
        } else if (data.value !== version) {
          return void upgrade();
        }

        if (that.refresh_) {
          var req = database.transaction(that.store.meta.name, 'readwrite').objectStore(that.store.meta.name).get(that.metaNames.update);
          req.onsuccess = function () {
            // refresh check
            var data: MetaSchema = this.result;
            var days: number = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
            if (!data) {
              this.source.put(<MetaSchema>{ id: that.metaNames.update, value: days + that.refresh_ });
            } else if (data.value <= days) {
              return void upgrade();
            }
            success();
          };
        } else {
          success();
        }
      };
    }

    conExtend_(): void {
      this.conExpires_ = new Date().getTime() + this.conAge_;
    }

  }

}
