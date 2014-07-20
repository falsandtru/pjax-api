/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStore implements DataStoreInterface {
    constructor(DB: DataDBInterface) {
      this.DB_ = DB;
    }

    DB_: DataDB

    name: string

    buffer_: BufferInterface = {}

    accessStore = (mode: string = 'readwrite') => this.DB_.accessStore(this.name, mode)
    accessRecord = (key: string, success: (event?: Event) => void) => this.DB_.accessRecord(this.name, key, success)
    
    loadBuffer(limit: number): void {
      var that = this,
          store = this.accessStore();
      if (!store) { return; }

      store.index('date').openCursor(this.DB_.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
        if (!this.result) { return; }

        var IDBCursor = this.result,
            data = IDBCursor.value;
        that.buffer_[data.id] = data;
        if ('_' !== data.id.charAt(0) && !--limit) { return; }

        IDBCursor['continue'] && IDBCursor['continue']();
      }
    }

    saveBuffer(): void {
    }
    
    getBuffer(): BufferInterface
    getBuffer(key: string): BufferDataInterface
    getBuffer(key?: string): any {
      return key ? this.buffer_[key] : this.buffer_;
    }

    setBuffer(key: string, value: BufferDataInterface, isMerge?: boolean): BufferDataInterface {
      this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
      return this.buffer_[key];
    }

  }
}
