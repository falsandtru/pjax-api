/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStoreHistory<T> extends DataStore<T> implements DataStoreHistoryInterface<T> {

    name: string = 'history'
    keyPath: string = 'id'

    clean(): void {
      var that = this;
      this.accessStore((store) => {
        store.count().onsuccess = function () {
          if (this.result > 1000) {
            store.index('date').openCursor(that.DB_.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
              if (!this.result) { return; }

              var IDBCursor = this.result;
              if (IDBCursor) {
                IDBCursor['delete'](IDBCursor.value[store.keyPath]);
                IDBCursor['continue'] && IDBCursor['continue']();
              } else {
                store.count().onsuccess = function () { 1000 < this.result && store.clear(); }
              }
            };
          }
        };
      });
    }

  }
}
