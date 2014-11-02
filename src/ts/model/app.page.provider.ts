/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>
/// <reference path="app.page.record.ts"/>
/// <reference path="app.page.fetch.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageProvider implements PageProviderInterface {

    constructor(private Record_: PageRecordClassInterface, private model_: ModelInterface, private app_: AppLayerInterface) {
    }

    private hash_ = (setting: SettingInterface) => this.model_.convertUrlToKeyUrl(setting.destLocation.href);
    private table_: { [keyUrl: string]: PageRecordInterface } = {}

    accessRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, event: JQueryEventObject) => void): void {
      this.fillRecord(setting, event, success, failure);
    }

    updateRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, event: JQueryEventObject) => void): void {
      this.removeRecord(setting);
      this.fillRecord(setting, event, success, failure);
    }

    fillRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, event: JQueryEventObject) => void): void {
      //if (this.verifyRecord(setting)) {
      //  success(this.getRecord(setting), event);
      //} else {
        var that = this;
        new PageFetch(this.model_, this.app_, setting, event, successWrapper, failureWrapper);
      //}

      function successWrapper(setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, jqXHR: JQueryXHR, host: string) {
        var record = that.setRecord(setting, data, textStatus, jqXHR, host, true);
        success(record, event);
      }
      function failureWrapper(setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, jqXHR: JQueryXHR, host: string) {
        var record = that.setRecord(setting, data, textStatus, jqXHR, host, false);
        failure(record, event);
      }
    }

    verifyRecord(setting: SettingInterface): boolean {
      return this.getRecord(setting).state();
    }

    getRecord(setting: SettingInterface): PageRecordInterface {
      return this.table_[this.hash_(setting)] = this.table_[this.hash_(setting)] || new this.Record_();
    }

    setRecord(setting: SettingInterface, data: string, textStatus: string, jqXHR: JQueryXHR, host: string, state: boolean): PageRecordInterface {
      return this.table_[this.hash_(setting)] = new this.Record_(this.model_, setting, data, textStatus, jqXHR, host, state);
    }

    removeRecord(setting: SettingInterface): PageRecordInterface {
      return this.table_[this.hash_(setting)] = new this.Record_();
    }

    clearRecord(setting: SettingInterface): void {
      this.table_ = {};
    }

  }

}
