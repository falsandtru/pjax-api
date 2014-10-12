/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class StoreLog<T> extends Store<T> implements StoreLogInterface<T> {

    name = 'log'
    keyPath = 'id'
    autoIncrement = true
    indexes = [
      { name: this.keyPath, keyPath: this.keyPath, option: { unique: true } }
    ]

    clean(): void {
      var that = this;
      this.accessStore((store) => {
        var size = 100;

        store.count().onsuccess = function () {
          if (this.result <= size + 10) { return; }
          size = this.result - size;
          store.index(store.keyPath).openCursor(that.DB.IDBKeyRange.lowerBound(0)).onsuccess = function () {
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
