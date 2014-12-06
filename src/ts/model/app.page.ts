/// <reference path="../define.ts"/>
/// <reference path="app.page.provider.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.parser.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  MIXIN(PageFetch, [PageUtility]);
  MIXIN(PageUpdate, [PageUtility]);

  export class Page implements PageInterface {

    constructor(private model_: ModelInterface, private app_: AppLayerInterface) {
      setTimeout(() => this.parser.parse('') || this.model_.disable(), 300);
    }
    
    private util_ = LIBRARY.Utility

    parser: PageParserInterface = new PageParserSingleton()
    provider: PageProviderInterface = new PageProvider(PageRecord, this.model_, this.app_)
    
    landing: string = this.util_.normalizeUrl(window.location.href)
    loadedScripts: { [index: string]: boolean } = {}
    xhr: JQueryXHR

    transfer(setting: SettingInterface, event: JQueryEventObject): void {
      switch (event.type.toLowerCase()) {
        case EVENT.CLICK:
          this.app_.data.saveTitle();
          this.app_.data.saveScrollPosition();
          break;

        case EVENT.SUBMIT:
          this.app_.data.saveTitle();
          this.app_.data.saveScrollPosition();
          break;

        case EVENT.POPSTATE:
          this.app_.data.saveTitle(setting.origLocation.href, document.title);
          setting.fix.history && this.app_.data.loadTitle();
          break;
      }

      setting = jQuery.extend(true, {}, setting);
      setting.origLocation = <HTMLAnchorElement>setting.origLocation.cloneNode();
      setting.destLocation = <HTMLAnchorElement>setting.destLocation.cloneNode();
      setting = FREEZE(setting);
      this.fetch_(setting, event);
    }

    private wait_: JQueryDeferred<any>
    getWait(): JQueryDeferred<any> {
      return this.wait_;
    }
    setWait(task: JQueryDeferred<any>): JQueryDeferred<any> {
      this.wait_ && this.wait_.state && 'pending' === this.wait_.state() && this.wait_.reject();
      return this.wait_ = task;
    }

    private fetch_(setting: SettingInterface, event: JQueryEventObject): void {
      this.provider.fetchRecord(
        setting,
        event,
        (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => this.success_(record, setting, event),
        (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => this.failure_(record, setting, event)
      );
    }

    private success_(record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject): void {
      new PageUpdate(this.model_, this.app_, setting, event, record);
    }

    private failure_(record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject): void {
      if (!setting.fallback || 'abort' === record.data.textStatus()) { return; }

      this.app_.data.saveExpires(setting.destLocation.href, '', 0);
      if (setting.balance.active) {
        this.app_.data.saveServer(record.data.host(), 0, new Date().getTime());
        this.app_.balance.changeServer(this.app_.balance.chooseServer(setting), setting);
      }

      setTimeout(() => this.model_.fallback(event), 100);
    }

    // mixin utility
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string { return }
    dispatchEvent(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void { }

  }

}
