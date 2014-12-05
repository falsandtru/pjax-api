/// <reference path="../define.ts"/>
/// <reference path="app.page.record.ts"/>
/// <reference path="app.page.fetch.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageProvider implements PageProviderInterface {

    constructor(private Record_: PageRecordClassInterface, private model_: ModelInterface, private app_: AppLayerInterface) {
    }

    private hash_ = (setting: SettingInterface) => setting.nss.url
    private table_: { [keyUrl: string]: PageRecordInterface } = {}
    private order_: string[] = []

    fetchRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void): void {
      if (this.getRecord(setting).state()) {
        //success(this.getRecord(setting), event);
        this.pullRecord(setting, event, success, failure);
      } else {
        this.pullRecord(setting, event, success, failure);
      }
    }

    pullRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void): void {
      new PageFetch(
        this.model_, this.app_, setting, event,
        // success
        ((callback: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void) => (setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, jqXHR: JQueryXHR, host: string) => {
          var record = this.setRecord(setting, this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
          callback(record, setting, event);
        })(success),
        // failure
        ((callback: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void) => (setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, jqXHR: JQueryXHR, host: string) => {
          var record = this.setRecord(setting, this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
          callback(record, setting, event);
        })(failure)
      );
    }

    getRecord(setting: SettingInterface): PageRecordInterface {
      return this.table_[this.hash_(setting)] = this.table_[this.hash_(setting)] || new this.Record_();
    }

    setRecord(setting: SettingInterface, data: string, textStatus: string, jqXHR: JQueryXHR, host: string): PageRecordInterface {
      this.cleanRecords_(setting);
      this.addOrder_(setting);
      return this.table_[this.hash_(setting)] = new this.Record_(setting, data, textStatus, jqXHR, host);
    }

    removeRecord(setting: SettingInterface): PageRecordInterface {
      this.removeOrder_(setting);
      return this.table_[this.hash_(setting)] = new this.Record_();
    }

    clearRecord(): void {
      this.order_ = [];
      this.table_ = {};
    }

    private cleanRecords_(setting: SettingInterface): void {
      if (setting.cache.limit) {
        while (this.order_.length >= setting.cache.limit) {
          this.removeRecord(this.app_.configure(this.order_.pop()));
        }
      }

      //for (var i = 0, hash: string, record: PageRecordInterface; hash = this.order_[i];) {
      //  record = this.getRecord(this.app_.configure(hash));
      //  !record.state() && this.removeRecord(this.app_.configure(hash));
      //}
    }

    private addOrder_(setting: SettingInterface): void {
      this.removeOrder_(setting);
      this.order_.unshift(this.hash_(setting));
    }

    private removeOrder_(setting: SettingInterface): void {
      for (var i = 0, hash1 = this.hash_(setting), hash2: string; hash2 = this.order_[i]; i++) {
        hash1 === hash2 && this.order_.splice(i, 1);
      }
    }

  }

}
