/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  var M: ModelInterface
  var C: ControllerInterface
  var S: Functions

  export class Functions {

    constructor(model: ModelInterface, controller: ControllerInterface) {
      M = model;
      C = controller;
      S = this;
      SEAL(this);
    }

    enable(): JQueryPjaxStatic {
      M.enable();
      return <any>this;
    }

    disable(): JQueryPjaxStatic {
      M.disable();
      return <any>this;
    }
    
    click(): JQueryPjaxStatic
    click(url: string, attrs?: { [index: string]: any; }): JQueryPjaxStatic
    click(url: HTMLAnchorElement): JQueryPjaxStatic
    click(url: JQuery): JQueryPjaxStatic
    click(url?: any, attrs?: { [index: string]: any; }): JQueryPjaxStatic {
      var setting: SettingInterface = M.getGlobalSetting(),
          $anchor: JQuery;

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
      $anchor.first().one(setting.nss.click, () => C.click.apply(C, arguments)).click();
      return <any>this;
    }
    
    submit(): JQueryPjaxStatic
    submit(url: string, attrs: { [index: string]: any; }, data: any): JQueryPjaxStatic
    submit(url: HTMLFormElement): JQueryPjaxStatic
    submit(url: JQuery): JQueryPjaxStatic
    submit(url?: any, attrs?: { [index: string]: any; }, data?: any): JQueryPjaxStatic {
      var setting: SettingInterface = M.getGlobalSetting(),
          $form: JQuery,
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
      $form.first().one(setting.nss.submit, () => C.submit.apply(C, arguments)).submit();
      return <any>this;
    }
    
    getCache(): PjaxCache
    getCache(url: string): PjaxCache
    getCache(url: string = window.location.href): PjaxCache {
      var cache: PjaxCache = <PjaxCache>M.getCache(url);
      if (cache) {
        cache = {
          data: cache.data,
          textStatus: cache.textStatus,
          jqXHR: cache.jqXHR,
          expires: cache.expires
        }
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
          M.setCache(url, data, textStatus, jqXHR);
      }
      return <any>this;
    }
    
    removeCache(): JQueryPjaxStatic
    removeCache(url: string): JQueryPjaxStatic
    removeCache(url: string = window.location.href): JQueryPjaxStatic {
      M.removeCache(url);
      return <any>this;
    }

    clearCache(): JQueryPjaxStatic {
      M.clearCache();
      return <any>this;
    }

    follow(event: JQueryEventObject, $XHR: JQueryXHR, host?: string, timeStamp?: number): boolean {
      if (!M.isDeferrable) { return false; }
      var anchor = <HTMLAnchorElement>event.currentTarget;
      $XHR.follow = true;
      $XHR.host = host || '';
      if (isFinite(event.timeStamp)) { $XHR.timeStamp = timeStamp || event.timeStamp; }
      M.setGlobalXHR($XHR);
      jQuery.when($XHR)
      .done(function () {
        !M.getCache(anchor.href) && M.isImmediateLoadable(event) && M.setCache(anchor.href, undefined, undefined, $XHR);
      });
      jQuery[NAME].click(anchor.href);
      return true;
    }

    host(): string {
      return M.host();
    }

  }

}
