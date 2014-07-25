/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStore<T> implements DataStoreInterface<T> {
    constructor(DB: DataDBInterface) {
      this.DB_ = DB;
    }

    DB_: DataDB

    name: string
    keyPath: string

    buffer_: T[] = []

    accessStore = (mode: string = 'readwrite'): IDBObjectStore => {
      var database: IDBDatabase = this.DB_.database_;
      if (database && database.transaction && database.objectStoreNames) {
        var objectStoreNames = database.objectStoreNames;
        for (var i in objectStoreNames) {
          if (objectStoreNames[i] !== this.name) { continue; }
          return database.transaction(this.name, mode).objectStore(this.name);
        }
      }
    }

    accessRecord = (key: string, success: (event?: Event) => void): void => {
      var store = this.accessStore();
      if (!store) { return; }

      store.get(key).onsuccess = success;
    }
    
    loadBuffer(limit?: number): void {
      var that = this,
          store = this.accessStore();
      if (!store) { return; }

      var index = store.indexNames.length ? store.indexNames[0] : store.keyPath;
      store.index(index).openCursor(this.DB_.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
        if (!this.result) { return; }

        var IDBCursor = this.result,
            data = <T>IDBCursor.value;
        that.buffer_[data[store.keyPath]] = data;
        if (!--limit) { return; }

        IDBCursor['continue'] && IDBCursor['continue']();
      }
    }

    saveBuffer(): void {
    }
    
    getBuffer(): Object
    getBuffer(key: string): T
    getBuffer(key: number): T
    getBuffer(key?: any): any {
      return key ? this.buffer_[key] : this.buffer_;
    }
    
    setBuffer(key: string, value: T, isMerge?: boolean): T {
      this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
      return this.buffer_[key];
    }

    addBuffer(value: T): T {
      value[this.keyPath] = this.buffer_.length || 1;
      this.buffer_.push(value);
      return value;
    }

    add(value: T): void {
      var store = this.accessStore();
      if (!store) { return; }

      delete value[this.keyPath];
      store.add(value);
    }

    put(value: T): void {
      this.accessRecord(value[this.keyPath], function () {
        this.source.put(jQuery.extend(true, {}, this.result, value));
      });
    }
    
    get(key: number, success: (event: Event) => void): void
    get(key: string, success: (event: Event) => void): void
    get(key: any, success: (event: Event) => void): void {
      var store = this.accessStore();
      if (!store) { return; }

      store.get(key).onsuccess = success;
    }

  }
}
