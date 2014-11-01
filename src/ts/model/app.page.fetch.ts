/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageFetch implements PageFetchInterface {

    constructor(

    private model_: ModelInterface,
    private app_: AppLayerInterface,
    private page_: PageInterface,
    private setting_: SettingInterface,
    private event_: JQueryEventObject,
    private cache_: CacheInterface,
    private done_: (setting: SettingInterface, event: JQueryEventObject, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any,
    private fail_: (setting: SettingInterface, event: JQueryEventObject, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any
    ) {
      this.main_();
    }
    
    private util_ = LIBRARY.Utility

    private host_: string
    private loadtime_: number
    private data_: string
    private textStatus_: string
    private jqXHR_: JQueryXHR
    private errorThrown_: string

    private main_(): void {
      var that = this,
          setting = this.setting_,
          event = this.event_ = jQuery.extend(true, {}, this.event_),
          cache = this.cache_,
          wait: number = this.util_.fire(setting.wait, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]);

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      this.app_.page.isScrollPosSavable = false;
      setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

      function success(data: string, textStatus: string, jqXHR: JQueryXHR) {
        return that.model_.isDeferrable ? undefined : done.call(this, [].slice.call(arguments), undefined);
      }
      function error(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
        return that.model_.isDeferrable ? undefined : fail.apply(this, arguments);
      }
      function complete(jqXHR: JQueryXHR, textStatus: string) {
        return that.model_.isDeferrable ? undefined : always.apply(this, arguments);
      }
      function done(ajax: any[], wait: void) {
        that.data_ = ajax[0];
        that.textStatus_ = ajax[1];
        that.jqXHR_ = ajax[2];

        that.util_.fire(setting.callbacks.ajax.success, this, [event, setting, that.data_, that.textStatus_, that.jqXHR_]);
      }
      function fail(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
        that.jqXHR_ = jqXHR;
        that.textStatus_ = textStatus;
        that.errorThrown_ = errorThrown;

        that.util_.fire(setting.callbacks.ajax.error, this, [event, setting, that.jqXHR_, that.textStatus_, that.errorThrown_]);
      }
      function always() {
        that.util_.fire(setting.callbacks.ajax.complete, this, [event, setting, that.jqXHR_, that.textStatus_]);

        that.model_.setXHR(null);

        if (that.data_) {
          that.done_(setting, event, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
        } else {
          that.fail_(setting, event, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
        }
      }

      this.page_.dispatchEvent(document, DEF.NAME + ':fetch', false, true);

      var xhr = this.model_.getXHR();
      if (cache && cache.jqXHR) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        this.page_.loadtime = 0;
        xhr && xhr.abort();
        this.model_.setXHR(null);
        this.host_ = cache.host || '';
        this.data_ = cache.jqXHR.responseText;
        this.textStatus_ = cache.textStatus;
        this.jqXHR_ = cache.jqXHR;
        if (this.model_.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve(this.data_, this.textStatus_, this.jqXHR_), this.page_.wait(wait))
          .done(done).fail(fail).always(always);
        } else {
          var context: JQueryAjaxSettings = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
          context = context.context || context;
          success.call(context, this.data_, this.textStatus_, this.jqXHR_);
          complete.call(context, this.jqXHR_, this.textStatus_);
        }
      } else if (xhr && xhr.follow && 'abort' !== xhr.statusText && 'error' !== xhr.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, xhr.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        this.host_ = xhr.host || '';
        this.page_.loadtime = xhr.timeStamp;
        var wait = setting.wait && isFinite(xhr.timeStamp) ? Math.max(wait - new Date().getTime() + xhr.timeStamp, 0) : 0;
        jQuery.when(xhr, this.page_.wait(wait))
        .done(done).fail(fail).always(always);

      } else {
        // default
        this.page_.loadtime = event.timeStamp;
        xhr && xhr.abort();
        var requestLocation = <HTMLAnchorElement>setting.destLocation.cloneNode(),
            ajax: JQueryAjaxSettings = {},
            callbacks: JQueryAjaxSettings = {};

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

        callbacks = <JQueryAjaxSettings>{
          xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
            var jqXHR: JQueryXHR;
            jqXHR = this.util_.fire(setting.callbacks.ajax.xhr, this, [event, setting]);
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

            that.util_.fire(setting.callbacks.ajax.beforeSend, this, [event, setting, jqXHR, ajaxSetting]);
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return that.util_.fire(setting.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
          },
          success: success,
          error: error,
          complete: complete
        };

        ajax = jQuery.extend({}, setting.ajax, callbacks, ajax);
        this.jqXHR_ = this.model_.setXHR(jQuery.ajax(ajax));

        if (!this.model_.isDeferrable) { return; }

        jQuery.when(this.jqXHR_, this.page_.wait(wait))
        .done(done).fail(fail).always(always);
      }

    }

  }

}
