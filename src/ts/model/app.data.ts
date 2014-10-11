/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  var Util = LIBRARY.Utility

  export class Data implements DataInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) {
    }

    private data_: DataLayerInterface = new DATA.Main()

    stores = this.data_.DB.stores

    opendb(setting: SettingInterface): void {
      setting.database = false;
      this.data_.DB.opendb(() => {
        this.saveTitleToDB(setting.origLocation.href, document.title);
        this.saveScrollPositionToDB(setting.origLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        setting.database = true;
      });
    }

    loadBuffers(limit: number = 0): void {
      for (var i in this.stores) {
        this.stores[i].loadBuffer(limit);
      }
    }

    saveBuffers(): void {
      for (var i in this.stores) {
        this.stores[i].saveBuffer();
      }
    }

    loadTitleFromDB(unsafe_url: string): void {
      var keyUrl: string = this.model_.convertUrlToKeyUrl(Util.normalizeUrl(unsafe_url)),
          that = this;

      var data: HistorySchema = this.data_.DB.stores.history.getBuffer(keyUrl);

      if (data && 'string' === typeof data.title) {
        document.title = data.title;
      } else {
        this.data_.DB.stores.history.get(keyUrl, function () {
          data = this.result;
          if (data && data.title) {
            if (Util.compareUrl(keyUrl, that.model_.convertUrlToKeyUrl(Util.normalizeUrl(window.location.href)))) {
              document.title = data.title;
            }
          }
        });
      }
    }

    saveTitleToDB(unsafe_url: string, title: string): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(Util.normalizeUrl(unsafe_url));

      var value: HistorySchema = <HistorySchema>{ id: keyUrl, title: title, date: new Date().getTime() };
      this.data_.DB.stores.history.setBuffer(value, true);
      this.data_.DB.stores.history.set(value);
      this.data_.DB.stores.history.clean();
    }

    loadScrollPositionFromDB(unsafe_url: string): void {
      var keyUrl: string = this.model_.convertUrlToKeyUrl(Util.normalizeUrl(unsafe_url)),
          that = this;

      var data: HistorySchema = this.data_.DB.stores.history.getBuffer(keyUrl);
      function scroll(scrollX, scrollY) {
        if ('number' !== typeof scrollX || 'number' !== typeof scrollY) { return; }

        window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
      }

      if (data && 'number' === typeof data.scrollX) {
        scroll(data.scrollX, data.scrollY);
      } else {
        this.data_.DB.stores.history.get(keyUrl, function () {
          data = this.result;
          if (data && 'number' === typeof data.scrollX) {
            if (Util.compareUrl(keyUrl, that.model_.convertUrlToKeyUrl(Util.normalizeUrl(window.location.href)))) {
              scroll(data.scrollX, data.scrollY);
            }
          }
        });
      }
    }

    saveScrollPositionToDB(unsafe_url: string, scrollX: number, scrollY: number): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(Util.normalizeUrl(unsafe_url));

      var value: HistorySchema = <HistorySchema>{ id: keyUrl, scrollX: scrollX, scrollY: scrollY, date: new Date().getTime() };
      this.data_.DB.stores.history.setBuffer(value, true);
      this.data_.DB.stores.history.set(value);
    }

    loadExpiresFromDB(keyUrl: string): void {
    }

    saveExpiresToDB(keyUrl: string, host: string, expires: number): void {
      var value: HistorySchema = <HistorySchema>{ id: keyUrl, host: host, expires: expires };
      this.data_.DB.stores.history.setBuffer(value, true);
      this.data_.DB.stores.history.set(value);
    }

    loadLogFromDB(): void {
    }

    saveLogToDB(host: string, performance: number): void {
      var log: LogSchema = {
        host: host,
        performance: performance,
        date: new Date().getTime()
      };

      this.data_.DB.stores.log.addBuffer(log);
      this.data_.DB.stores.log.add(log);
      this.data_.DB.stores.log.clean();
    }

    loadServerFromDB(): void {
    }

    saveServerToDB(host: string, state: number = 0, unsafe_url?: string, expires: number = 0): void {
      var value: ServerSchema = <ServerSchema>{ id: host || '', state: state };
      this.data_.DB.stores.server.accessRecord(host, function () {
        var data: ServerSchema = this.result;
        if (!data || !state) {
          // 新規または正常登録
          this.source.put(value);
        } else if (data.state) {
          // 2回目のエラーで登録削除
          this.source['delete'](host);
        }
      });
      if (unsafe_url) {
        this.saveExpiresToDB(unsafe_url, host, expires);
      }
    }

    getCookie(key: string): string {
      return this.data_.Cookie.getCookie(key);
    }

    setCookie(key: string, value: string, option?): string {
      return this.data_.Cookie.setCookie(key, value, option);
    }

  }

}
