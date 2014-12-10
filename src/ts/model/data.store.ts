/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class Store<T> implements StoreInterface<T> {
    constructor(public DB: DatabaseInterface) {
    }

    name: string
    keyPath: string
    autoIncrement: boolean = false 
    indexes: StoreIndexOptionInterface[] = []
    size: number = 100

    protected buffer: StoreSchemata<T> = {}
    protected diff: StoreSchemata<T> = {}

    protected accessStore(callback: (store: IDBObjectStore) => void, mode: string = 'readwrite'): void {
      try {
        var database: IDBDatabase = this.DB.database(),
            store: IDBObjectStore = database && database.transaction(this.name, mode).objectStore(this.name);
      } catch (err) {
      }

      if (store) {
        callback(store);
      } else {
        this.DB.open().done(() => this.accessStore(callback));
      }
    }

    protected accessCount(callback: (count: number) => void): void
    protected accessCount(index: string, callback: (count: number) => void): void
    protected accessCount(): void {
      var index: string = 'string' === typeof arguments[0] && arguments[0],
          callback: (count: number) => void = arguments[index ? 1 : 0];
      this.accessStore((store) => {
        var req = index ? store.index(index).count() : store.count();
        req.onsuccess = function () { callback.apply(this, [].slice.call(arguments, 1).concat(this.result)); };
      });
    }

    protected accessRecord(key: string, callback: (event?: Event) => void, mode?: string): void {
      this.accessStore((store) => {
        store.get(key).onsuccess = callback;
      }, mode);
    }

    protected accessCursor(index: string, range: IDBKeyRange, direction: string, callback: (event?: Event) => void): void {
      this.accessStore(function (store) {
        var req: IDBRequest;
        if (direction && range) {
          req = store.index(index).openCursor(range, direction);
        } else if (range) {
          req = store.index(index).openCursor(range);
        } else {
          req = store.openCursor();
        }
        req.onsuccess = callback;
      });
    }

    protected accessAll(callback: (event?: Event) => void): void
    protected accessAll(index: string, range: IDBKeyRange, direction: string, callback: (event?: Event) => void): void
    protected accessAll(index: any, range?: IDBKeyRange, direction?: string, callback?: (event?: Event) => void): void {
      if ('function' === typeof index) {
        callback = index;
        index = null;
        range = null;
        direction = null;
      }
      this.accessCursor(index, range, direction, callback);
    }

    get(key: number, callback: (event: Event) => void): void
    get(key: string, callback: (event: Event) => void): void
    get(key: any, callback: (event: Event) => void): void {
      this.accessRecord(key, (event: Event) => {
        this.setBuffer((<IDBRequest>event.target).result);
        callback(event);
      });
    }

    set(value: T, merge?: boolean): void {
      value = jQuery.extend(true, {}, value);
      this.setBuffer(value, merge);
      this.accessRecord(value[this.keyPath], (event: Event) => {
        (<IDBRequest>event.target).source.put(merge ? jQuery.extend(true, {}, (<IDBRequest>event.target).result, value) : value);
        if (!this.autoIncrement) { delete this.diff[value[this.keyPath]]; }
      });
    }

    remove(key: number): void
    remove(key: string): void
    remove(key: any): void {
      this.removeBuffer(key);
      this.accessStore((store) => {
        store['delete'](key);
      });
    }

    clear(): void {
      this.clearBuffer();
      this.accessStore((store) => {
        store.clear();
      });
    }

    clean(): void {
      if (!this.size || !this.indexes.length) { return; }

      var index: string = this.indexes[0].name,
          size = this.size;
      this.accessCount(index, (count) => {
        if (count <= size) { return; }
        size = count - size;
        this.accessCursor(index, this.DB.IDBKeyRange.upperBound(Infinity), 'next', (event: Event) => {
          if (!(<IDBRequest>event.target).result || !size--) { return; }

          var cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;
          delete this.diff[cursor.primaryKey];
          cursor['delete']();
          cursor['continue']();
        });
      });
    }

    loadBuffer(callback?: () => void): void {
      if (this.autoIncrement) { return; }

      var buffer = this.buffer;
      if (this.indexes.length) {
        this.DB.IDBKeyRange && 
        this.accessAll(this.indexes[0].name, this.DB.IDBKeyRange.upperBound(Infinity), 'prev', proc);
      } else {
        this.accessAll(proc);
      }
      function proc() {
        if (!this.result) { return callback && callback(); }
        var cursor: IDBCursorWithValue = this.result;

        buffer[cursor.primaryKey] = <T>cursor.value;

        cursor['continue']();
      }
    }

    saveBuffer(callback?: () => void): void {
      if (this.autoIncrement) { return; }

      this.accessStore((store) => {
        for (var i in this.diff) {
          store.put(this.diff[i]);
        }
        callback && callback();
      });
    }

    getBuffers(): { [index: string]: T } {
      return this.buffer;
    }

    setBuffers(values: T[], merge?: boolean): { [index: string]: T } {
      for (var i in values) {
        this.setBuffer(values[i], merge);
      }
      return this.buffer;
    }

    getBuffer(key: string): T
    getBuffer(key: number): T
    getBuffer(key: any): any {
      if (this.autoIncrement) { return; }

      return this.buffer[key];
    }

    setBuffer(value: T, merge?: boolean): T {
      if (this.autoIncrement) { return; }

      if (!value) { return value; }
      var key = value[this.keyPath];
      this.buffer[key] = !merge ? value : jQuery.extend(true, {}, this.buffer[key], value);
      this.diff[key] = this.buffer[key];
      return this.buffer[key];
    }

    removeBuffer(key: string): T
    removeBuffer(key: number): T
    removeBuffer(key: any): T {
      if (this.autoIncrement) { return; }

      var value = this.buffer[key];
      delete this.buffer[key];
      delete this.diff[key];
      return value;
    }

    clearBuffer(): void {
      if (this.autoIncrement) { return; }

      for (var i in this.buffer) {
        delete this.buffer[i];
      }
      for (var i in this.diff) {
        delete this.diff[i];
      }
    }
    
  }

}
