/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class AppUpdate implements AppUpdateInterface {

    constructor(public model_: ModelInterface, public app_: ModelAppInterface, setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface) {
      this.ready_(setting, event, register, cache);
    }

    setting_: SettingInterface
    cache_: CacheInterface
    loadwaits_: JQueryDeferred<void>[] = []

    event_: JQueryEventObject
    host_: string
    data_: string
    textStatus_: string
    jqXHR_: JQueryXHR
    errorThrown_: string
    register_: boolean
    srcDocument_: Document
    dstDocument_: Document

    ready_(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface): void {
      var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      var that = this;

      if (UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) { return; }

      this.app_.isScrollPosSavable = false;
      setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

      var globalXHR = this.model_.getGlobalXHR();
      event = jQuery.extend(true, {}, event);
      this.setting_ = setting;
      this.cache_ = cache;
      this.event_ = event;
      this.register_ = register;

      function done(ajax, wait) {
        that.data_ = ajax[0];
        that.textStatus_ = ajax[1]
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
        that.model_.setGlobalXHR(null);

        switch ('string') {
          case typeof that.data_:
            UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat([that.data_, that.textStatus_, that.jqXHR_]));
            that.update_();
            break;

          case typeof that.errorThrown_:
            UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat([that.jqXHR_, that.textStatus_, that.errorThrown_]));
            if ('abort' !== that.textStatus_) {
              if (setting.balance.self) {
                that.app_.data.saveServerToDB(setting.balance.server.host, new Date().getTime());
                that.app_.disableBalance();
              }
              setting.fallback && that.model_.fallback(event, setting);
            }
            break;
        }
      }

      if (cache && cache.jqXHR) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        setting.loadtime = 0;
        this.model_.setGlobalXHR(null);
        this.host_ = cache.host || '';
        this.data_ = cache.data;
        this.textStatus_ = cache.textStatus;
        this.jqXHR_ = cache.jqXHR;
        if (this.model_.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve(), that.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done(() => that.update_()) && undefined
        } else {
          that.update_();
        }
      } else if (globalXHR && globalXHR.follow && 'abort' !== globalXHR.statusText && 'error' !== globalXHR.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, globalXHR.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        this.host_ = globalXHR.host || '';
        setting.loadtime = globalXHR.timeStamp;
        var wait = setting.wait && isFinite(globalXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + globalXHR.timeStamp, 0) : 0;
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

            that.model_.setGlobalXHR(null);
            if (!that.errorThrown_) {
              if (!that.model_.isDeferrable) {
                that.textStatus_ = textStatus;
                that.jqXHR_ = jqXHR;
                that.update_();
              }
            } else if (setting.fallback && 'abort' !== textStatus) {
              if (setting.balance.self) {
                that.app_.disableBalance();
              }
              that.model_.fallback(event, setting);
            }
          }
        };

        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

        globalXHR = this.model_.setGlobalXHR(jQuery.ajax(ajax));
        this.dispatchEvent_(document, setting.gns + ':request', false, true);
        jQuery(document).trigger(setting.gns + '.request');
        
        if (this.model_.isDeferrable) {
          jQuery.when(globalXHR, that.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done(done).fail(fail).always(always);
        }
      }

      if (UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) { return; }
    }

    update_(): void {
      UPDATE: {
        var that = this,
            APP = this.app_;
        var setting: SettingInterface = this.setting_,
            event: JQueryEventObject = this.event_,
            register: boolean = this.register_,
            data: string = this.data_,
            textStatus: string = this.textStatus_,
            jqXHR: JQueryXHR = this.jqXHR_;
        var callbacks_update = setting.callbacks.update;

        setting.loadtime = setting.loadtime && new Date().getTime() - setting.loadtime;
        setting.loadtime = setting.loadtime < 100 ? 0 : setting.loadtime;

        var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

        if (UTIL.fire(callbacks_update.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_, this.cache_]) === false) { break UPDATE; }
        
        if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
          return this.model_.fallback(event, setting);
        }
        
        /* variable initialization */
        
        try {
          APP.landing = null;
          if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }
          
          /* variable define */
          DEFINE: {
            this.srcDocument_ = APP.createHTMLDocument(jqXHR.responseText, setting.destLocation.href);
            this.dstDocument_ = document;
            
            var srcDocument: Document = this.srcDocument_,
                dstDocument: Document = this.dstDocument_;

            // 更新範囲を選出
            setting.area = this.app_.chooseArea(setting.area, srcDocument, dstDocument);
            if (!setting.area) { throw new Error('throw: area notfound'); }
            // 更新範囲をセレクタごとに分割
            setting.areas = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
          }; // label: DEFINE
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');
          
          /* cache */
          this.updateCache_();
          
          /* escape */
          setting.fix.noscript && jQuery('noscript', this.srcDocument_).children().parent().each(function () { jQuery(this).text(this.innerHTML); });

          /* rewrite */
          this.updateRewrite_();
          
          /* redirect */
          this.updateRedirect_();
          
          this.dispatchEvent_(window, setting.gns + ':unload', false, true);
          jQuery(window).trigger(setting.gns + '.unload');
          
          /* url */
          this.updateUrl_();

          /* verify */
          this.updateVerify_();
          
          /* setting */
          this.model_.setGlobalSetting(jQuery.extend(true, {}, setting, { origLocation: setting.destLocation.cloneNode() }));
          
          /* title */
          this.updateTitle_();

          /* head */
          this.updateHead_();
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

          /* content */
          this.loadwaits_ = this.updateContent_();
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

          /* balance */
          this.updateBalance_();

          /* load */
          this.updateLoad_();
          
          if (UTIL.fire(callbacks_update.success, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          if (UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          if (UTIL.fire(setting.callback, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
        } catch (err) {
          if (!err) { return; }

          /* cache delete */
          this.cache_ && this.model_.removeCache(setting.destLocation.href);

          if (UTIL.fire(callbacks_update.error, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          if (UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { break UPDATE; }
          this.model_.fallback(event, setting);
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

      this.model_.setCache(setting.destLocation.href, cache && cache.data || null, textStatus, jqXHR);
      cache = this.model_.getCache(setting.destLocation.href);
      this.cache_ = cache;

      if (cache && cache.data) {
        var cacheDocument: Document = this.app_.createHTMLDocument(cache.data, setting.destLocation.href),
            srcDocument: Document = this.srcDocument_;

        srcDocument.title = cacheDocument.title;

        var $srcAreas: JQuery,
            $dstAreas: JQuery;
        for (var i = 0; setting.areas[i]; i++) {
          $srcAreas = jQuery(setting.areas[i], cacheDocument).clone();
          $dstAreas = jQuery(setting.areas[i], srcDocument);
          if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }

          for (var j = 0; $srcAreas[j]; j++) {
            $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
          }
        }
      }

      if (UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) { return; }
    }
    
    updateRewrite_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.rewrite) { return; }

      if (UTIL.fire(callbacks_update.rewrite.before, null, [event, setting.param]) === false) { return; }

      UTIL.fire(setting.rewrite, null, [this.srcDocument_, setting.area, this.host_])

      if (UTIL.fire(callbacks_update.rewrite.before, null, [event, setting.param]) === false) { return; }
    }

    updateRedirect_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          register: boolean = this.register_;
      var callbacks_update = setting.callbacks.update;

      if (!jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_).length) { return; }

      if (UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; };

      var redirect = <HTMLAnchorElement>setting.destLocation.cloneNode();
      redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
      switch (true) {
        case !setting.redirect:
        case redirect.protocol !== setting.destLocation.protocol:
        case redirect.host !== setting.destLocation.host:
        case 'submit' === event.type.toLowerCase() && 'GET' !== (<HTMLFormElement>event.currentTarget).method.toUpperCase():
          switch (event.type.toLowerCase()) {
            case 'click':
            case 'submit':
              window.location.assign(redirect.href);
              break;
            case 'popstate':
              window.location.replace(redirect.href);
              break;
          }
          throw false;

        default:
          jQuery[NAME].enable();
          switch (event.type.toLowerCase()) {
            case 'click':
            case 'submit':
              setTimeout(() => jQuery[NAME].click(redirect.href), 0);
              break;
            case 'popstate':
              window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
              if (register && setting.fix.location) {
                jQuery[NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[NAME].enable();
              }
              setTimeout(() => this.dispatchEvent_(window, 'popstate', false, false), 0);
              break;
          }
          throw false;
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
        jQuery[NAME].disable();
        window.history.back();
        window.history.forward();
        jQuery[NAME].enable();
      }

      if (UTIL.fire(callbacks_update.url.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
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
        new this.app_.Update(this.model_, this.app_, setting, event, false, setting.cache[event.type.toLowerCase()] && this.model_.getCache(setting.destLocation.href));
        throw false;
      } else {
        throw new Error('throw: location mismatch');
      }

      if (UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]) === false) { return; }
    }

    updateTitle_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.title.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      this.dstDocument_.title = this.srcDocument_.title;
      setting.database && setting.fix.history && this.app_.data.saveTitleToDB(setting.destLocation.href, this.srcDocument_.title);

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

      var prefilter: string = 'base, meta, link',
          $srcElements: JQuery = jQuery('head', srcDocument).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'),
          $dstElements: JQuery = jQuery('head', dstDocument).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'),
          $addElements: JQuery = jQuery(),
          $delElements: JQuery = $dstElements,
          $title: JQuery = jQuery('title', dstDocument);

      for (var i = 0, element: HTMLElement, selector: string; element = $srcElements[i]; i++) {
        for (var j = 0; $delElements[j]; j++) {
          if ($delElements[j].tagName === element.tagName && $delElements[j].outerHTML === element.outerHTML) {
            if ($addElements.length) {
              element = $dstElements[$dstElements.index($delElements[j]) - 1];
              element ? jQuery(element).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
              $addElements = jQuery();
            }
            $delElements = $delElements.not($delElements[j]);
            element = null;
            break;
          }
        }
        $addElements = $addElements.add(element);
      }
      $title.before($addElements.clone());
      $delElements.remove();

      if (UTIL.fire(callbacks_update.head.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    updateContent_(): JQueryDeferred<any>[] {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      var checker: JQuery,
          loadwaits: JQueryDeferred<void>[] = [];

      if (UTIL.fire(callbacks_update.content.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return loadwaits; }

      function map() {
        var defer = jQuery.Deferred();
        jQuery(this).one('load error', defer.resolve);
        return defer;
      }

      jQuery(setting.area).children('.' + setting.nss.class4html + '-check').remove();
      checker = jQuery('<div/>', {
        'class': setting.nss.class4html + '-check',
        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
      }).text(setting.gns);

      var $srcAreas: JQuery,
          $dstAreas: JQuery;
      for (var i = 0; setting.areas[i]; i++) {
        $srcAreas = jQuery(setting.areas[i], srcDocument).clone();
        $dstAreas = jQuery(setting.areas[i], dstDocument);
        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }

        $srcAreas.find('script').each((i, elem) => this.escapeScript_(<HTMLScriptElement>elem));
        if (jQuery.when) {
          loadwaits.concat($srcAreas.find('img, iframe, frame').map(map).get());
        }

        for (var j = 0; $srcAreas[j]; j++) {
          $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
        }

        $dstAreas = jQuery(setting.areas[i], dstDocument);
        $dstAreas.append(checker[0].outerHTML);
        $dstAreas.find('script').each((i, elem) => this.restoreScript_(<HTMLScriptElement>elem));
      }
      this.dispatchEvent_(document, setting.gns + ':DOMContentLoaded', false, true);
      jQuery(document).trigger(setting.gns + '.DOMContentLoaded');

      if (UTIL.fire(callbacks_update.content.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return loadwaits; }

      return loadwaits;
    }
    
    updateBalance_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.balance.self || !setting.loadtime) { return; }

      if (UTIL.fire(callbacks_update.balance.before, null, [event, setting.param]) === false) { return; }

      var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || '').split('//').pop();
      this.app_.data.saveLogToDB({
        host: host,
        performance: Math.ceil(setting.loadtime / (this.jqXHR_.responseText.length || 1) * 1e5),
        date: new Date().getTime()
      });
      this.app_.data.saveServerToDB(host, 0, setting.destLocation.href, this.app_.calExpires(this.jqXHR_));
      this.app_.chooseRequestServer(setting);

      this.app_.data.loadBufferAll(setting.buffer.limit);

      if (UTIL.fire(callbacks_update.balance.after, null, [event, setting.param]) === false) { return; }
    }

    updateLoad_(): void {
      var setting: SettingInterface = this.setting_,
          dstDocument: Document = this.dstDocument_;

      this.updateCSS_('link[rel~="stylesheet"], style');
      jQuery(window)
      .one(setting.gns + ':rendering', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        this.updateScroll_(false);

        var scriptwaits = this.updateScript_(':not([defer]), :not([src])');
        var ready = () => {
          this.dispatchEvent_(document, setting.gns + ':ready', false, true);
          jQuery(document).trigger(setting.gns + '.ready');

          var checker = jQuery(setting.area).children('.' + setting.nss.class4html + '-check'),
              limit = new Date().getTime() + 5 * 1000;
          var check = () => {
            switch (true) {
              case setting.destLocation.href !== UTIL.canonicalizeUrl(window.location.href).replace(/(?:%\w{2})+/g, function (str) { return String(setting.destLocation.href.match(str.toLowerCase()) || str); }):
                break;
              case new Date().getTime() > limit:
              case checker.length === checker.filter(function () { return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden'); }).length:
                this.updateRender_();
                break;
              default:
                setTimeout(check, 100);
            }
          };
          check();
        };
        this.model_.isDeferrable ? jQuery.when.apply(jQuery, scriptwaits).always(() => ready()) : ready();
      })
      .trigger(setting.gns + ':rendering');
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
          call && setting.database && this.app_.isScrollPosSavable && setting.fix.scroll && this.app_.data.saveScrollPositionToCacheAndDB(setting.destLocation.href, scrollX, scrollY);
          break;
        case 'popstate':
          call && setting.fix.scroll && setting.database && this.app_.data.loadScrollPositionFromCacheOrDB(setting.destLocation.href);
          break;
      }

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

      var prefilter: string = 'link, style',
          $srcElements: JQuery = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)),
          $dstElements: JQuery = jQuery(prefilter, dstDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)),
          $addElements: JQuery = jQuery(),
          $delElements: JQuery = $dstElements;
      
      for (var i = 0, element: HTMLElement; element = $srcElements[i]; i++) {
        for (var j = 0, isSameElement: boolean; $delElements[j]; j++) {
          switch (element.tagName.toLowerCase()) {
            case 'link':
              isSameElement = (<HTMLLinkElement>element).href === (<HTMLLinkElement>$delElements[j]).href;
              break;
            case 'style':
              isSameElement = (<HTMLStyleElement>element).innerHTML.trim() === (<HTMLStyleElement>$delElements[j]).innerHTML.trim();
              break;
          }
          if (isSameElement) {
            if ($addElements.length) {
              element = $dstElements[$dstElements.index($delElements[j]) - 1];
              element ? jQuery(element).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
              $addElements = jQuery();
            }
            $delElements = $delElements.not($delElements[j]);
            j -= Number(!!j);
            element = null;
            break;
          }
        }
        $addElements = $addElements.add(element);
      }
      jQuery('head', dstDocument).append($addElements.filter(function () { return jQuery.contains(srcDocument.head, this); }).clone());
      jQuery('body', dstDocument).append($addElements.filter(function () { return jQuery.contains(srcDocument.body, this); }).clone());
      $delElements.remove();
      
      if (UTIL.fire(callbacks_update.css.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
    }

    updateScript_(selector: string): JQueryDeferred<any[]>[] {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;
      
      if (!setting.load.script) { return; }
      
      if (UTIL.fire(callbacks_update.script.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
      
      var prefilter: string = 'script',
          $scriptElements: JQuery = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)),
          $execElements: JQuery = jQuery(),
          scriptwaits: JQueryDeferred<any[]>[] = [],
          loadedScripts = this.app_.loadedScripts,
          regType: RegExp = /^$|(?:application|text)\/(?:java|ecma)script/i,
          regRemove: RegExp = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

      for (var i = 0, element: HTMLScriptElement; element = <HTMLScriptElement>$scriptElements[i]; i++) {
        if (element.hasAttribute('src') ? element.src in loadedScripts : !element.innerHTML.trim()) { continue; }

        LOG: {
          var srcLogParent = jQuery(element).parent(setting.load.log)[0];
          if (!srcLogParent || jQuery(element).parents(setting.area).length) { break LOG; }

          var dstLogParent = jQuery(srcLogParent.id || srcLogParent.tagName, dstDocument)[0],
              log = <HTMLScriptElement>element.cloneNode(true);
          this.escapeScript_(log);
          dstLogParent.appendChild(log);
          this.restoreScript_(log);
        };

        if (this.model_.isDeferrable) {
          ((defer: JQueryDeferred<any[]>, element: HTMLScriptElement): void => {
            if (element.hasAttribute('src')) {
              if (!setting.load.reload || !jQuery(element).is(setting.load.reload)) { loadedScripts[element.src] = true; }
              if (element.hasAttribute('async')) {
                jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: true, global: false }))
                .done(() => this.dispatchEvent_(element, 'load', false, true))
                .fail(() => this.dispatchEvent_(element, 'error', false, true));
              } else {
                jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, dataType: 'text', async: true, global: false }))
                .done(() => defer.resolve([element, <string>arguments[0]]))
                .fail(() => defer.resolve([element, new Error()]));
                scriptwaits.push(defer);
              }
            } else {
              if ('object' === typeof element && (!element.type || regType.test(element.type))) {
                defer.resolve([element, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, '')]);
                scriptwaits.push(defer);
              }
            }
          })(jQuery.Deferred(), element);
        } else {
          $execElements = $execElements.add(element);
        }
      }

      try {
        if (this.model_.isDeferrable) {
          jQuery.when.apply(jQuery, scriptwaits)
          .always(() => {
            for (var i = 0, len = arguments.length; i < len; i++) {
              var element: HTMLScriptElement = arguments[i][0],
                  response = arguments[i][1];
              if ('string' === typeof response) {
                eval.call(window, response);
                element.hasAttribute('src') && this.dispatchEvent_(element, 'load', false, true);
              } else {
                element.hasAttribute('src') && this.dispatchEvent_(element, 'error', false, true);
              }
            }
          });
        } else {
          for (var i = 0, element: HTMLScriptElement; element = <HTMLScriptElement>$execElements[i]; i++) {
            if (element.hasAttribute('src')) {
              if (!setting.load.reload || !jQuery(element).is(setting.load.reload)) { loadedScripts[element.src] = true; }
              ((element) => {
                jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: element.hasAttribute('async'), global: false }, {
                  success: () => this.dispatchEvent_(element, 'load', false, true),
                  error: () => this.dispatchEvent_(element, 'error', false, true)
                }));
              })(element);
            } else {
              'object' === typeof element && (!element.hasAttribute('type') || regType.test(element.type)) &&
              eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, ''));
            }
          }
        }
      } catch (err) {
        setTimeout(() => this.model_.fallback(event, setting), 50);
        throw err;
        return;
      }
      
      if (UTIL.fire(callbacks_update.script.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push(('[src][defer]' === selector ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');

      return scriptwaits;
    }

    updateRender_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          checker = jQuery(setting.area).children('.' + setting.nss.class4html + '-check'),
          loadwaits = this.loadwaits_;

      var callbacks_update = setting.callbacks.update;

      var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

      if (UTIL.fire(callbacks_update.render.before, null, [event, setting.param]) === false) { return; }

      checker.remove();
      setTimeout(() => {
        this.app_.isScrollPosSavable = true;
        if ('popstate' !== event.type.toLowerCase()) {
          this.scrollByHash_(setting.destLocation.hash) || this.updateScroll_(true);
        } else {
          this.updateScroll_(true);
        }
      }, 100);

      this.dispatchEvent_(document, setting.gns + ':render', false, true);
      jQuery(document).trigger(setting.gns + '.render');

      var onload = () => {
        this.dispatchEvent_(window, setting.gns + ':load', false, true);
        jQuery(window).trigger(setting.gns + '.load');
        this.updateScript_('[src][defer]');
      }
      if (jQuery.when && loadwaits.length) {
        jQuery.when.apply(jQuery, loadwaits).always(onload);
      } else {
        onload();
      }

      speedcheck && console.log(speed.time);
      speedcheck && console.log(speed.name);

      if (UTIL.fire(callbacks_update.render.after, null, [event, setting.param]) === false) { return; }
    }

    wait_(ms: number): JQueryPromise<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }

    scrollByHash_(hash: string): boolean {
      hash = '#' === hash.charAt(0) ? hash.slice(1) : hash;
      if (!hash) { return false; }

      var $hashTargetElement = jQuery('#' + (hash ? hash : ', [name~=' + hash + ']')).first();
      if ($hashTargetElement.length) {
        isFinite($hashTargetElement.offset().top) &&
        window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
        return true;
      } else {
        return false;
      }
    }
    
    escapeScript_(script: HTMLScriptElement): void {
      jQuery.data(script, 'source', script.src);
      jQuery.data(script, 'code', script.innerHTML);
      script.removeAttribute('src');
      script.innerHTML = '';
    }

    restoreScript_(script: HTMLScriptElement): void {
      if (undefined === jQuery.data(script, 'code')) { return; }

      var backup = script.innerHTML;

      script.innerHTML = ' ';

      if (jQuery.data(script, 'source')) {
        script.src = jQuery.data(script, 'source');
        jQuery.removeData(script, 'source');
      } else {
        script.removeAttribute('src');
      }

      if (jQuery.data(script, 'code')) {
        script.innerHTML = jQuery.data(script, 'code');
        jQuery.removeData(script, 'code');
      } else {
        script.innerHTML = backup;
      }
    }
    
    dispatchEvent_(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, bubbling, cancelable);
      target.dispatchEvent(event);
    }

  }

}
