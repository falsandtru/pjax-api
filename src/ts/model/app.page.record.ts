/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageRecord implements PageRecordInterface {
    
    constructor()
    constructor(setting: SettingInterface, data: string, textStatus: string, jqXHR: JQueryXHR, host: string)
    constructor(setting?: SettingInterface, data?: string, textStatus?: string, jqXHR?: JQueryXHR, host?: string) {
      this.data_ = setting ? {
        url: setting.nss.url,
        data: data,
        textStatus: textStatus,
        jqXHR: jqXHR,
        host: host
      } : {
        url: undefined,
        data: undefined,
        textStatus: undefined,
        jqXHR: undefined,
        host: undefined
      };

      this.data = new PageRecordData(this.data_);
    }
    
    private data_: PageRecordSchema
    data: PageRecordDataInterface

    state(): boolean {
      switch (false) {
        case this.data.jqXHR() && 200 === +this.data.jqXHR().status:
        case this.data.expires() >= new Date().getTime():
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

    expires(): number
    expires(min: number, max: number): number
    expires(min?: number, max?: number): number {
      var xhr = this.jqXHR(),
          expires: number;

      if (xhr) {
        xhr.timeStamp = xhr.timeStamp || new Date(xhr.getResponseHeader('Date')).getTime() || new Date().getTime();
      }
      switch (true) {
        case !xhr:
          expires = 0;
          break;

        case /no-store|no-cache/.test(xhr.getResponseHeader('Cache-Control')):
          expires = 0;
          break;

        case !!xhr.getResponseHeader('Cache-Control') && !!~xhr.getResponseHeader('Cache-Control').indexOf('max-age='):
          expires = new Date(xhr.getResponseHeader('Date') || new Date(xhr.timeStamp).toString()).getTime() + (+xhr.getResponseHeader('Cache-Control').match(/max-age=(\d*)/).pop() * 1000);
          break;

        case !!xhr.getResponseHeader('Expires'):
          expires = new Date(xhr.getResponseHeader('Expires')).getTime();
          break;

        default:
          expires = 0;
      }

      if (undefined !== min || undefined !== max) {
        expires = 'number' === typeof min ? Math.max(min + new Date().getTime(), expires) : expires;
        expires = 'number' === typeof max ? Math.min(max + new Date().getTime(), expires) : expires;
      }
      expires = Math.max(expires, 0) || 0;
      return expires;
    }

  }

}
