/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class AppData implements AppDataInterface {

    APP_: ModelApp
    DATA_: ModelData = new ModelData()
    storeNames = this.DATA_.DB.storeNames

    constructor(APP: ModelApp) {
      this.APP_ = APP;
    }

    opendb(setting: SettingInterface): void {
      this.DATA_.DB.opendb(setting);
    }
    
    getBuffer(storeName: string): Object
    getBuffer(storeName: string, key: string): any
    getBuffer(storeName: string, key: number): any
    getBuffer(storeName: string, key?: any): any {
      return this.DATA_.DB.getBuffer(storeName, key);
    }

    setBuffer(storeName: string): any {
      return this.DATA_.DB.setBuffer(storeName);
    }

    loadBuffer(storeName: string, limit: number = 0): void {
      return this.DATA_.DB.loadBuffer(storeName, limit);
    }

    saveBuffer(storeName: string): void {
      return this.DATA_.DB.saveBuffer(storeName);
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
      var keyUrl: string = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));

      this.DATA_.DB.loadTitle(keyUrl);
    }

    saveTitleToDB(unsafe_url: string, title: string): void {
      var keyUrl = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));

      this.DATA_.DB.saveTitle(keyUrl, title);
    }

    loadScrollPositionFromCacheOrDB(unsafe_url: string): void {
      var keyUrl: string = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));

      this.DATA_.DB.loadScrollPosition(keyUrl);
    }

    saveScrollPositionToCacheAndDB(unsafe_url: string, scrollX: number, scrollY: number): void {
      var keyUrl = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));

      this.DATA_.DB.saveScrollPosition(keyUrl, scrollX, scrollY);
    }

    loadLogFromDB(): void {
    }

    saveLogToDB(log: LogSchema): void {
      this.DATA_.DB.saveLog(log);
    }

    loadServerFromDB(): void {
      this.DATA_.DB.loadServer();
    }

    saveServerToDB(host: string, state: number = 0, unsafe_url?: string, expires: number = 0): void {
      this.DATA_.DB.saveServer(host, state);
      if (unsafe_url) {
        var keyUrl = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
        this.DATA_.DB.saveExpires(keyUrl, host, expires);
      }
    }

  }
}
