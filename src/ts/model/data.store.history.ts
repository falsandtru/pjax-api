/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL {
  
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
