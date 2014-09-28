/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class StoreLog<T> extends Store<T> implements StoreLogInterface<T> {

    name: string = 'log'
    keyPath: string = 'id'

    clean(): void {
      var that = this;
      this.accessStore((store) => {
        var size = 50;

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
      });
    }

  }

}
