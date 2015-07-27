/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageRecord implements PageRecordInterface {
    
    constructor()
    constructor(url: string, data: string, textStatus: string, $xhr: JQueryXHR, host: string, bind: JQueryXHR[])
    constructor(url?: string, data?: string, textStatus?: string, $xhr?: JQueryXHR, host?: string, bind?: JQueryXHR[]) {
      this.data_ = url ? {
        url: url,
        data: data,
        textStatus: textStatus,
        jqXHR: $xhr,
        host: host,
        bind: bind
      } : {
        url: undefined,
        data: undefined,
        textStatus: undefined,
        jqXHR: undefined,
        host: undefined,
        bind: undefined
      };

      this.data = new PageRecordData(this.data_);
    }
    
    private data_: PageRecordSchema
    data: PageRecordDataInterface

    state(setting?: SettingInterface): boolean {
      var min = setting ? setting.cache.expires.min : undefined,
          max = setting ? setting.cache.expires.max : undefined;
      switch (false) {
        case this.data.jqXHR() && 200 === +this.data.jqXHR().status:
        case this.data.expires(min, max) >= new Date().getTime():
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

    bind(): JQueryXHR[] {
      return this.data_.bind;
    }

    host(): string {
      return this.data_.host;
    }

    expires(): number
    expires(min: number, max: number): number
    expires(min?: number, max?: number): number {
      if (!this.jqXHR() && !this.data()) { return 0; }

      var $xhr = this.jqXHR(),
          expires: number;

      if ($xhr) {
        $xhr.timeStamp = $xhr.timeStamp || new Date($xhr.getResponseHeader('Date')).getTime() || new Date().getTime();
      }
      switch (true) {
        case !$xhr:
          expires = 0;
          break;

        case /no-store|no-cache/.test($xhr.getResponseHeader('Cache-Control')):
          expires = 0;
          break;

        case !!$xhr.getResponseHeader('Cache-Control') && !!~$xhr.getResponseHeader('Cache-Control').indexOf('max-age='):
          expires = new Date($xhr.getResponseHeader('Date') || new Date($xhr.timeStamp).toString()).getTime() + (+$xhr.getResponseHeader('Cache-Control').match(/max-age=(\d*)/).pop() * 1000);
          break;

        case !!$xhr.getResponseHeader('Expires'):
          expires = new Date($xhr.getResponseHeader('Expires')).getTime();
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
