/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageRecord implements PageRecordInterface {
    
    constructor()
    constructor(model: ModelInterface, setting: SettingInterface, data: string, textStatus: string, jqXHR: JQueryXHR, host: string)
    constructor(private model_?: ModelInterface, setting?: SettingInterface, data?: string, textStatus?: string, jqXHR?: JQueryXHR, host?: string) {
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
    }
    
    private data_: PageRecordSchema
    data: PageRecordDataInterface

    state(): boolean {
      switch (false) {
        case !!this.data.setting():
        case this.data.jqXHR() && 200 === +this.data.jqXHR().status:
        case this.data.expires(this.data.setting()) >= new Date().getTime():
          return false;
        default:
          return true;
      }
    }

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

    expires(setting?: SettingInterface): number {
      var xhr = this.jqXHR(),
          expires: number;

      switch (true) {
        case !xhr:
          expires = 0;
          break;

        case /no-store|no-cache/.test(xhr.getResponseHeader('Cache-Control')):
          expires = 0;
          break;

        case xhr.getResponseHeader('Cache-Control') && !!~xhr.getResponseHeader('Cache-Control').indexOf('max-age='):
          expires = new Date(xhr.getResponseHeader('Date')).getTime() + (+xhr.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop() * 1000);
          break;

        case !!xhr.getResponseHeader('Expires'):
          expires = new Date(xhr.getResponseHeader('Expires')).getTime();
          break;

        default:
          expires = 0;
      }

      if (setting) {
        expires = 'number' === typeof setting.cache.expires.min ? Math.max(setting.cache.expires.min + new Date().getTime(), expires) : expires;
        expires = 'number' === typeof setting.cache.expires.max ? Math.min(setting.cache.expires.max + new Date().getTime(), expires) : expires;
      }
      expires = Math.max(expires, 0) || 0;
      return expires;
    }

    setting(): SettingInterface {
      return this.data_.setting;
    }

  }

}
