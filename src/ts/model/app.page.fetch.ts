/// <reference path="../define.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  var Util = LIBRARY.Utility

  export class PageFetch implements PageFetchInterface {

    constructor(

    private model_: ModelInterface,
    private app_: AppLayerInterface,
    private setting_: SettingInterface,
    private event_: JQueryEventObject,
    private register_: boolean,
    private cache_: CacheInterface,
    private done_: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any,
    private fail_: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any
    ) {
      this.main_();
    }

    private host_: string
    private data_: string
    private textStatus_: string
    private jqXHR_: JQueryXHR
    private errorThrown_: string

    private main_(): void {
      var that = this,
          setting = this.setting_,
          event = this.event_ = jQuery.extend(true, {}, this.event_),
          register = this.register_,
          cache = this.cache_,
          wait: number = Util.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      this.app_.page.isScrollPosSavable = false;
      setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

      function done(ajax: any[], wait: void) {
        that.data_ = ajax[0];
        that.textStatus_ = ajax[1];
        that.jqXHR_ = ajax[2];
        Util.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(ajax));
      }
      function fail(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
        that.jqXHR_ = jqXHR;
        that.textStatus_ = textStatus;
        that.errorThrown_ = errorThrown;
        Util.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(arguments));
      }
      function always() {
        Util.fire(setting.callbacks.ajax.always, this, [event, setting.param].concat(arguments));
        that.model_.setXHR(null);

        if (that.model_.isDeferrable) {
          if (that.data_) {
            that.done_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
          } else {
            that.fail_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
          }
        }
      }
      function success(data: string, textStatus: string, jqXHR: JQueryXHR) {
        that.data_ = data;
        that.textStatus_ = textStatus;
        that.jqXHR_ = jqXHR;
        Util.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, jqXHR]);
      }
      function error(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
        that.jqXHR_ = jqXHR;
        that.textStatus_ = textStatus;
        that.errorThrown_ = errorThrown;
        Util.fire(setting.callbacks.ajax.error, this, [event, setting.param, jqXHR, textStatus, errorThrown]);
      }
      function complete(jqXHR: JQueryXHR, textStatus: string) {
        Util.fire(setting.callbacks.ajax.complete, this, [event, setting.param, jqXHR, textStatus]);
        that.model_.setXHR(null);

        if (!that.model_.isDeferrable) {
          if (that.data_) {
            that.done_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
          } else {
            that.fail_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
          }
        }
      }

      this.dispatchEvent(document, setting.gns + ':fetch', false, true);

      var xhr = this.model_.getXHR();
      if (cache && cache.jqXHR) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        setting.loadtime = 0;
        xhr && xhr.abort();
        this.model_.setXHR(null);
        this.host_ = cache.host || '';
        this.data_ = cache.jqXHR.responseText;
        this.textStatus_ = cache.textStatus;
        this.jqXHR_ = cache.jqXHR;
        if (this.model_.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve([that.data_, that.textStatus_, that.jqXHR_]), this.wait(wait))
          .done(done).fail(fail).always(always);
        } else {
          var context: JQueryAjaxSettings = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
          context = context.context || context;
          success.call(context, that.data_, that.textStatus_, that.jqXHR_);
          complete.call(context, that.jqXHR_, that.textStatus_);
        }
      } else if (xhr && xhr.follow && 'abort' !== xhr.statusText && 'error' !== xhr.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, xhr.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        this.host_ = xhr.host || '';
        setting.loadtime = xhr.timeStamp;
        var wait = setting.wait && isFinite(xhr.timeStamp) ? Math.max(wait - new Date().getTime() + xhr.timeStamp, 0) : 0;
        jQuery.when(xhr, that.wait(wait))
        .done(done).fail(fail).always(always);

      } else {
        // default
        setting.loadtime = event.timeStamp;
        xhr && xhr.abort();
        var requestLocation = <HTMLAnchorElement>setting.destLocation.cloneNode(),
            ajax: JQueryAjaxSettings = {},
            callbacks = {};

        this.app_.balance.chooseServer(setting);
        this.host_ = setting.balance.self && this.app_.balance.host().split('//').pop() || '';
        requestLocation.host = this.host_ || setting.destLocation.host;
        ajax.url = !setting.server.query ? requestLocation.href
                                         : [
                                             requestLocation.protocol,
                                             '//',
                                             requestLocation.host,
                                             requestLocation.pathname.replace(/^\/?/, '/'),
                                             requestLocation.search.replace(/&*$/, '&' + setting.server.query).replace(/^\??&/, '?').replace(/(\?|&)$/, ''),
                                             requestLocation.hash
                                           ].join('');
        switch (event.type.toLowerCase()) {
          case 'click':
            ajax.type = 'GET';
            break;

          case 'submit':
            ajax.type = (<HTMLFormElement>event.currentTarget).method.toUpperCase();
            switch (ajax.type) {
              case 'POST':
                if (!jQuery(event.currentTarget).has(':file').length) {
                  ajax.data = jQuery(event.currentTarget).serializeArray();
                } else if ('function' === typeof FormData) {
                  ajax.data = new FormData(<HTMLFormElement>event.currentTarget);
                  ajax.contentType = false;
                  ajax.processData = false;
                }
                break;
              case 'GET':
                break;
            }
            break;

          case 'popstate':
            ajax.type = 'GET';
            break;
        }

        callbacks = {
          xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
            var jqXHR: JQueryXHR;
            jqXHR = Util.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
            jqXHR = 'object' === typeof jqXHR ? jqXHR : jQuery.ajaxSettings.xhr();

            //if (jqXHR instanceof Object && jqXHR instanceof window.XMLHttpRequest && 'onprogress' in jqXHR) {
            //  jqXHR.addEventListener('progress', function(event) {dataSize = event.loaded;}, false);
            //}
            return jqXHR;
          },
          beforeSend: !setting.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function (jqXHR: JQueryXHR, ajaxSetting: JQueryAjaxSettings) {
            if (setting.server.header) {
              jqXHR.setRequestHeader(setting.nss.requestHeader, 'true');
            }
            if ('object' === typeof setting.server.header) {
              jqXHR.setRequestHeader(setting.nss.requestHeader, 'true');
              setting.server.header.area && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
              setting.server.header.head && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
              setting.server.header.css && jqXHR.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
              setting.server.header.script && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
            }

            Util.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, jqXHR, ajaxSetting]);
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return Util.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
          },
          success: success,
          error: error,
          complete: complete
        };

        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

        this.jqXHR_ = this.model_.setXHR(jQuery.ajax(ajax));

        if (this.model_.isDeferrable) {
          jQuery.when(this.jqXHR_, that.wait(wait))
          .done(done).fail(fail).always(always);
        }
      }

    }

    // mixin utility
    createHTMLDocument(html: string, uri: string): Document { return }
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string { return }
    movePageNormally(event: JQueryEventObject): void { }
    calAge(jqXHR: JQueryXHR): number { return }
    calExpires(jqXHR: JQueryXHR): number { return }
    dispatchEvent(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void { }
    wait(ms: number): JQueryDeferred<any> { return }

  }

}
