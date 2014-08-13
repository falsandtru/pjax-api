/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class DataStore<T> implements DataStoreInterface<T> {
    constructor(DB: DataDBInterface) {
      this.DB_ = DB;
    }

    DB_: DataDBInterface

    name: string
    keyPath: string

    buffer_: T[] = []

    accessStore(success: (store: IDBObjectStore) => void, mode: string = 'readwrite'): void {
      this.DB_.conExtend();

      try {
        var database: IDBDatabase = this.DB_.database(),
            store: IDBObjectStore = database && database.transaction(this.name, mode).objectStore(this.name);
      } catch (err) {
      }

      if (store) {
        success(store);
      } else {
        this.DB_.opendb(() => this.accessStore(success));
      }
    }

    accessRecord(key: string, success: (event?: Event) => void, mode: string = 'readwrite'): void {
      this.accessStore((store) => {
        store.get(key).onsuccess = success;
      }, mode);
    }
    
    loadBuffer(limit: number = 0): void {
      var that = this;
      this.accessStore((store) => {
        var index = store.indexNames.length ? store.indexNames[0] : store.keyPath;
        store.index(index).openCursor(this.DB_.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
          if (!this.result) { return; }

          var IDBCursor = this.result,
            data = <T>IDBCursor.value;
          that.buffer_[data[store.keyPath]] = data;
          if (!--limit) { return; }

          IDBCursor['continue'] && IDBCursor['continue']();
        }
      });
    }

    saveBuffer(): void {
    }
    
    getBuffer(): T[]
    getBuffer(key: string): T
    getBuffer(key: number): T
    getBuffer(key?: any): any {
      return key ? this.buffer_[key] : this.buffer_;
    }
    
    setBuffer(value: T, isMerge?: boolean): T {
      var key = value[this.keyPath];
      this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
      return this.buffer_[value[this.keyPath]];
    }

    addBuffer(value: T): T {
      value[this.keyPath] = this.buffer_.length || 1;
      this.buffer_.push(value);
      return value;
    }

    add(value: T): void {
      var key = value[this.keyPath];
      delete value[this.keyPath];
      this.accessRecord(key, function () {
        'undefined' !== typeof key && this.source['delete'](key);
        this.source.add(value);
      });
    }

    set(value: T): void {
      var key = value[this.keyPath];
      this.accessRecord(key, function () {
        this.source.put(jQuery.extend(true, {}, this.result, value));
      });
    }
    
    get(key: number, success: (event: Event) => void): void
    get(key: string, success: (event: Event) => void): void
    get(key: any, success: (event: Event) => void): void {
      this.accessRecord(key, success);
    }
    
    del(key: number): void
    del(key: string): void
    del(key: any): void {
      this.accessRecord(key, function () {
        this.source['delete'](key);
      });
    }
    
  }

}
