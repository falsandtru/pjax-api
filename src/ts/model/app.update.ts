/// <reference path="../define.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class AppUpdate implements AppUpdateInterface {

    APP_: ModelApp

    constructor(APP: ModelApp,setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface) {
      var speedcheck = setting.speedcheck, speed = M.stock('speed');
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      var that = this;

      this.APP_ = APP

      if (UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) { return; }

      setting.scroll.record = false;
      setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

      var activeXHR = M.getActiveXHR();
      event = jQuery.extend(true, {}, event);
      this.setting_ = setting;
      this.cache_ = cache;
      this.event_ = event;
      this.register_ = register;

      function done(xhrArgs) {
        UTIL.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(xhrArgs));
      }
      function fail(xhrArgs) {
        UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));
      }
      function always(xhrArgs) {
        UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));

        M.setActiveXHR(null);
        var data: string, textStatus: string, jqXHR: JQueryXHR;
        if (2 < xhrArgs.length) {
          that.data_ = xhrArgs[0];
          that.textStatus_ = xhrArgs[1];
          that.jqXHR_ = xhrArgs[2];

          that.update_();
        } else if (setting.fallback && 'abort' !== xhrArgs.statusText) {
          if (setting.balance.self) {
            that.APP_.DATA.saveServerToDB(setting.balance.server.host, new Date().getTime());
            that.APP_.disableBalance();
          }
          M.fallback(event, setting);
        }
      }

      if (cache && cache.jqXHR) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        setting.loadtime = 0;
        M.setActiveXHR(null);
        this.data_ = cache.data;
        this.textStatus_ = cache.textStatus;
        this.jqXHR_ = cache.jqXHR;
        if (M.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve(), that.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done(() => that.update_()) && undefined
        } else {
          that.update_();
        }
      } else if (activeXHR && activeXHR.follow && 'abort' !== activeXHR.statusText && 'error' !== activeXHR.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, activeXHR.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        setting.loadtime = activeXHR.timeStamp;
        var wait = setting.wait && isFinite(activeXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + activeXHR.timeStamp, 0) : 0;
        jQuery.when(activeXHR, that.wait_(wait))
        .done(done).fail(fail).always(always);

      } else {
        // default
        setting.loadtime = event.timeStamp;
        var requestLocation = <HTMLAnchorElement>setting.destLocation.cloneNode(),
            ajax: JQueryAjaxSettings = {},
            callbacks = {};

        this.APP_.chooseRequestServer(setting);
        requestLocation.host = setting.balance.self && M.requestHost.split('//').pop() || setting.destLocation.host;
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
            if ('POST' === ajax.type) { ajax.data = jQuery(event.currentTarget).serializeArray(); }
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
              setting.server.header.area && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Area', setting.area[0]);
              setting.server.header.head && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
              setting.server.header.css && jqXHR.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
              setting.server.header.script && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
            }

            UTIL.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, jqXHR, ajaxSetting]);
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return UTIL.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
          },
          success: function (data: string, textStatus: string, jqXHR: JQueryXHR) {
            that.data_ = data;
            UTIL.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, jqXHR]);
          },
          error: function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
            that.errorThrown_ = errorThrown;
            UTIL.fire(setting.callbacks.ajax.error, this, [event, setting.param, jqXHR, textStatus, errorThrown]);
          },
          complete: function (jqXHR: JQueryXHR, textStatus: string) {
            UTIL.fire(setting.callbacks.ajax.complete, this, [event, setting.param, jqXHR, textStatus]);

            M.setActiveXHR(null);
            if (!that.errorThrown_) {
              if (!M.isDeferrable) {
                that.textStatus_ = textStatus;
                that.jqXHR_ = jqXHR;
                that.update_();
              }
            } else if (setting.fallback && 'abort' !== textStatus) {
              if (setting.balance.self) {
                that.APP_.disableBalance();
              }
              M.fallback(event, setting);
            }
          }
        };

        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

        activeXHR = M.setActiveXHR(jQuery.ajax(ajax));
        jQuery(document).trigger(jQuery.Event(setting.gns + '.request', activeXHR));
        
        if (M.isDeferrable) {
          jQuery.when(activeXHR, that.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done(done).fail(fail).always(always);
        }
      }

      if (UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) { return; }
    }

    setting_: SettingInterface
    cache_: CacheInterface
    checker_: JQuery = jQuery()
    loadwaits_: JQueryDeferred<any>[] = []

    event_: JQueryEventObject
    data_: string
    textStatus_: string
    jqXHR_: JQueryXHR
    errorThrown_: string
    register_: boolean
    srcDocument_: Document
    dstDocument_: Document

    update_(): void {
      UPDATE: {
        var that = this,
            APP = this.APP_;
        var setting: SettingInterface = this.setting_,
            cache: CacheInterface = this.cache_,
            event: JQueryEventObject = this.event_,
            register: boolean = this.register_,
            data: string = this.data_,
            textStatus: string = this.textStatus_,
            jqXHR: JQueryXHR = this.jqXHR_;
        var callbacks_update = setting.callbacks.update;

        setting.loadtime = setting.loadtime && new Date().getTime() - setting.loadtime;
        setting.loadtime = setting.loadtime < 100 ? 0 : setting.loadtime;

        var speedcheck = setting.speedcheck, speed = M.stock('speed');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

        M.setActiveSetting(setting);

        if (UTIL.fire(callbacks_update.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_, cache]) === false) { break UPDATE; }

        if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
          return M.fallback(event, setting);
        }

        /* variable initialization */

        try {
          APP.landing = null;
          if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }
          
          /* variable define */
          DEFINE: {
            this.srcDocument_ = APP.createHTMLDocument(jqXHR.responseText);
            this.dstDocument_ = document;
            
            var srcDocument: Document = this.srcDocument_,
                dstDocument: Document = this.dstDocument_;

            setting.area = APP.chooseAreas(setting.area, srcDocument, dstDocument);
            setting.area = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
            if (!setting.area) { throw new Error('throw: area notfound'); }
          }; // label: DEFINE
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

          /* cache */
          this.updateCache_();
          
          /* escape */
          jQuery('noscript', srcDocument).children().parent().each(function () { this.children.length && jQuery(this).text(this.innerHTML); });

          /* redirect */
          this.updateRedirect_();

          jQuery(window).trigger(setting.gns + '.unload');
          
          /* url */
          this.updateUrl_();

          setting.origLocation.href = setting.destLocation.href;
          
          /* title */
          this.updateTitle_();

          /* head */
          this.updateHead_();
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

          /* content */
          this.loadwaits_ = this.updateContent_();
          this.checker_ = jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check');
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

          /* escape */
          jQuery('noscript', srcDocument).remove();
          
          /* verify */
          this.updateVerify_();
          
          /* balance */
          this.updateBalance_();

          /* load */
          this.updateCSS_('link[rel~="stylesheet"], style');
          jQuery(window)
          .one(setting.gns + '.rendering', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            this.updateScroll_(false);
            jQuery(dstDocument).trigger(setting.gns + '.ready');
            this.updateScript_(':not([defer]), :not([src])');
            if (setting.load.sync) {
              var callback = () => this.updateScript_('[src][defer]');
              this.updateRender_(callback);
            } else {
              this.updateRender_(null);
              this.updateScript_('[src][defer]');
            }
          })
          .trigger(setting.gns + '.rendering');
          
          if (UTIL.fire(callbacks_update.success, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          if (UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          if (UTIL.fire(setting.callback, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
        } catch (err) {
          if (!err) { return; }

          /* cache delete */
          cache && M.removeCache(setting.destLocation.href);

          if (UTIL.fire(callbacks_update.error, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          if (UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          M.fallback(event, setting);
        };

        if (UTIL.fire(callbacks_update.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
      }; // label: UPDATE
    }

    updateCache_(): void {
      var setting: SettingInterface = this.setting_,
          cache: CacheInterface = this.cache_,
          event: JQueryEventObject = this.event_,
          data: string = this.data_,
          textStatus: string = this.textStatus_,
          jqXHR: JQueryXHR = this.jqXHR_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.cache.click && !setting.cache.submit && !setting.cache.popstate) { return; }
      if ('submit' === event.type.toLowerCase() && !setting.cache[(<HTMLFormElement>event.currentTarget).method.toLowerCase()]) { return; }

      if (UTIL.fire(callbacks_update.cache.before, null, [event, setting.param, cache]) === false) { return; }

      M.setCache(setting.destLocation.href, cache && cache.data || null, textStatus, jqXHR);
      cache = M.getCache(setting.destLocation.href);
      this.cache_ = cache;

      if (cache && cache.data) {
        var cacheDocument: Document = this.APP_.createHTMLDocument(cache.data),
            srcDocument: Document = this.srcDocument_;

        srcDocument.title = cacheDocument.title;
        var i: number = -1, $srcAreas: JQuery, $dstAreas: JQuery
              while (setting.area[++i]) {
          $srcAreas = jQuery(setting.area[i], cacheDocument).clone();
          $dstAreas = jQuery(setting.area[i], srcDocument);
          var j: number = -1;
          while ($srcAreas[++j]) {
            $dstAreas.eq(j).replaceWith($srcAreas.eq(j));
          }
        }
      }

      if (UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) { return; }

      return;
    }

    updateRedirect_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          register: boolean = this.register_;
      var callbacks_update = setting.callbacks.update;

      if (!<HTMLAnchorElement>jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_)[0]) { return; }

      if (UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; };

      var redirect = <HTMLAnchorElement>setting.destLocation.cloneNode();
      redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
      switch (true) {
        case !setting.redirect:
        case redirect.protocol !== setting.destLocation.protocol:
        case redirect.host !== setting.destLocation.host:
        case 'submit' === event.type.toLowerCase() && 'GET' === (<HTMLFormElement>event.currentTarget).method.toUpperCase():
          switch (event.type.toLowerCase()) {
            case 'click':
            case 'submit':
              return window.location.assign(redirect.href);
            case 'popstate':
              return window.location.replace(redirect.href);
          }
        default:
          jQuery[M.NAME].enable();
          switch (event.type.toLowerCase()) {
            case 'click':
              return void jQuery[M.NAME].click(redirect.href);
            case 'submit':
              return void 'GET' === (<HTMLFormElement>event.currentTarget).method.toUpperCase() ? jQuery[M.NAME].click(redirect) : window.location.assign(redirect.href);
            case 'popstate':
              window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
              if (register && setting.fix.location) {
                jQuery[M.NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[M.NAME].enable();
              }
              return void jQuery(window).trigger('popstate.' + setting.gns);
          }
      }

      if (UTIL.fire(callbacks_update.redirect.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    updateUrl_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          register: boolean = this.register_;
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.url.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; };

      register &&
      window.history.pushState(
        UTIL.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]),
        window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title,
        setting.destLocation.href);

      if (register && setting.fix.location) {
        jQuery[M.NAME].disable();
        window.history.back();
        window.history.forward();
        jQuery[M.NAME].enable();
      }

      if (UTIL.fire(callbacks_update.url.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    updateTitle_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.title.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
      this.dstDocument_.title = this.srcDocument_.title;
      setting.database && setting.fix.history && this.APP_.DATA.saveTitleToDB(setting.destLocation.href, this.srcDocument_.title);
      if (UTIL.fire(callbacks_update.title.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    updateHead_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.head) { return; }

      if (UTIL.fire(callbacks_update.head.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var title: JQuery = jQuery('title'),
        adds = [],
        srcElements: JQuery,
        dstElements: JQuery;

      srcElements = jQuery('head', srcDocument).find(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script');
      dstElements = jQuery('head', dstDocument).find(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script');

      for (var i = 0, element, selector; element = srcElements[i]; i++) {
        element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);
        switch (element.tagName.toLowerCase()) {
          case 'base':
            selector = '*';
            break;
          case 'link':
            selector = '[rel="' + element.getAttribute('rel') + '"]';
            switch ((element.getAttribute('rel') || '').toLowerCase()) {
              case 'alternate':
                selector += 'string' === typeof element.getAttribute('type') ? '[type="' + element.getAttribute('type') + '"]' : ':not([type])';
                break;
            }
            break;
          case 'meta':
            if (element.getAttribute('charset')) {
              selector = '[charset]';
            } else if (element.getAttribute('http-equiv')) {
              selector = '[http-equiv="' + element.getAttribute('http-equiv') + '"]';
            } else if (element.getAttribute('name')) {
              selector = '[name="' + element.getAttribute('name') + '"]';
            } else if (element.getAttribute('property')) {
              selector = '[property="' + element.getAttribute('property') + '"]';
            } else {
              continue;
            }
            break;
          default:
            selector = null;
        }
        if (!selector) { continue; }

        var targets = dstElements.filter(element.tagName).filter(selector);
        for (var j = targets.length; j--;) {
          if (targets[j].outerHTML === element.outerHTML) {
            dstElements = dstElements.not(targets[j]);
            element = null;
            break;
          }
        }
        element && adds.push(element);
      }
      title.before(adds);
      dstElements.remove();

      if (UTIL.fire(callbacks_update.head.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    updateContent_(): JQueryDeferred<any>[] {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;
      var checker: JQuery = jQuery(),
          loadwaits: JQueryDeferred<any>[] = [];

      if (UTIL.fire(callbacks_update.content.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return loadwaits; }

      jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check').remove();
      checker = jQuery('<div/>', {
        'class': setting.nss.class4html + '-check',
        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
      }).text(setting.gns);
      var i: number = -1, $srcAreas: JQuery, $dstAreas: JQuery;
      while (setting.area[++i]) {
        $srcAreas = jQuery(setting.area[i], srcDocument).clone().find('script').remove().end();
        $dstAreas = jQuery(setting.area[i], dstDocument);
        if (!$srcAreas[0] || !$dstAreas[0] || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }
        if (setting.load.sync && jQuery.when) {
          loadwaits.concat($srcAreas.find('img, iframe, frame').map(function () {
            var defer = jQuery.Deferred();
            jQuery(this).one('load error', defer.resolve);
            return defer;
          }).get());
        }
        var j: number = -1;
        while ($srcAreas[++j]) {
          $dstAreas.eq(j).replaceWith($srcAreas.eq(j).append(checker.clone()));
        }
      }
      jQuery(dstDocument).trigger(setting.gns + '.DOMContentLoaded');

      if (UTIL.fire(callbacks_update.content.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return loadwaits; }

      return loadwaits;
    }

    updateScroll_(call: boolean): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.scroll.before, null, [event, setting.param]) === false) { return; }

      var scrollX: any, scrollY: any;
      switch (event.type.toLowerCase()) {
        case 'click':
        case 'submit':
          scrollX = call && 'function' === typeof setting.scrollLeft ? UTIL.fire(setting.scrollLeft, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollLeft;
          scrollX = 0 <= scrollX ? scrollX : 0;
          scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);

          scrollY = call && 'function' === typeof setting.scrollTop ? UTIL.fire(setting.scrollTop, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollTop;
          scrollY = 0 <= scrollY ? scrollY : 0;
          scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);

          (jQuery(window).scrollTop() === scrollY && jQuery(window).scrollLeft() === scrollX) || window.scrollTo(scrollX, scrollY);
          break;
        case 'popstate':
          call && setting.fix.scroll && setting.database && setting.scroll.record && this.APP_.DATA.loadScrollPositionFromCacheOrDB(setting.destLocation.href);
          break;
      }
      call && setting.database && setting.fix.scroll && this.APP_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, scrollX, scrollY);

      if (UTIL.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) { return; }
    }

    updateCSS_(selector: string): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.css) { return; }

      if (UTIL.fire(callbacks_update.css.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var css: JQuery = jQuery(selector, srcDocument).not(jQuery(setting.area.join(','), srcDocument).find(selector)).not(setting.load.ignore),
          removes = jQuery(selector, dstDocument).not(jQuery(setting.area.join(','), dstDocument).find(selector)).not(setting.load.ignore),
          adds: HTMLElement[] = [];

      for (var i = 0, element; element = css[i]; i++) {
        element = 'function' === typeof setting.load.rewrite && void UTIL.fire(setting.load.rewrite, null, [element]) || element;

        //element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element).clone()[0];

        for (var j = 0; removes[j]; j++) {
          if (UTIL.trim((<HTMLLinkElement>removes[j]).href || (<HTMLStyleElement>removes[j]).innerHTML || '') === UTIL.trim(element.href || element.innerHTML || '')) {
            if (adds.length) {
              element = removes.eq(j).prevAll(selector).first();
              element[0] ? element.after(jQuery(adds).clone()) : removes.eq(j).before(jQuery(adds).clone());
              adds = [];
            }
            removes = removes.not(removes[j]);
            j -= Number(!!j);
            element = null;
            break;
          }
        }
        element && adds.push(element);
      }
      jQuery('head', dstDocument).append(jQuery('head', srcDocument).find(jQuery(adds)).clone());
      jQuery('body', dstDocument).append(jQuery('body', srcDocument).find(jQuery(adds)).clone());
      removes.remove();

      if (UTIL.fire(callbacks_update.css.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = M.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
    }

    updateScript_(selector: string): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.script) { return; }

      if (UTIL.fire(callbacks_update.script.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var script: JQuery = jQuery('script', srcDocument).not(setting.load.ignore),
          execs: HTMLElement[] = [];

      var executed: { [index: string]: boolean; } = this.APP_.stock('executed');
      for (var i = 0, element; element = script[i]; i++) {
        element = 'function' === typeof setting.load.rewrite && void UTIL.fire(setting.load.rewrite, null, [element]) || element;
        
        //element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);

        if (!jQuery(element).is(selector)) { continue; }
        if (!element.src && !UTIL.trim(element.innerHTML)) { continue; }
        if (element.src in executed || setting.load.ignore && jQuery(element).is(setting.load.ignore)) { continue; }

        if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) { executed[element.src] = true; }
        element && execs.push(element);
      }

      for (var i = 0, element; element = execs[i]; i++) {
        try {
          if (element.src) {
            jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: !!element.async, global: false }));
          } else {
            'object' === typeof element && (!element.type || ~element.type.toLowerCase().indexOf('text/javascript')) &&
            eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(/^\s*<!(?:\[CDATA\[|\-\-)/, '/*$0*/'));
          }
        } catch (err) {
          break;
        }
      }

      if (UTIL.fire(callbacks_update.script.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = M.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push(('[src][defer]' === selector ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');
    }

    updateRender_(callback: () => void): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          checker = this.checker_,
          loadwaits = this.loadwaits_;

      var callbacks_update = setting.callbacks.update;

      var rendered = (callback) => {
        var speedcheck = setting.speedcheck, speed = M.stock('speed');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

        checker.remove();
        setting.scroll.record = true;
        if ('popstate' !== event.type.toLowerCase()) {
          this.APP_.scrollByHash(setting.destLocation.hash) || this.updateScroll_(true);
          setTimeout(() => this.APP_.scrollByHash(setting.destLocation.hash), 50);
        } else {
          this.updateScroll_(true);
        }

        jQuery(document).trigger(setting.gns + '.render');
        UTIL.fire(callback);

        function onload() {
          jQuery(window).trigger(setting.gns + '.load');
        }
        if (setting.load.sync && jQuery.when && loadwaits[0]) {
          jQuery.when.apply(jQuery, loadwaits).always(onload);
        } else {
          onload();
        }

        speedcheck && console.log(speed.time);
        speedcheck && console.log(speed.name);
        if (UTIL.fire(callbacks_update.render.after, null, [event, setting.param]) === false) { return; }
      } // function: rendered

      if (UTIL.fire(callbacks_update.render.before, null, [event, setting.param]) === false) { return; }

      var count = 0;
      (function check() {
        switch (true) {
          case 100 <= count:
          case UTIL.canonicalizeUrl(window.location.href) !== setting.destLocation.href:
            break;
          case checker.length === checker.filter(function () { return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden'); }).length:
            rendered(callback);
            break;
          case 0 < checker.length:
            ++count && setTimeout(check, setting.interval);
        }
      })();
    }

    updateVerify_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.verify.before, null, [event, setting.param]) === false) { return; }

      // モバイルブラウザでアドレスバーのURLのパーセントエンコーディングの大文字小文字がアンカーと一致しないため揃える必要がある
      if (setting.destLocation.href === UTIL.canonicalizeUrl(window.location.href).replace(/(?:%\w{2})+/g, function (str) { return String(setting.destLocation.href.match(str.toLowerCase()) || str); })) {
        setting.retriable = true;
      } else if (setting.retriable) {
        setting.retriable = false;
        setting.destLocation.href = UTIL.canonicalizeUrl(window.location.href);
        new AppUpdate(this.APP_, setting, event, false, setting.cache[event.type.toLowerCase()] && M.getCache(setting.destLocation.href));
        throw false;
      } else {
        throw new Error('throw: location mismatch');
      }

      if (UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]) === false) { return; }
    }

    updateBalance_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.balance.self || !setting.loadtime) { return; }

      if (UTIL.fire(callbacks_update.balance.before, null, [event, setting.param]) === false) { return; }

      var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || '').split('//').pop();
      this.APP_.DATA.saveLogToDB({
        host: host,
        response: setting.loadtime,
        date: new Date().getTime()
      });
      this.APP_.DATA.saveServerToDB(host, 0, setting.destLocation.href, this.APP_.calExpires(this.jqXHR_));
      this.APP_.chooseRequestServer(setting);

      if (UTIL.fire(callbacks_update.balance.after, null, [event, setting.param]) === false) { return; }
    }

    wait_(ms: number): JQueryPromise<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }

  }
}
