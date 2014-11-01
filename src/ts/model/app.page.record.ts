/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageRecord implements PageRecordInterface {
    
    constructor()
    constructor(model: ModelInterface, setting: SettingInterface, data: string, textStatus: string, jqXHR: JQueryXHR, host: string, state: boolean)
    constructor(private model_?: ModelInterface, setting?: SettingInterface, data?: string, textStatus?: string, jqXHR?: JQueryXHR, host?: string, state?: boolean) {
      this.data_ = setting ? {
        url: this.model_.convertUrlToKeyUrl(setting.destLocation.href),
        data: data,
        textStatus: textStatus,
        jqXHR: jqXHR,
        host: host,
        setting: setting
      } : {
        url: undefined,
        data: undefined,
        textStatus: undefined,
        jqXHR: undefined,
        host: undefined,
        setting: undefined
      };

      this.data = new PageRecordData(this.data_);
      this.state_ = !!state;
    }
    
    private data_: PageRecordSchema

    data: PageRecordDataInterface

    private state_: boolean = false
    state = () => this.state_

  }

  export class PageRecordData implements PageRecordDataInterface {

    constructor(private data_: PageRecordSchema) {
    }

    url(): string {
      return this.data_.url;
    }

    data(): string {
      return this.data_.data;
    }

    textStatus(): string {
      return this.data_.textStatus;
    }

    jqXHR(): JQueryXHR {
      return this.data_.jqXHR;
    }

    host(): string {
      return this.data_.host;
    }

    setting(): SettingInterface {
      return this.data_.setting;
    }

  }

}
