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
    
    private provider: PageProviderInterface = new PageProvider(PageRecord, this.model_, this.app_)
    private util_ = LIBRARY.Utility

    parser: PageParserInterface = new PageParserSingleton()
    
    landing: string = this.util_.normalizeUrl(window.location.href)
    recent: RecentInterface = { order: [], data: {}, size: 0 }
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

      this.fetch_(setting, event);
    }

    private fetch_(setting: SettingInterface, event: JQueryEventObject): void {
      this.provider.accessRecord(
        setting,
        event,
        (record: PageRecordInterface, event: JQueryEventObject) => this.success_(record, event),
        (record: PageRecordInterface, event: JQueryEventObject) => this.failure_(record, event)
      );
    }

    private success_(record: PageRecordInterface, event: JQueryEventObject): void {
      new PageUpdate(this.model_, this.app_, event, record);
    }

    private failure_(record: PageRecordInterface, event: JQueryEventObject): void {
      if (!record.data.setting().fallback || 'abort' === record.data.textStatus()) { return; }

      var setting = record.data.setting();
      if (setting.balance.self) {
        this.app_.data.saveServer(record.data.host(), 0, new Date().getTime());
        this.app_.balance.chooseServer(setting);
      }

      this.model_.fallback(event);
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
