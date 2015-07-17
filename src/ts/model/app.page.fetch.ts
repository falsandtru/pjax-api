/// <reference path="../define.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageFetch {

    constructor(

    private model_: ModelInterface,
    private page_: PageInterface,
    private balancer_: BalancerInterface,
    private setting_: SettingInterface,
    private event_: JQueryEventObject,
    private success_: (setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, $xhr: JQueryXHR, host: string, bind: JQueryXHR) => any,
    private failure_: (setting: SettingInterface, event: JQueryEventObject, data: string, textStatus: string, $xhr: JQueryXHR, host: string, bind: JQueryXHR) => any
    ) {
      this.main_();
    }
    
    private util_ = LIBRARY.Utility

    private host_: string
    private data_: string
    private textStatus_: string
    private jqXHR_: JQueryXHR
    private bind_: JQueryXHR
    private errorThrown_: string

    private main_(): void {
      var that = this,
          setting = this.setting_,
          event = this.event_ = jQuery.extend(true, {}, this.event_),
          wait: number = <number>this.util_.fire(setting.wait, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]);

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      var cache: CacheInterface;
      switch (setting.cache[event.type.toLowerCase()] && event.type.toLowerCase()) {
        case EVENT.CLICK:
          cache = this.model_.getCache(setting.destLocation.href);
          break;

        case EVENT.SUBMIT:
          cache = setting.cache[(<HTMLFormElement>event.currentTarget).method.toLowerCase()] ? this.model_.getCache(setting.destLocation.href) : cache;
          break;

        case EVENT.POPSTATE:
          cache = this.model_.getCache(setting.destLocation.href);
          break;
      }

      var $xhr = this.model_.getPageXHR();
      if ($xhr && $xhr.readyState < 4 && $xhr.location && this.model_.comparePageByUrl($xhr.location.href, setting.destLocation.href)) {
        return;
      }

      this.dispatchEvent(document, setting.nss.event.pjax.fetch, false, false);

      // rebalance
      this.balancer_.changeServer(this.balancer_.chooseServer(setting), setting);
      this.host_ = setting.balance.active && this.model_.host().split('//').pop() || '';
      var requestLocation = <HTMLAnchorElement>setting.destLocation.cloneNode();
      requestLocation.host = this.host_ || setting.destLocation.host;

      // bind
      var bind = this.util_.fire(setting.bind, setting, [event, setting, setting.origLocation.cloneNode(), requestLocation.cloneNode()]);
      this.model_.setDataXHR(bind && jQuery.ajax(bind));

      if (cache && cache.jqXHR && 200 === +cache.jqXHR.status) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        $xhr = cache.jqXHR;
        $xhr.location = $xhr.location || <HTMLAnchorElement>setting.destLocation.cloneNode();
        this.model_.setPageXHR($xhr);
        this.page_.loadtime = 0;
        this.host_ = this.balancer_.sanitize(cache.host, setting);
        this.data_ = cache.jqXHR.responseText;
        this.textStatus_ = cache.textStatus;
        this.jqXHR_ = cache.jqXHR;
        if (this.model_.isDeferrable) {
          var defer: JQueryDeferred<any> = this.wait_(wait);
          this.page_.setWait(defer);
          jQuery.when(jQuery.Deferred().resolve(this.data_, this.textStatus_, this.jqXHR_), defer, this.model_.getDataXHR())
          .done(done).fail(fail).always(always);
        } else {
          var context: JQueryAjaxSettings = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
          context = context.context || context;
          success.call(context, this.data_, this.textStatus_, this.jqXHR_);
          complete.call(context, this.jqXHR_, this.textStatus_);
        }
      } else if ($xhr && $xhr.follow && !~'error abort timeout parsererror'.indexOf($xhr.statusText)) {
        // preload
        speedcheck && speed.time.splice(0, 1, $xhr.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        $xhr.location = <HTMLAnchorElement>setting.destLocation.cloneNode();
        this.model_.setPageXHR($xhr);
        this.balancer_.sanitize($xhr, setting);
        this.balancer_.changeServer($xhr.host, setting);
        this.host_ = this.model_.host();
        this.page_.loadtime = $xhr.timeStamp;
        var defer: JQueryDeferred<any> = this.wait_(wait);
        this.page_.setWait(defer);
        delete $xhr.timeStamp;
        jQuery.when($xhr, defer, this.model_.getDataXHR())
        .done(done).fail(fail).always(always);
      } else {
        // default
        this.page_.loadtime = event.timeStamp;
        var ajax: JQueryAjaxSettings = {},
            callbacks: JQueryAjaxSettings = {};

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
          case EVENT.CLICK:
            ajax.type = 'GET';
            break;

          case EVENT.SUBMIT:
            ajax.type = (<HTMLFormElement>event.currentTarget).method.toUpperCase();
            switch (ajax.type) {
              case 'POST':
                if (!jQuery(event.currentTarget).has(':file').length) {
                  ajax.data = jQuery(event.currentTarget).serializeArray();
                } else if ('function' === typeof FormData) {
                  // Correspond to bug of TypeScript 1.1.0-1
                  ajax.data = (<any>new FormData)(<HTMLFormElement>event.currentTarget);
                  ajax.contentType = false;
                  ajax.processData = false;
                }
                break;
              case 'GET':
                break;
            }
            break;

          case EVENT.POPSTATE:
            ajax.type = 'GET';
            break;
        }

        ajax = jQuery.extend({}, setting.ajax, ajax, <JQueryAjaxSettings>{
          xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
            var $xhr: JQueryXHR;
            $xhr = that.util_.fire(setting.callbacks.ajax.xhr, this, [event, setting]);
            $xhr = 'object' === typeof $xhr ? $xhr : jQuery.ajaxSettings.xhr();

            //if ($xhr instanceof Object && $xhr instanceof window.XMLHttpRequest && 'onprogress' in $xhr) {
            //  $xhr.addEventListener('progress', function(event) {dataSize = event.loaded;}, false);
            //}
            return $xhr;
          },
          beforeSend: !setting.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function ($xhr: JQueryXHR, ajaxSetting: JQueryAjaxSettings) {
            if (setting.server.header) {
              $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
            }
            if ('object' === typeof setting.server.header) {
              $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
              setting.server.header.area && $xhr.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
              setting.server.header.head && $xhr.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
              setting.server.header.css && $xhr.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
              setting.server.header.script && $xhr.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
            }

            that.util_.fire(setting.callbacks.ajax.beforeSend, this, [event, setting, $xhr, ajaxSetting]);
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return that.util_.fire(setting.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
          },
          success: this.model_.isDeferrable ? null : success,
          error: this.model_.isDeferrable ? null : error,
          complete: this.model_.isDeferrable ? null : complete
        });

        $xhr = jQuery.ajax(ajax);
        $xhr.location = <HTMLAnchorElement>setting.destLocation.cloneNode();
        this.model_.setPageXHR($xhr);
        this.balancer_.sanitize($xhr, setting);

        if (!this.model_.isDeferrable) { return; }

        var defer: JQueryDeferred<any> = this.wait_(wait);
        this.page_.setWait(defer);

        jQuery.when(this.model_.getPageXHR(), defer, this.model_.getDataXHR())
        .done(done).fail(fail).always(always);
      }
      
      function success(data: string, textStatus: string, $xhr: JQueryXHR) {
        return done.call(this, [].slice.call(arguments), undefined);
      }
      function error($xhr: JQueryXHR, textStatus: string, errorThrown: string) {
        return fail.apply(this, arguments);
      }
      function complete($xhr: JQueryXHR, textStatus: string) {
        return always.apply(this, arguments);
      }
      function done(page: any[], wait: void, data: any[]) {
        if (!arguments.length || !arguments[0]) { return; }

        that.data_ = page[0];
        that.textStatus_ = page[1];
        that.jqXHR_ = page[2];

        switch (data && typeof data[0] === 'object' && (bind.dataType || data[2].getResponseHeader('Content-Type').split('/').pop())) {
          case 'json':
          case 'jsonp':
            data[2].responseJSON = data[0];
            break;
        }
        that.bind_ = data && data[2];

        that.util_.fire(setting.callbacks.ajax.success, this[0] || this, [event, setting, that.data_, that.textStatus_, that.jqXHR_]);
      }
      function fail($xhr: JQueryXHR, textStatus: string, errorThrown: string) {
        if (!arguments.length || !arguments[0]) { return; }

        that.jqXHR_ = $xhr;
        that.textStatus_ = textStatus;
        that.errorThrown_ = errorThrown;

        that.util_.fire(setting.callbacks.ajax.error, this[0] || this, [event, setting, that.jqXHR_, that.textStatus_, that.errorThrown_]);
      }
      function always() {
        if (!arguments.length || !arguments[0]) { return; }

        that.util_.fire(setting.callbacks.ajax.complete, this[0] || this, [event, setting, that.jqXHR_, that.textStatus_]);

        that.model_.setPageXHR(null);
        that.model_.setDataXHR(null);
        if (200 === +that.jqXHR_.status && (!that.bind_ || 200 === +that.bind_.status)) {
          that.model_.setCache(setting.destLocation.href, cache && cache.data || null, that.textStatus_, that.jqXHR_);
          that.success_(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_, that.bind_);
        } else {
          that.failure_(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_, that.bind_);
        }
      }
    }

    private wait_(ms: number): JQueryDeferred<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }
    
    // mixin utility
    chooseArea(areas: string | string[], srcDocument: Document, dstDocument: Document): string { return }
    dispatchEvent(target: Window | Document | HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void { }

  }

}
