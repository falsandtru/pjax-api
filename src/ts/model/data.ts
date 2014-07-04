/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  export class ModelData extends ModelTemplate implements ModelDataInterface {

    IDBFactory: IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    IDBDatabase: IDBDatabase
    IDBKeyRange: IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange

    openDB(setting: SettingInterface, count: number = 0): void {
      var name: string = setting.gns,
          version: number = 1,
          days: number = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)),
          IDBFactory: IDBFactory = DATA.IDBFactory,
          IDBDatabase: IDBDatabase = DATA.IDBDatabase,
          IDBOpenDBRequest: IDBOpenDBRequest,
          IDBObjectStore;

      setting.database = false;
      if (!IDBFactory || !name || count > 3) {
        return;
      }

      try {
        var retry = function(wait?: number) {
          DATA.IDBDatabase = undefined;
          IDBDatabase && IDBDatabase.close && IDBDatabase.close();
          IDBFactory.deleteDatabase(name);
          wait ? setTimeout(() => void DATA.openDB(setting, ++count), wait) : void DATA.openDB(setting, ++count);
        }

        version = parseInt(days - days % 7 + version + '', 10);
        IDBOpenDBRequest = IDBFactory.open(name);
        IDBOpenDBRequest.onblocked = function () { };
        IDBOpenDBRequest.onupgradeneeded = function () {
          var IDBDatabase: IDBDatabase = this.result;
          try {
            for (var i = IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0; i--;) { IDBDatabase.deleteObjectStore(IDBDatabase.objectStoreNames[i]); }
            IDBDatabase.createObjectStore(setting.gns, { keyPath: 'id', autoIncrement: false }).createIndex('date', 'date', { unique: false });
          } catch (err) {
          }
        };
        IDBOpenDBRequest.onsuccess = function () {
          try {
            IDBDatabase: IDBDatabase = this.result;
            DATA.IDBDatabase = IDBDatabase;
            if (IDBObjectStore = DATA.createStore_()) {
              IDBObjectStore.get('_version').onsuccess = function () {
                if (!this.result || version === this.result.title) {
                  DATA.updateVersionNumber_(version);
                  DATA.updateCurrentPage(setting.hashquery);
                  DATA.saveTitle(M.convertUrlToUrlKey(setting.origLocation.href, setting.hashquery), document.title);
                  DATA.saveScrollPosition(M.convertUrlToUrlKey(setting.origLocation.href, setting.hashquery), jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                  setting.database = true;
                } else {
                  retry();
                }
              };
            } else {
              retry();
            }
          } catch (err) {
            retry(1000);
          }
        };
        IDBOpenDBRequest.onerror = function (event) {
          retry(1000);
        };
      } catch (err) {
        retry(1000);
      }
    }

    createStore_(): IDBObjectStore {
      var IDBDatabase: IDBDatabase = DATA.IDBDatabase;
      for (var i = IDBDatabase && IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0; i--;) {
        if (M.NAME === IDBDatabase.objectStoreNames[i]) {
          return IDBDatabase && IDBDatabase.transaction && IDBDatabase.transaction(M.NAME, 'readwrite').objectStore(M.NAME);
        }
      }
      return null;
    }

    updateCurrentPage(isIncludeHash: boolean): void {
      var IDBObjectStore = DATA.createStore_();

      if (!IDBObjectStore) { return; }
      var secure_url: string = UTIL.canonicalizeUrl(M.convertUrlToUrlKey(window.location.href, isIncludeHash));
      IDBObjectStore.put({ id: '_current', title: secure_url });
    }

    updateVersionNumber_(version: number): void {
      var IDBObjectStore = DATA.createStore_();

      if (!IDBObjectStore) { return; }
      IDBObjectStore.put({ id: '_version', title: version });
    }

    accessRecord_(keyUrl: string, success: (event?: Event) => void): void {
      var IDBObjectStore = DATA.createStore_();

      if (!IDBObjectStore) { return; }
      IDBObjectStore.get(keyUrl).onsuccess = success;
    }

    loadTitle(keyUrl: string, isIncludeHash): void {
      DATA.accessRecord_(keyUrl, function () {
        keyUrl === UTIL.canonicalizeUrl(M.convertUrlToUrlKey(window.location.href, isIncludeHash)) &&
        this.result && this.result.title && (document.title = this.result.title);
      });
    }

    saveTitle(keyUrl: string, title: string): void {
      DATA.accessRecord_(keyUrl, function () {
        this.source.put(jQuery.extend(true, {}, this.result || {}, { id: keyUrl, title: title, date: new Date().getTime() }));
        DATA.clean_();
      });
    }

    loadScrollPosition(keyUrl: string): void {
      DATA.accessRecord_(keyUrl, function () {
        if (!this.result || !this.result.id || keyUrl !== this.result.id) { return; }
        this.source.get(keyUrl).onsuccess = function () {
          this.result && isFinite(this.result.scrollX) && isFinite(this.result.scrollY) &&
          window.scrollTo(parseInt(Number(this.result.scrollX) + '', 10), parseInt(Number(this.result.scrollY) + '', 10));
        }
      });
    }

    saveScrollPosition(keyUrl: string, scrollX: number, scrollY: number): void {
      DATA.accessRecord_(keyUrl, function () {
        if (!this.result || !this.result.id || keyUrl !== this.result.id) { return; }
        this.source.get(keyUrl).onsuccess = function () {
          this.source.put(jQuery.extend(true, {}, this.result || {}, { scrollX: parseInt(Number(scrollX) + '', 10), scrollY: parseInt(Number(scrollY) + '', 10) }));
        }
      });
    }

    clean_(): void {
      var IDBObjectStore = DATA.createStore_();
      IDBObjectStore.count().onsuccess = function () {
        if (1000 < this.result) {
          IDBObjectStore.index('date').openCursor(DATA.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
            var IDBCursor = this.result;
            if (IDBCursor) {
              IDBCursor['delete'](IDBCursor.value.id);
              IDBCursor['continue']();
            } else {
              IDBObjectStore.count().onsuccess = function () { 1000 < this.result && IDBObjectStore.clear(); }
            }
          }
        }
      };
    }

  }
  // 短縮登録
  export var DATA = new ModelData();
}
