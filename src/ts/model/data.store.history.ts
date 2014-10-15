/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class StoreHistory<T> extends Store<T> implements StoreHistoryInterface<T> {

    name = 'history'
    keyPath = 'id'
    autoIncrement = false
    indexes = [
      { name: 'date', keyPath: 'date', option: { unique: false } }
    ]

    clean(): void {
      var that = this;
      this.accessStore((store) => {
        store.count().onsuccess = function () {
          if (this.result <= 1000) { return; }
          store.index('date').openCursor(that.DB.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
            if (!this.result) { return; }

            var IDBCursor = this.result;
            if (IDBCursor) {
              IDBCursor['delete'](IDBCursor.value[store.keyPath]);
              IDBCursor['continue'] && IDBCursor['continue']();
            } else {
              store.count().onsuccess = function () { 1000 < this.result && store.clear(); }
            }
          };
        };
      });
    }

  }

}
