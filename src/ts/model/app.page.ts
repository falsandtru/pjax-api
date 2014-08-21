/// <reference path="../define.ts"/>
/// <reference path="app.page.fetch.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.utility.ts"/>

/* MODEL */

module MODULE.MODEL {

  export class AppPage extends AppPageUtility implements AppPageInterface {

    constructor(public model_: ModelInterface, public app_: AppLayerInterface) {
      super();
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
        if (setting.fallback && 'abort' !== textStatus) {
          if (setting.balance.self) {
            this.app_.balance.disable(setting);
          }
          this.model_.fallback(event, setting);
        }
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
      new AppPageFetch(this.model_, this.app_, setting, event, register, cache, done, fail);
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
      new AppPageUpdate(this.model_, this.app_, setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host);
    }
    
  }

}
