/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
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
    version_: number = 2
    retry_: number = 0
    store: {
      meta: DataStoreMetaInterface
      history: DataStoreHistoryInterface
    } = {
      meta: new DataStoreMeta(this),
      history: new DataStoreHistory(this)
    }
    meta_ = {
      version: 'version'
    }

    opendb(setting: SettingInterface): void {
      var that = this,
          IDBDatabase: IDBDatabase = that.database_,
          IDBOpenDBRequest: IDBOpenDBRequest;

      setting.database = false;
      if (!that.IDBFactory) { return; }

      try {
        var days: number = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)),
            version: number = parseInt(days - days % 10 + that.version_ + '', 10);

        IDBOpenDBRequest = that.IDBFactory.open(that.name_);

        IDBOpenDBRequest.onblocked = function () { };

        IDBOpenDBRequest.onupgradeneeded = function () {
          var IDBDatabase: IDBDatabase = this.result;
          try {
            for (var i = IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0; i--;) { IDBDatabase.deleteObjectStore(IDBDatabase.objectStoreNames[i]); }
            IDBDatabase.createObjectStore(that.store.meta.name, { keyPath: 'id', autoIncrement: false });
            IDBDatabase.createObjectStore(that.store.history.name, { keyPath: 'id', autoIncrement: false }).createIndex('date', 'date', { unique: false });
          } catch (err) {
            3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 1000);
          }
        };

        IDBOpenDBRequest.onsuccess = function () {
          try {
            IDBDatabase: IDBDatabase = this.result;
            that.database_ = IDBDatabase;
            
            that.checkdb_(setting, version, function () {
              that.saveTitle(M.convertUrlToKeyUrl(setting.origLocation.href), document.title);
              that.saveScrollPosition(M.convertUrlToKeyUrl(setting.origLocation.href), jQuery(window).scrollLeft(), jQuery(window).scrollTop());
            });
          } catch (err) {
            3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 'number' === typeof err ? err : 1000);
          }
        };

        IDBOpenDBRequest.onerror = function (event) {
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
      if (!that.accessStore(that.store.meta.name)) { throw 0; }

      this.accessRecord(this.store.meta.name, this.meta_.version, function () {
        // version check
        var data = this.result;
        if (!data) {
          this.source.put({ id: that.meta_.version, value: version });
        } else
        if (version !== data.value) {
          return that.initdb_(setting);
        }

        // store check
        var storeHistory: IDBObjectStore = that.accessStore(that.store.history.name);
        if (!storeHistory) { 3 > that.retry_++ && setTimeout(() => that.initdb_(setting), 1000); }

        success();

        setting.database = true;
      });
    }

    accessStore(name: string, mode: string = 'readwrite'): IDBObjectStore {
      var IDBDatabase: IDBDatabase = this.database_;
      for (var i = IDBDatabase && IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0; i--;) {
        if (name === IDBDatabase.objectStoreNames[i]) {
          return IDBDatabase && IDBDatabase.transaction && IDBDatabase.transaction(name, mode).objectStore(name);
        }
      }
      return null;
    }

    accessRecord(storeName: string, key: string, success: (event?: Event) => void): void {
      var store = this.accessStore(storeName);
      if (!store) { return; }

      store.get(key).onsuccess = success;
    }

    loadBuffer(storeName: string, limit: number): void {
      this.store[storeName].loadBuffer(limit);
    }

    saveBuffer(storeName: string): void {
      this.store[storeName].saveBuffer();
    }
    
    getBuffer(storeName: string): BufferInterface
    getBuffer(storeName: string, key: string): BufferDataInterface
    getBuffer(storeName: string, key?: string): any {
      return this.store[storeName].getBuffer(key);
    }

    setBuffer(storeName: string, key: string, value: BufferDataInterface, isMerge?: boolean): BufferDataInterface {
      return this.store[storeName].setBuffer(key, value, isMerge);
    }

    loadTitle(keyUrl: string): void {
      this.store.history.loadTitle(keyUrl);
    }

    saveTitle(keyUrl: string, title: string): void {
      this.store.history.saveTitle(keyUrl, title);
    }

    loadScrollPosition(keyUrl: string): void {
      this.store.history.loadScrollPosition(keyUrl);
    }

    saveScrollPosition(keyUrl: string, scrollX: number, scrollY: number): void {
      this.store.history.saveScrollPosition(keyUrl, scrollX, scrollY);
    }

  }
}
