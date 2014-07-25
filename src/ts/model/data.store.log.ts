/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStoreLog<T> extends DataStore<T> implements DataStoreLogInterface<T> {

    name: string = 'log'
    keyPath: string = 'id'

    clean(): void {
      var that = this,
          store = this.accessStore(),
          size = 50;
      if (!store) { return; }

      store.count().onsuccess = function () {
        if (this.result > size + 10) {
          size = this.result - size;
          store.index(store.keyPath).openCursor(this.DB_.IDBKeyRange.lowerBound(0)).onsuccess = function () {
            if (!this.result) { return; }

            var IDBCursor = this.result;
            if (IDBCursor) {
              if (0 > --size) {
                IDBCursor['delete'](IDBCursor.value[store.keyPath]);
              }
              IDBCursor['continue'] && IDBCursor['continue']();
            }
          };
        }
      };
    }

  }
}
