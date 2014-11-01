/// <reference path="../define.ts"/>
/// <reference path="app.page.parser.ts"/>
/// <reference path="app.page.fetch.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class Page implements PageInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) {
      setTimeout(() => this.parser.parse('') || this.model_.disable(), 300);
    }
    
    private util_ = LIBRARY.Utility

    parser: PageParserInterface = new PageParserSingleton()
    
    landing: string = this.util_.normalizeUrl(window.location.href)
    recent: RecentInterface = { order: [], data: {}, size: 0 }
    loadedScripts: { [index: string]: boolean } = {}
    isScrollPosSavable: boolean = true
    globalXHR: JQueryXHR

    count: number = 0
    time: number = new Date().getTime()
    loadtime: number = 0

    transfer(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface): void {
      var done = (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => {
        this.update_(setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host);
      };
      var fail = (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => {
        if (!setting.fallback || 'abort' === textStatus) { return; }

        if (setting.balance.self) {
          this.app_.data.saveServer(host, 0, new Date().getTime());
          this.app_.balance.chooseServer(setting);
        }

        this.model_.fallback(event);
      };

      this.fetch_(setting, event, register, cache, done, fail);
    }

    private fetch_(setting: SettingInterface,
                   event: JQueryEventObject,
                   register: boolean,
                   cache: CacheInterface,
                   done: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => void,
                   fail: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => void
                  ): void {
      new PageFetch(this.model_, this.app_, this, setting, event, register, cache, done, fail);
    }

    private update_(setting: SettingInterface,
                    event: JQueryEventObject,
                    register: boolean,
                    cache: CacheInterface,
                    data: string,
                    textStatus: string,
                    jqXHR: JQueryXHR,
                    errorThrown: string,
                    host: string
                   ): void {
      new PageUpdate(this.model_, this.app_, this, setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host, true);
    }

    // mixin utility
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string { return }
    movePageNormally(event: JQueryEventObject): void { }
    dispatchEvent(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void { }
    wait(ms: number): JQueryDeferred<any> { return }

  }

}
