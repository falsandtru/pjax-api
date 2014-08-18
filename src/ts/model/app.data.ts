/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="utility.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class AppData implements AppDataInterface {

    constructor(public model_: ModelInterface, public app_: AppLayerInterface) {
    }

    data_: DataLayerInterface = new MODEL.Data()
    storeNames = {
      meta: this.data_.DB.store.meta.name,
      history: this.data_.DB.store.history.name,
      log: this.data_.DB.store.log.name,
      server: this.data_.DB.store.server.name
    }

    getCookie(key: string): string {
      return this.data_.Cookie.getCookie(key);
    }

    setCookie(key: string, value: string, option?): string {
      return this.data_.Cookie.setCookie(key, value, option);
    }

    opendb(setting: SettingInterface): void {
      setting.database = false;
      this.data_.DB.opendb(() => {
        this.saveTitleToDB(setting.origLocation.href, document.title);
        this.saveScrollPositionToDB(setting.origLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        setting.database = true;
      });
    }

    getBuffer<U>(storeName: string): U
    getBuffer<T>(storeName: string, key: string): T
    getBuffer<T>(storeName: string, key: number): T
    getBuffer<T>(storeName: string, key?: any): any {
      return this.data_.DB.store[storeName].getBuffer(key);
    }

    setBuffer<T>(storeName: string, key: string, value: T, isMerge?: boolean): T {
      return this.data_.DB.store[storeName].setBuffer(key, value, isMerge);
    }

    loadBuffer(storeName: string, limit: number = 0): void {
      return this.data_.DB.store[storeName].loadBuffer(limit);
    }

    saveBuffer(storeName: string): void {
      return this.data_.DB.store[storeName].saveBuffer();
    }

    loadBufferAll(limit: number = 0): void {
      for (var i in this.storeNames) {
        this.loadBuffer(i, limit);
      }
    }

    saveBufferAll(): void {
      for (var i in this.storeNames) {
        this.saveBuffer(i);
      }
    }

    loadTitleFromDB(unsafe_url: string): void {
      var keyUrl: string = this.model_.convertUrlToKeyUrl(Util.canonicalizeUrl(unsafe_url)),
          that = this;

      var data: HistorySchema = this.data_.DB.store.history.getBuffer(keyUrl);

      if (data && 'string' === typeof data.title) {
        document.title = data.title;
      } else {
        this.data_.DB.store.history.get(keyUrl, function () {
          data = this.result;
          if (data && data.title) {
            if (Util.compareUrl(keyUrl, that.model_.convertUrlToKeyUrl(Util.canonicalizeUrl(window.location.href)))) {
              document.title = data.title;
            }
          }
        });
      }
    }

    saveTitleToDB(unsafe_url: string, title: string): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(Util.canonicalizeUrl(unsafe_url));

      var value: HistorySchema = <HistorySchema>{ id: keyUrl, title: title, date: new Date().getTime() };
      this.data_.DB.store.history.setBuffer(value, true);
      this.data_.DB.store.history.set(value);
      this.data_.DB.store.history.clean();
    }

    loadScrollPositionFromDB(unsafe_url: string): void {
      var keyUrl: string = this.model_.convertUrlToKeyUrl(Util.canonicalizeUrl(unsafe_url)),
          that = this;

      var data: HistorySchema = this.data_.DB.store.history.getBuffer(keyUrl);
      function scroll(scrollX, scrollY) {
        if ('number' !== typeof scrollX || 'number' !== typeof scrollY) { return; }

        window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
      }

      if (data && 'number' === typeof data.scrollX) {
        scroll(data.scrollX, data.scrollY);
      } else {
        this.data_.DB.store.history.get(keyUrl, function () {
          data = this.result;
          if (data && 'number' === typeof data.scrollX) {
            if (Util.compareUrl(keyUrl, that.model_.convertUrlToKeyUrl(Util.canonicalizeUrl(window.location.href)))) {
              scroll(data.scrollX, data.scrollY);
            }
          }
        });
      }
    }

    saveScrollPositionToDB(unsafe_url: string, scrollX: number, scrollY: number): void {
      var keyUrl = this.model_.convertUrlToKeyUrl(Util.canonicalizeUrl(unsafe_url));

      var value: HistorySchema = <HistorySchema>{ id: keyUrl, scrollX: scrollX, scrollY: scrollY, date: new Date().getTime() };
      this.data_.DB.store.history.setBuffer(value, true);
      this.data_.DB.store.history.set(value);
    }

    loadExpiresFromDB(keyUrl: string): void {
    }

    saveExpiresToDB(keyUrl: string, host: string, expires: number): void {
      var value: HistorySchema = <HistorySchema>{ id: keyUrl, host: host, expires: expires };
      this.data_.DB.store.history.setBuffer(value, true);
      this.data_.DB.store.history.set(value);
    }

    loadLogFromDB(): void {
    }

    saveLogToDB(log: LogSchema): void {
      this.data_.DB.store.log.addBuffer(log);
      this.data_.DB.store.log.add(log);
      this.data_.DB.store.log.clean();
    }

    loadServerFromDB(): void {
    }

    saveServerToDB(host: string, state: number = 0, unsafe_url?: string, expires: number = 0): void {
      var value: ServerSchema = <ServerSchema>{ id: host || '', state: state };
      this.data_.DB.store.server.accessRecord(host, function () {
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

  }

}
