/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStoreHistory extends DataStore implements DataStoreHistoryInterface {

    name: string = 'history'

    buffer_: BufferInterface = {}

    clean_(): void {
      var that = this,
          store = this.accessStore();
      if (!store) { return; }

      store.count().onsuccess = function () {
        if (1000 < this.result) {
          store.index('date').openCursor(that.DB_.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
            if (!this.result) { return; }

            var IDBCursor = this.result;
            if (IDBCursor) {
              IDBCursor['delete'](IDBCursor.value.id);
              IDBCursor['continue'] && IDBCursor['continue']();
            } else {
              store.count().onsuccess = function () { 1000 < this.result && store.clear(); }
            }
          }
        }
      };
    }

    loadTitle(keyUrl: string): void {
      this.accessRecord(keyUrl, function () {
        keyUrl === M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(window.location.href)) &&
        this.result && this.result.title && (document.title = this.result.title);
      });
    }

    saveTitle(keyUrl: string, title: string): void {
      this.accessRecord(keyUrl, function () {
        this.source.put(jQuery.extend(true, {}, this.result, { id: keyUrl, title: title, date: new Date().getTime() }));
      });
      this.clean_();
    }

    loadScrollPosition(keyUrl: string): void {
      this.accessRecord(keyUrl, function () {
        if (!this.result || !this.result.id || keyUrl !== this.result.id) { return; }
        isFinite(this.result.scrollX) && isFinite(this.result.scrollY) &&
        window.scrollTo(parseInt(Number(this.result.scrollX) + '', 10), parseInt(Number(this.result.scrollY) + '', 10));
      });
    }

    saveScrollPosition(keyUrl: string, scrollX: number, scrollY: number): void {
      this.accessRecord(keyUrl, function () {
        if (!this.result || !this.result.id || keyUrl !== this.result.id) { return; }
        this.source.put(jQuery.extend(true, {}, this.result, { scrollX: parseInt(Number(scrollX) + '', 10), scrollY: parseInt(Number(scrollY) + '', 10), date: new Date().getTime() }));
      });
    }

  }
}
