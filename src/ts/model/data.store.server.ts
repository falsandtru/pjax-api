/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class ServerStore<T> extends Store<T> implements ServerStoreInterface<T> {

    name = 'server'
    keyPath = 'host'
    autoIncrement = false
    indexes = [
      { name: 'date', keyPath: 'date', option: { unique: false } }
    ]

    clean(): void {
      var that = this;
      this.accessStore((store) => {
        var size = 50;

        store.count().onsuccess = function () {
          if (this.result <= size + 10) { return; }
          size = this.result - size;
          store.index('date').openCursor(that.DB.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
            if (!this.result) { return; }

            var IDBCursor = this.result;
            if (IDBCursor) {
              if (0 > --size) {
                IDBCursor['delete'](IDBCursor.value[store.keyPath]);
              }
              IDBCursor['continue'] && IDBCursor['continue']();
            }
          };
        };
      });
    }

  }

}
