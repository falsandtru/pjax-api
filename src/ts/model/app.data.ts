/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class Data implements DataInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) {
    }

    private data_: DataLayerInterface = new DATA.Main()
    private stores_ = this.data_.DB.stores
    private util_ = LIBRARY.Utility

    // cookie

    getCookie(key: string): string {
      return this.data_.Cookie.getCookie(key);
    }

    setCookie(key: string, value: string, option?): string {
      return this.data_.Cookie.setCookie(key, value, option);
    }

    // db

    connect(setting: SettingInterface): void {
      if (!setting.database) { return; }

      this.data_.DB.up();

      this.saveTitle();
      this.saveScrollPosition();
    }

    loadBuffers(limit: number = 0): void {
      for (var i in this.stores_) {
        this.stores_[i].loadBuffer(limit);
      }
    }

    saveBuffers(): void {
      for (var i in this.stores_) {
        this.stores_[i].saveBuffer();
      }
    }

    // history

    getHistoryBuffer(unsafe_url: string): HistoryStoreSchema {
      return this.stores_.history.getBuffer(this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url)));
    }

    loadTitle(): void {
      var keyUrl: string = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(window.location.href));

      var data: HistoryStoreSchema = this.stores_.history.getBuffer(keyUrl);

      if (data && 'string' === typeof data.title) {
        document.title = data.title;
      } else {
        this.stores_.history.get(keyUrl, (event) => {
          data = (<IDBRequest>event.target).result;
          if (data && data.title) {
            if (this.util_.compareUrl(keyUrl, this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(window.location.href)))) {
              document.title = data.title;
            }
          }
        });
      }
    }

    saveTitle(): void
    saveTitle(unsafe_url: string, title: string): void
    saveTitle(unsafe_url: string = window.location.href, title: string = document.title): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));

      var value: HistoryStoreSchema = {
        url: keyUrl,
        title: title,
        date: new Date().getTime(),

        scrollX: undefined,
        scrollY: undefined,
        host: undefined,
        expires: undefined
      };

      this.stores_.history.setBuffer(value, true);
      this.stores_.history.set(value, true);
      this.stores_.history.clean();
    }

    loadScrollPosition(): void {
      var keyUrl: string = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(window.location.href));

      var data: HistoryStoreSchema = this.stores_.history.getBuffer(keyUrl);
      function scroll(scrollX, scrollY) {
        if ('number' !== typeof scrollX || 'number' !== typeof scrollY) { return; }

        window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
      }

      if (data && 'number' === typeof data.scrollX) {
        scroll(data.scrollX, data.scrollY);
      } else {
        this.stores_.history.get(keyUrl, (event) => {
          data = (<IDBRequest>event.target).result;
          if (data && 'number' === typeof data.scrollX) {
            if (this.util_.compareUrl(keyUrl, this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(window.location.href)))) {
              scroll(data.scrollX, data.scrollY);
            }
          }
        });
      }
    }
    
    saveScrollPosition(): void
    saveScrollPosition(unsafe_url: string, scrollX: number, scrollY: number): void
    saveScrollPosition(unsafe_url: string = window.location.href, scrollX: number = jQuery(window).scrollLeft(), scrollY: number = jQuery(window).scrollTop()): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));

      var value: HistoryStoreSchema = {
        url: keyUrl,
        scrollX: scrollX,
        scrollY: scrollY,
        date: new Date().getTime(),

        title: undefined,
        host: undefined,
        expires: undefined
      };

      this.stores_.history.setBuffer(value, true);
      this.stores_.history.set(value, true);
    }
    
    loadExpires(): void {
    }

    saveExpires(unsafe_url: string, host: string, expires: number): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));

      var value: HistoryStoreSchema = {
        url: keyUrl,
        host: host,
        expires: expires,

        title: undefined,
        scrollX: undefined,
        scrollY: undefined,
        date: undefined
      };

      this.stores_.history.setBuffer(value, true);
      this.stores_.history.set(value, true);
    }

    // server

    getServerBuffers(): ServerStoreSchema[] {
      return this.stores_.server.getBuffers();
    }

    loadServer(): void {
    }

    saveServer(host: string, performance: number, state: number = 0, unsafe_url?: string, expires: number = 0): void {
      var store = this.stores_.server,
          value: ServerStoreSchema = {
            host: host.split('//').pop().split('/').shift() || '',
            performance: performance,
            state: state,
            date: new Date().getTime()
          };

      store.setBuffer(value, true);
      store.get(host, function () {
        var data: ServerStoreSchema = this.result;
        if (!data || !state) {
          // 新規または正常登録
          store.set(value);
        } else if (data.state) {
          // 2回目のエラーで登録削除
          store['delete'](host);
        }
      });
      this.stores_.server.clean();
    }
    
  }

}
