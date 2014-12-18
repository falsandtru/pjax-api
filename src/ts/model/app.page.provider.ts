/// <reference path="../define.ts"/>
/// <reference path="app.page.record.ts"/>
/// <reference path="app.page.fetch.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageProvider implements PageProviderInterface {

    constructor(private Record_: typeof PageRecordInterface, private model_: ModelInterface, private balancer_: BalancerInterface, private page_: PageInterface) {
    }

    private hash_ = (setting: SettingInterface) => setting.nss.url
    private table_: { [keyUrl: string]: PageRecordInterface } = {}
    private order_: SettingInterface[] = []

    fetchRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void): void {
      if (this.getRecord(setting).state(setting)) {
        //success(this.getRecord(setting), event);
        this.pullRecord(setting, event, success, failure);
      } else {
        this.pullRecord(setting, event, success, failure);
      }
    }

    pullRecord(setting: SettingInterface, event: JQueryEventObject, success: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void, failure: (record: PageRecordInterface, setting: SettingInterface, event: JQueryEventObject) => void): void {
      new PageFetch(this.model_, this.page_, this.balancer_, setting, event,
                    // success
                    (setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, jqXHR: JQueryXHR, host: string) => {
                      var record = this.setRecord(setting, this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
                      success(record, setting, event);
                    },
                    // failure
                    (setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, jqXHR: JQueryXHR, host: string) => {
                      var record = this.setRecord(setting, this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
                      failure(record, setting, event);
                    }
                   );
    }

    getRecord(setting: SettingInterface): PageRecordInterface {
      return this.table_[this.hash_(setting)] = this.table_[this.hash_(setting)] || new this.Record_();
    }

    setRecord(setting: SettingInterface, data: string, textStatus: string, jqXHR: JQueryXHR, host: string): PageRecordInterface {
      this.cleanRecords_(setting);
      this.addOrder_(setting);
      return this.table_[this.hash_(setting)] = new this.Record_(setting.nss.url, data, textStatus, jqXHR, host);
    }

    removeRecord(setting: SettingInterface): PageRecordInterface {
      this.removeOrder_(setting);
      return this.table_[this.hash_(setting)] = new this.Record_();
    }

    clearRecord(): void {
      this.order_.splice(0, this.order_.length);
      for (var i in this.table_) {
        delete this.table_[i];
      }
    }

    private cleanRecords_(setting: SettingInterface): void {
      if (setting.cache.limit) {
        while (this.order_.length >= setting.cache.limit) {
          this.removeRecord(this.order_.pop());
        }
      }

      //for (var i = 0, hash: string, record: PageRecordInterface; hash = this.order_[i];) {
      //  record = this.getRecord(this.app_.configure(hash));
      //  !record.state() && this.removeRecord(this.app_.configure(hash));
      //}
    }

    private addOrder_(setting: SettingInterface): void {
      this.removeOrder_(setting);
      this.order_.unshift(setting);
    }

    private removeOrder_(setting: SettingInterface): void {
      for (var i = this.order_.length; i--;) {
        this.order_[i].nss.url === setting.nss.url && this.order_.splice(i, 1);
      }
    }

  }

}
