/// <reference path="../define.ts"/>
/// <reference path="app.page.fetch.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  var Util = LIBRARY.Utility

  export class Page extends PageUtility implements PageInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) {
      super();
      setTimeout(() => this.createHTMLDocument('', '') || this.model_.disable(), 50);
    }

    landing: string = Util.normalizeUrl(window.location.href)
    recent: RecentInterface = { order: [], data: {}, size: 0 }
    loadedScripts: { [index: string]: boolean } = {}
    isScrollPosSavable: boolean = true
    globalXHR: JQueryXHR
    globalSetting: SettingInterface
    
    transfer(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface): void {
      var done = (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => {
        this.update(setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host);
      };
      var fail = (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => {
        if (!setting.fallback || 'abort' === textStatus) { return; }

        if (setting.balance.self) {
          this.app_.data.saveServer(host, 0, new Date().getTime());
          this.app_.balance.chooseServer(setting);
        }

        this.model_.fallback(event, setting);
      };

      this.fetch(setting, event, register, cache, done, fail);
    }

    fetch(setting: SettingInterface,
          event: JQueryEventObject,
          register: boolean,
          cache: CacheInterface,
          done: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => void,
          fail: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => void
         ): void {
      new PageFetch(this.model_, this.app_, setting, event, register, cache, done, fail);
    }

    update(setting: SettingInterface,
           event: JQueryEventObject,
           register: boolean,
           cache: CacheInterface,
           data: string,
           textStatus: string,
           jqXHR: JQueryXHR,
           errorThrown: string,
           host: string
          ): void {
      new PageUpdate(this.model_, this.app_, setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host);
    }
    
  }

}
