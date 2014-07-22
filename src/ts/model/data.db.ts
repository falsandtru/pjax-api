/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.log.ts"/>
/// <reference path="data.store.server.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataDB implements DataDBInterface {

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBKeyRange: IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    database_: IDBDatabase
    name_: string = MODULE.NAME
    version_: number = 3
    retry_: number = 0
    store_ = {
      meta: new DataStoreMeta<MetaSchema>(this),
      history: new DataStoreHistory<HistorySchema>(this),
      log: new DataStoreLog<LogSchema>(this),
      server: new DataStoreServer<ServerSchema>(this)
    }
    storeNames = {
      meta: this.store_.meta.name,
      history: this.store_.history.name,
      log: this.store_.log.name,
      server: this.store_.server.name
    }
    metaNames = {
      version: 'version'
    }

    opendb(setting: SettingInterface): void {
      var that = this;

      setting.database = false;
      if (!that.IDBFactory) { return; }

      try {
        var days: number = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)),
            version: number = parseInt(days - days % 10 + that.version_ + '', 10);

        var request = that.IDBFactory.open(that.name_);

        request.onblocked = function () { };

        request.onupgradeneeded = function () {
          var database: IDBDatabase = this.result;
          try {
            for (var i = database.objectStoreNames ? database.objectStoreNames.length : 0; i--;) { database.deleteObjectStore(database.objectStoreNames[i]); }

            database.createObjectStore(that.store_.meta.name, { keyPath: that.store_.meta.keyPath, autoIncrement: false }).createIndex(that.store_.meta.keyPath, that.store_.meta.keyPath, { unique: true });

            database.createObjectStore(that.store_.history.name, { keyPath: that.store_.history.keyPath, autoIncrement: false }).createIndex('date', 'date', { unique: false });

            database.createObjectStore(that.store_.log.name, { keyPath: that.store_.log.keyPath, autoIncrement: true }).createIndex('date', 'date', { unique: false });

            database.createObjectStore(that.store_.server.name, { keyPath: that.store_.server.keyPath, autoIncrement: false }).createIndex(that.store_.server.keyPath, that.store_.server.keyPath, { unique: true });
          } catch (err) {
            3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 1000);
          }
        };

        request.onsuccess = function () {
          try {
            var database: IDBDatabase = this.result;
            that.database_ = database;
            
            that.checkdb_(setting, version, function () {
              that.saveTitle(M.convertUrlToKeyUrl(setting.origLocation.href), document.title);
              that.saveScrollPosition(M.convertUrlToKeyUrl(setting.origLocation.href), jQuery(window).scrollLeft(), jQuery(window).scrollTop());
            });
          } catch (err) {
            3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 'number' === typeof err ? err : 1000);
          }
        };

        request.onerror = function (event) {
          3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 1000);
        };
      } catch (err) {
        3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 1000);
      }
    }

    closedb(): void {
      var database = this.database_;
      database && database.close && database.close();
    }

    deletedb(): void {
      this.closedb();
      var IDBFactory = this.IDBFactory;
      IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
    }

    initdb_(setting: SettingInterface): void {
      this.deletedb();
      this.opendb(setting);
    }

    checkdb_(setting: SettingInterface, version: number, success: () => void): void {
      var that = this;
      if (!that.accessStore(that.store_.meta.name)) { throw 0; }

      this.accessRecord(this.store_.meta.name, this.metaNames.version, function () {
        // version check
        var data: MetaSchema = this.result;
        if (!data) {
          this.source.put(<MetaSchema>{ id: that.metaNames.version, value: version });
        } else
        if (version !== data.value) {
          return that.initdb_(setting);
        }

        // store check
        var storeHistory: IDBObjectStore = that.accessStore(that.store_.history.name);
        if (!storeHistory) { 3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 1000); }

        success();

        setting.database = true;
      });
    }

    accessStore(name: string, mode: string = 'readwrite'): IDBObjectStore {
      return this.store_[name].accessStore();
    }

    accessRecord(storeName: string, key: string, success: (event?: Event) => void): void {
      return this.store_[storeName].accessRecord(key, success);
    }
    
    getBuffer(storeName: string): Object
    getBuffer(storeName: string, key: string): any
    getBuffer(storeName: string, key: number): any
    getBuffer(storeName: string, key?: any): any {
      if (storeName && this.store_[storeName]) {
        return this.store_[storeName].getBuffer(key);
      }
    }

    setBuffer(storeName: string): any {
      if (storeName && this.store_[storeName]) {
        return this.store_[storeName].setBuffer();
      }
    }

    loadBuffer(storeName: string, limit: number = 0): void {
      if (storeName && this.store_[storeName]) {
        this.store_[storeName].loadBuffer(limit);
      }
    }

    saveBuffer(storeName: string): void {
      if (storeName && this.store_[storeName]) {
        this.store_[storeName].saveBuffer();
      }
    }

    loadTitle(keyUrl: string): void {
      var data = <HistorySchema>this.store_.history.getBuffer(keyUrl);

      if (data && 'string' === typeof data.title) {
        document.title = data.title;
      } else {
        this.store_.history.get(keyUrl, function () {
          keyUrl === M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(window.location.href)) &&
          this.result && this.result.title && (document.title = this.result.title);
        });
      }
    }

    saveTitle(keyUrl: string, title: string): void {
      var value = <HistorySchema>{ id: keyUrl, title: title, date: new Date().getTime() };
      this.store_.history.setBuffer(keyUrl, value, true);
      this.store_.history.put(value);
      this.store_.history.clean();
    }

    loadScrollPosition(keyUrl: string): void {
      var data = <HistorySchema>this.store_.history.getBuffer(keyUrl);

      if (data && 'number' === typeof data.scrollX) {
        window.scrollTo(parseInt(Number(data.scrollX) + '', 10), parseInt(Number(data.scrollY) + '', 10));
      } else {
        this.store_.history.get(keyUrl, function () {
          if (!this.result || keyUrl !== this.result.id) { return; }
          isFinite(this.result.scrollX) && isFinite(this.result.scrollY) &&
          window.scrollTo(parseInt(Number(this.result.scrollX) + '', 10), parseInt(Number(this.result.scrollY) + '', 10));
        });
      }
    }

    saveScrollPosition(keyUrl: string, scrollX: number, scrollY: number): void {
      var value = <HistorySchema>{ id: keyUrl, scrollX: scrollX, scrollY: scrollY, date: new Date().getTime() };
      this.store_.history.setBuffer(keyUrl, value, true);
      this.store_.history.put(value);
    }

    loadExpires(keyUrl: string): void {
    }

    saveExpires(keyUrl: string, host: string, expires: number): void {
      var value = <HistorySchema>{ id: keyUrl, host: host, expires: expires };
      this.store_.history.setBuffer(keyUrl, value, true);
      this.store_.history.put(value);
    }

    loadLog(): void {
    }

    saveLog(log: LogSchema): void {
      this.store_.log.addBuffer(log);
      this.store_.log.add(log);
      this.store_.log.clean();
    }

    loadServer(): void {
    }

    saveServer(host: string, state: number): void {
      var value = <ServerSchema>{ id: host || '', state: state };
      this.store_.server.setBuffer(host, value);
      this.store_.server.put(value);
    }

  }
}
