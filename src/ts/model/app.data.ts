/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class Data implements DataInterface {

    constructor(private model_: ModelInterface) {
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
      if (setting.database.active) {
        this.data_.DB.configure(setting.database.revision, setting.database.refresh);
        this.data_.DB.up();

        this.saveTitle();
        this.saveScrollPosition();
      } else {
        this.data_.DB.down();
      }
    }

    loadBuffers(): void {
      for (var i in this.stores_) {
        this.stores_[i].loadBuffer();
      }
    }

    saveBuffers(): void {
      for (var i in this.stores_) {
        this.stores_[i].saveBuffer();
      }
    }

    // history

    getHistoryBuffer(unsafe_url: string): HistoryStoreSchema {
      return this.stores_.history.getBuffer(this.model_.convertUrlToKey(unsafe_url, true));
    }

    loadTitle(): void {
      var keyUrl: string = this.model_.convertUrlToKey(window.location.href, true);

      var data: HistoryStoreSchema = this.stores_.history.getBuffer(keyUrl);

      if (data && 'string' === typeof data.title) {
        document.title = data.title;
      } else {
        this.stores_.history.get(keyUrl, (event) => {
          data = (<IDBRequest>event.target).result;
          if (data && data.title) {
            if (this.model_.compareKeyByUrl(keyUrl, this.util_.canonicalizeUrl(window.location.href))) {
              document.title = data.title;
            }
          }
        });
      }
    }

    saveTitle(): void
    saveTitle(unsafe_url: string, title: string): void
    saveTitle(unsafe_url: string = window.location.href, title: string = document.title): void {
      var keyUrl = this.model_.convertUrlToKey(unsafe_url, true);

      var value: HistoryStoreSchema = {
        url: keyUrl,
        title: title,
        date: new Date().getTime(),

        scrollX: undefined,
        scrollY: undefined,
        host: undefined,
        expires: undefined
      };

      this.stores_.history.set(value, true);
      this.stores_.history.clean();
    }

    loadScrollPosition(): void {
      var keyUrl: string = this.model_.convertUrlToKey(window.location.href, true);

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
            if (this.model_.compareKeyByUrl(keyUrl, this.util_.canonicalizeUrl(window.location.href))) {
              scroll(data.scrollX, data.scrollY);
            }
          }
        });
      }
    }
    
    saveScrollPosition(): void
    saveScrollPosition(unsafe_url: string, scrollX: number, scrollY: number): void
    saveScrollPosition(unsafe_url: string = window.location.href, scrollX: number = jQuery(window).scrollLeft(), scrollY: number = jQuery(window).scrollTop()): void {
      var keyUrl = this.model_.convertUrlToKey(unsafe_url, true);

      var value: HistoryStoreSchema = {
        url: keyUrl,
        scrollX: scrollX,
        scrollY: scrollY,
        date: new Date().getTime(),

        title: undefined,
        host: undefined,
        expires: undefined
      };

      this.stores_.history.set(value, true);
    }

    loadExpires(): void {
    }

    saveExpires(unsafe_url: string, host: string, expires: number): void {
      var keyUrl = this.model_.convertUrlToKey(unsafe_url, true);

      var value: HistoryStoreSchema = {
        url: keyUrl,
        host: host || '',
        expires: expires,

        title: undefined,
        scrollX: undefined,
        scrollY: undefined,
        date: undefined
      };

      this.stores_.history.set(value, true);
    }

    // server

    getServerBuffers(): StoreSchemata<ServerStoreSchema> {
      return this.stores_.server.getBuffers();
    }

    getServerBuffer(unsafe_url: string): ServerStoreSchema {
      var host = this.model_.convertUrlToKey(unsafe_url, true).split('//').pop().split('/').shift();
      host = this.model_.compareKeyByUrl('http://' + host, 'http://' + window.location.host) ? '' : host;
      return this.stores_.server.getBuffer(host);
    }

    loadServer(): void {
    }

    saveServer(host: string, expires: number, time: number, score: number, state: number): void {
      host = host.split('//').pop().split('/').shift();
      host = this.model_.compareKeyByUrl('http://' + host, 'http://' + window.location.host) ? '' : host;
      var value: ServerStoreSchema = {
            host: host,
            time: Math.max(time, 1),
            score: score,
            state: state,
            expires: expires
          };

      this.stores_.server.set(value, true);
      this.stores_.server.clean();
    }

    removeServer(host: string): void {
      this.stores_.server.remove(host);
      this.stores_.server.clean();
    } 

  }

}
