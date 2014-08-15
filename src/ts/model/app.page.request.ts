/// <reference path="../define.ts"/>
/// <reference path="app.page.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class AppPageRequest extends AppPage implements AppPageRequestInterface {

    constructor(

    public model_: ModelInterface,
    public app_: ModelAppInterface,
    public setting_: SettingInterface,
    public event_: JQueryEventObject,
    public register_: boolean,
    public cache_: CacheInterface,
    public done_: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any,
    public fail_: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any
    ) {
      super();
      this.main_();
    }

    host_: string
    data_: string
    textStatus_: string
    jqXHR_: JQueryXHR
    errorThrown_: string

    main_(): void {
      var that = this,
          setting = this.setting_,
          event = this.event_ = jQuery.extend(true, {}, this.event_),
          register = this.register_,
          cache = this.cache_,
          globalXHR = this.model_.getGlobalXHR(),
          wait: number = UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);

      var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      if (UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) { return; }

      this.app_.isScrollPosSavable = false;
      setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

      function done(ajax: any[], wait: void) {
        that.data_ = ajax[0];
        that.textStatus_ = ajax[1];
        that.jqXHR_ = ajax[2];
        UTIL.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(ajax));
      }
      function fail(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
        that.jqXHR_ = jqXHR;
        that.textStatus_ = textStatus;
        that.errorThrown_ = errorThrown;
        UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(arguments));
      }
      function always() {
        UTIL.fire(setting.callbacks.ajax.always, this, [event, setting.param].concat(arguments));
        that.model_.setGlobalXHR(null);

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
        UTIL.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, jqXHR]);
      }
      function error(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
        that.jqXHR_ = jqXHR;
        that.textStatus_ = textStatus;
        that.errorThrown_ = errorThrown;
        UTIL.fire(setting.callbacks.ajax.error, this, [event, setting.param, jqXHR, textStatus, errorThrown]);
      }
      function complete(jqXHR: JQueryXHR, textStatus: string) {
        UTIL.fire(setting.callbacks.ajax.complete, this, [event, setting.param, jqXHR, textStatus]);
        that.model_.setGlobalXHR(null);

        if (!that.model_.isDeferrable) {
          if (that.data_) {
            that.done_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
          } else {
            that.fail_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
          }
        }
      }

      this.dispatchEvent_(document, setting.gns + ':fetch', false, true);
      jQuery(document).trigger(setting.gns + '.fetch');

      if (cache && cache.jqXHR) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        setting.loadtime = 0;
        this.model_.setGlobalXHR(null);
        this.host_ = cache.host || '';
        this.data_ = cache.jqXHR.responseText;
        this.textStatus_ = cache.textStatus;
        this.jqXHR_ = cache.jqXHR;
        if (this.model_.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve([that.data_, that.textStatus_, that.jqXHR_]), this.wait_(wait))
          .done(done).fail(fail).always(always);
        } else {
          var context: JQueryAjaxSettings = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
          context = context.context || context;
          success.call(context, that.data_, that.textStatus_, that.jqXHR_);
          complete.call(context, that.jqXHR_, that.textStatus_);
        }
      } else if (globalXHR && globalXHR.follow && 'abort' !== globalXHR.statusText && 'error' !== globalXHR.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, globalXHR.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        this.host_ = globalXHR.host || '';
        setting.loadtime = globalXHR.timeStamp;
        var wait = setting.wait && isFinite(globalXHR.timeStamp) ? Math.max(wait - new Date().getTime() + globalXHR.timeStamp, 0) : 0;
        jQuery.when(globalXHR, that.wait_(wait))
        .done(done).fail(fail).always(always);

      } else {
        // default
        setting.loadtime = event.timeStamp;
        var requestLocation = <HTMLAnchorElement>setting.destLocation.cloneNode(),
            ajax: JQueryAjaxSettings = {},
            callbacks = {};

        this.app_.chooseRequestServer(setting);
        this.host_ = setting.balance.self && this.model_.requestHost.split('//').pop() || '';
        requestLocation.host = this.host_ || setting.destLocation.host;
        ajax.url = !setting.server.query ? requestLocation.href
                                         : [
                                             requestLocation.protocol,
                                             '//',
                                             requestLocation.host,
                                             '/' === requestLocation.pathname.charAt(0) ? requestLocation.pathname : '/' + requestLocation.pathname,
                                             (1 < requestLocation.search.length ? requestLocation.search + '&' : '?') + setting.server.query,
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
            jqXHR = UTIL.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
            jqXHR = 'object' === typeof jqXHR && jqXHR || jQuery.ajaxSettings.xhr();

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

            UTIL.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, jqXHR, ajaxSetting]);
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return UTIL.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
          },
          success: success,
          error: error,
          complete: complete
        };

        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

        globalXHR = this.model_.setGlobalXHR(jQuery.ajax(ajax));

        if (this.model_.isDeferrable) {
          jQuery.when(globalXHR, that.wait_(wait))
          .done(done).fail(fail).always(always);
        }
      }

      if (UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) { return; }
    }

  }

}
