/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  var M: ModelInterface
  var C: ControllerInterface

  export class ControllerFunction implements FunctionInterface {

    constructor(controller: ControllerInterface, model: ModelInterface) {
      M = model;
      C = controller;
    }

    enable(): any {
      M.enable();
      return this;
    }

    disable(): any {
      M.disable();
      return this;
    }
    
    click(): any
    click(url: string, attrs?: { [index: string]: any; }): any
    click(url: HTMLAnchorElement): any
    click(url: JQuery): any
    click(url?: any, attrs?: { [index: string]: any; }): any {
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
          return this;
      }
      return $anchor.first().one(setting.nss.click, (event) => new View(M, C, null).HANDLERS.CLICK(event)).click();
    }
    
    submit(): any
    submit(url: string, attrs: { [index: string]: any; }, data: any): any
    submit(url: HTMLFormElement): any
    submit(url: JQuery): any
    submit(url?: any, attrs?: { [index: string]: any; }, data?: any): any {
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
          return this;
      }
      return $form.first().one(setting.nss.submit, (event) => new View(M, C, null).HANDLERS.SUBMIT(event)).submit();
    }
    
    getCache()
    getCache(url: string)
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
    
    setCache(): any
    setCache(url: string): any
    setCache(url: string, data: string): any
    setCache(url: string, data: string, textStatus: string, jqXHR: JQueryXHR): any
    setCache(url: string = window.location.href, data?: string, textStatus?: string, jqXHR?: JQueryXHR): any {
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
      return this;
    }
    
    removeCache(): any
    removeCache(url: string): any
    removeCache(url: string = window.location.href): any {
      M.removeCache(url);
      return this;
    }

    clearCache(): any {
      M.clearCache();
      return this;
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
