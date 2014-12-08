/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {

  export class Functions implements PJAX.Method<Functions> {

    constructor() {
      FREEZE(this);
    }

    enable(): JQueryPjaxStatic {
      Model.singleton().enable();
      return <any>this;
    }

    disable(): JQueryPjaxStatic {
      Model.singleton().disable();
      return <any>this;
    }
    
    click(): JQueryPjaxStatic
    click(url: string, attrs?: { [index: string]: any; }): JQueryPjaxStatic
    click(url: HTMLAnchorElement): JQueryPjaxStatic
    click(url: JQuery): JQueryPjaxStatic
    click(url?: any, attrs?: { [index: string]: any; }): JQueryPjaxStatic {
      var $anchor: JQuery;

      switch (typeof url) {
        case 'undefined':
          $anchor = jQuery(this).filter('a').first().clone();
          break;

        case 'object':
          $anchor = jQuery(url).clone();
          break;

        case 'string':
          attrs = jQuery.extend(true, {}, attrs, { href: url });
          $anchor = jQuery('<a/>', attrs);
          break;

        default:
          return <any>this;
      }
      var setting: SettingInterface = Model.singleton().configure(<HTMLAnchorElement>$anchor[0]);
      setting && $anchor.first().one(setting.nss.event.click, () => Controller.singleton().click(arguments)).click();
      return <any>this;
    }
    
    submit(): JQueryPjaxStatic
    submit(url: string, attrs: { [index: string]: any; }, data: any): JQueryPjaxStatic
    submit(url: HTMLFormElement): JQueryPjaxStatic
    submit(url: JQuery): JQueryPjaxStatic
    submit(url?: any, attrs?: { [index: string]: any; }, data?: any): JQueryPjaxStatic {
      var $form: JQuery,
          df: DocumentFragment = document.createDocumentFragment(),
          type: any,
          $element: JQuery;

      switch (typeof url) {
        case 'undefined':
          $form = jQuery(this).filter('form').first().clone();
          break;

        case 'object':
          $form = jQuery(url).clone();
          break;

        case 'string':
          attrs = jQuery.extend(true, {}, attrs, { action: url });
          type = data instanceof Array && Array || data instanceof Object && Object || undefined;
          for (var i in data) {
            switch (type) {
              case Object:
                if (!Object.prototype.hasOwnProperty.call(data, i)) { continue; }
                $element = jQuery('<textarea/>', { name: i }).val(data[i]);
                break;
              case Array:
                data[i].attrs = data[i].attrs || {};
                data[i].attrs.name = data[i].name || data[i].attrs.name;
                data[i].attrs.type = data[i].type || data[i].attrs.type;
                $element = jQuery('<' + data[i].tag + '/>', data[i].attrs).val(data[i].value);
                break;
              default:
                continue;
            }
            df.appendChild($element[0]);
          }
          $form = jQuery('<form/>', attrs).append(<HTMLElement>df);
          break;

        default:
          return <any>this;
      }
      var setting: SettingInterface = Model.singleton().configure(<HTMLFormElement>$form[0]);
      setting && $form.first().one(setting.nss.event.submit, () => Controller.singleton().submit(arguments)).submit();
      return <any>this;
    }
    
    getCache(): PjaxCache
    getCache(url: string): PjaxCache
    getCache(url: string = window.location.href): PjaxCache {
      var cache: PjaxCache = <PjaxCache>Model.singleton().getCache(url);
      if (cache) {
        cache = {
          data: cache.data,
          textStatus: cache.textStatus,
          jqXHR: cache.jqXHR,
          expires: cache.expires
        };
      }
      return cache;
    }
    
    setCache(): JQueryPjaxStatic
    setCache(url: string): JQueryPjaxStatic
    setCache(url: string, data: string): JQueryPjaxStatic
    setCache(url: string, data: string, textStatus: string, jqXHR: JQueryXHR): JQueryPjaxStatic
    setCache(url: string = window.location.href, data?: string, textStatus?: string, jqXHR?: JQueryXHR): JQueryPjaxStatic {
      switch (arguments.length) {
        case 0:
          return this.setCache(url, document.documentElement.outerHTML);
        case 1:
          return this.setCache(url, null);
        case 2:
        case 3:
        case 4:
        default:
          Model.singleton().setCache(url, data, textStatus, jqXHR);
      }
      return <any>this;
    }
    
    removeCache(): JQueryPjaxStatic
    removeCache(url: string): JQueryPjaxStatic
    removeCache(url: string = window.location.href): JQueryPjaxStatic {
      Model.singleton().removeCache(url);
      return <any>this;
    }

    clearCache(): JQueryPjaxStatic {
      Model.singleton().clearCache();
      return <any>this;
    }

    follow(event: JQueryEventObject, $XHR: JQueryXHR, host?: string, timeStamp?: number): boolean {
      if (!Model.singleton().isDeferrable) { return false; }
      var anchor = <HTMLAnchorElement>event.currentTarget;
      $XHR.follow = true;
      $XHR.host = host || '';
      if (isFinite(event.timeStamp)) { $XHR.timeStamp = timeStamp || event.timeStamp; }
      Model.singleton().setXHR($XHR);
      jQuery.when($XHR)
      .done(function () {
        !Model.singleton().getCache(anchor.href) && Model.singleton().isAvailable(event) && Model.singleton().setCache(anchor.href, undefined, undefined, $XHR);
      });
      jQuery[DEF.NAME].click(anchor.href);
      return true;
    }

    bypass(): JQueryDeferred<any> {
      return Model.singleton().bypass();
    }

    host(): string {
      return Model.singleton().host();
    }

  }

}
