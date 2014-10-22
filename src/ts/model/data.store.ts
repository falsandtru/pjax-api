/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class Store<T> implements StoreInterface<T> {
    constructor(public DB: DBInterface) {
    }

    name: string
    keyPath: string
    autoIncrement: boolean = true
    indexes: StoreIndexOptionInterface[] = []

    buffer_: T[] = []

    accessStore(success: (store: IDBObjectStore) => void, mode: string = 'readwrite'): void {
      this.DB.conExtend();

      try {
        var database: IDBDatabase = this.DB.database(),
            store: IDBObjectStore = database && database.transaction(this.name, mode).objectStore(this.name);
      } catch (err) {
      }

      if (store) {
        success(store);
      } else {
        this.DB.opendb(() => this.accessStore(success));
      }
    }

    accessRecord(key: string, success: (event?: Event) => void, mode: string = 'readwrite'): void {
      this.accessStore((store) => {
        store.get(key).onsuccess = success;
      }, mode);
    }
    
    loadBuffer(limit: number = 0): void {
      var buffer = this.buffer_;
      this.accessStore((store) => {
        if (!store.indexNames.length) { return; }

        store.index(store.indexNames[0]).openCursor(this.DB.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
          if (!this.result) { return; }

          var cursor = this.result,
              value = <T>cursor.value,
              key = value[store.keyPath];
          buffer[key] = value;
          if (!--limit) { return; }

          cursor['continue'] && cursor['continue']();
        }
      });
    }

    saveBuffer(): void {
      var buffer = this.buffer_;
      this.accessStore(function (store) {
        for (var i in buffer) {
          store.put(buffer[i]);
        }
      });
    }

    getBuffers(): T[] {
      return this.buffer_;
    }

    getBuffer(key: string): T
    getBuffer(key: number): T
    getBuffer(key?: any): any {
      return this.buffer_[key];
    }

    setBuffers(values: T[], isMerge?: boolean): T[] {
      for (var i in values) {
        this.setBuffer(values[i], isMerge);
      }
      return this.buffer_;
    }

    setBuffer(value: T, isMerge?: boolean): T {
      var key = value[this.keyPath];
      this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
      return this.buffer_[key];
    }

    addBuffer(value: T): T {
      value[this.keyPath] = this.buffer_.length || 1;
      this.buffer_.push(value);
      return value;
    }
    
    removeBuffer(key: string): T
    removeBuffer(key: number): T
    removeBuffer(key: any): T {
      var ret = this.buffer_[key];
      if ('number' === typeof key) {
        this.buffer_.splice(key, 1);
      } else {
        delete this.buffer_[key];
      }
      return ret;
    }

    clearBuffer(): void {
      this.buffer_ = [];
    }
    
    get(key: number, success: (event: Event) => void): void
    get(key: string, success: (event: Event) => void): void
    get(key: any, success: (event: Event) => void): void {
      this.accessRecord(key, success);
    }

    set(value: T, isMerge?: boolean): void {
      if (!isMerge) { return this.put(value); }

      value = jQuery.extend(true, {}, value);
      var key = value[this.keyPath];
      this.accessRecord(key, function () {
        this.source.put(jQuery.extend(true, {}, this.result, value));
      });
    }

    add(value: T): void {
      value = jQuery.extend(true, {}, value);
      var key = value[this.keyPath];
      if (this.autoIncrement) {
        delete value[this.keyPath];
      }
      this.accessStore(function (store) {
        store.add(value);
      });
    }

    put(value: T): void {
      value = jQuery.extend(true, {}, value);
      var key = value[this.keyPath];
      this.accessStore(function (store) {
        store.put(value);
      });
    }

    remove(key: number): void
    remove(key: string): void
    remove(key: any): void {
      this.accessStore(function (store) {
        store['delete'](key);
      });
    }
    
  }

}
