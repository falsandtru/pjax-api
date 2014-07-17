/// <reference path="app.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M, APP, DATA

  // Deny access
  var V: void, C: void;

  export class ModelAppUpdate implements ModelAppUpdateInterface {

    constructor(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface) {
      var speedcheck = setting.speedcheck, speed = APP.stock('speed');
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

      var that = this;

      if (UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) { return; }

      setting.scroll.record = false;
      setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

      var activeXHR = M.getActiveXHR();
      event = jQuery.extend(true, {}, event);
      function done(xhrArgs) {
        UTIL.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(xhrArgs));
      }
      function fail(xhrArgs) {
        UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));
      }
      function always(xhrArgs) {
        UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));

        M.setActiveXHR(null);
        var data: string, textStatus: string, XMLHttpRequest: JQueryXHR;
        if (2 < xhrArgs.length) {
          data = xhrArgs[0];
          textStatus = xhrArgs[1];
          XMLHttpRequest = xhrArgs[2];

          that.update_(setting, event, register, data, textStatus, XMLHttpRequest, null);
        } else if (setting.fallback && 'abort' !== xhrArgs.statusText) {
          XMLHttpRequest = xhrArgs;

          M.fallback(event, setting);
        }
      }

      if (cache && cache.XMLHttpRequest) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        M.setActiveXHR(null);
        if (M.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve(cache), that.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done((cache) => that.update_(setting, event, register, cache.data, cache.textStatus, cache.XMLHttpRequest, cache)) && undefined
        } else {
          that.update_(setting, event, register, cache.data, cache.textStatus, cache.XMLHttpRequest, cache);
        }
      } else if (activeXHR && activeXHR.follow && 'abort' !== activeXHR.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, activeXHR.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        var wait = setting.wait && isFinite(activeXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + activeXHR.timeStamp, 0) : 0;
        jQuery.when(activeXHR, that.wait_(wait))
        .done(done).fail(fail).always(always);

      } else {
        // default
        var ajax: JQueryAjaxSettings = {},
            callbacks = {};

        ajax.url = !setting.server.query ? setting.destLocation.href
                                         : [
                                             setting.destLocation.protocol,
                                             '//',
                                             setting.destLocation.host,
                                             '/' === setting.destLocation.pathname.charAt(0) ? setting.destLocation.pathname : '/' + setting.destLocation.pathname,
                                             (1 < setting.destLocation.search.length ? setting.destLocation.search + '&' : '?') + setting.server.query,
                                             setting.destLocation.hash
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

        var _data: string, _errorThrown: string;
        callbacks = {
          xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
            var XMLHttpRequest: XMLHttpRequest;
            XMLHttpRequest = UTIL.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
            XMLHttpRequest = 'object' === typeof XMLHttpRequest && XMLHttpRequest || jQuery.ajaxSettings.xhr();

            //if (XMLHttpRequest instanceof Object && XMLHttpRequest instanceof window.XMLHttpRequest && 'onprogress' in XMLHttpRequest) {
            //  XMLHttpRequest.addEventListener('progress', function(event) {dataSize = event.loaded;}, false);
            //}
            return XMLHttpRequest;
          },
          beforeSend: !setting.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function (XMLHttpRequest: JQueryXHR, ajaxSetting: JQueryAjaxSettings) {
            if (setting.server.header) {
              XMLHttpRequest.setRequestHeader(setting.nss.requestHeader, 'true');
            }
            if ('object' === typeof setting.server.header) {
              XMLHttpRequest.setRequestHeader(setting.nss.requestHeader, 'true');
              setting.server.header.area && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-Area', setting.area[0]);
              setting.server.header.head && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
              setting.server.header.css && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
              setting.server.header.script && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
            }

            UTIL.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, XMLHttpRequest, ajaxSetting]);
          },
          dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data: string, type: Object) {
            return UTIL.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
          },
          success: function (data: string, textStatus: string, XMLHttpRequest: JQueryXHR) {
            _data = data;
            UTIL.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, XMLHttpRequest]);
          },
          error: function (XMLHttpRequest: JQueryXHR, textStatus: string, errorThrown: string) {
            _errorThrown = errorThrown;
            UTIL.fire(setting.callbacks.ajax.error, this, [event, setting.param, XMLHttpRequest, textStatus, errorThrown]);
          },
          complete: function (XMLHttpRequest: JQueryXHR, textStatus: string) {
            var data: string = _data, errorThrown: string = _errorThrown;
            UTIL.fire(setting.callbacks.ajax.complete, this, [event, setting.param, XMLHttpRequest, textStatus]);

            M.setActiveXHR(null);
            if (!errorThrown) {
              if (!M.isDeferrable) {
                that.update_(setting, event, register, data, textStatus, XMLHttpRequest, null);
              }
            } else if (setting.fallback && 'abort' !== textStatus) {
              M.fallback(event, setting);
            }
          }
        };

        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

        jQuery(document).trigger(setting.gns + '.request');
        
        activeXHR = M.setActiveXHR(jQuery.ajax(ajax));
        if (M.isDeferrable) {
          jQuery.when(activeXHR, that.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done(done).fail(fail).always(always);
        }
      }

      if (UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) { return; }
    }

    update_(setting: SettingInterface, event: JQueryEventObject, register: boolean, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest, cache: CacheInterface): void {
      UPDATE: {
        var speedcheck = setting.speedcheck, speed = APP.stock('speed');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

        M.setActiveSetting(setting);

        var that = this;
        var callbacks_update = setting.callbacks.update;

        if (UTIL.fire(callbacks_update.before, null, [event, setting.param, data, textStatus, XMLHttpRequest, cache]) === false) { break UPDATE; }

        if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
          return M.fallback(event, setting);
        }

        /* variable initialization */

        try {
          APP.landing = null;
          if (!cache && !~(XMLHttpRequest.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }

          /* cache */
          cache = this.updateCache_(setting, cache, textStatus, XMLHttpRequest);

          /* variable define */
          DEFINE : {
            var srcDocument: Document = APP.createHTMLDocument_(XMLHttpRequest.responseText),
                dstDocument: Document = document,
                cacheDocument: Document;
            var checker: JQuery,
                loadwaits: JQueryDeferred<any>[] = [];

            var title: string = jQuery('title', srcDocument).text();

            setting.area = APP.chooseAreas(setting.area, srcDocument, dstDocument);
            setting.area = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
            if (!setting.area) { throw new Error('throw: area notfound'); }
            
            if (cache && cache.data) {
              cacheDocument = APP.createHTMLDocument_(cache.data);
              title = jQuery('title', cacheDocument).text();
              var i: number = -1, $srcAreas: JQuery, $dstAreas: JQuery
              while (setting.area[++i]) {
                $srcAreas = jQuery(setting.area[i], srcDocument).clone();
                $dstAreas = jQuery(setting.area[i], cacheDocument);
                var j: number = -1;
                while ($srcAreas[++j]) {
                  $dstAreas.eq(j).replaceWith($srcAreas.eq(j));
                }
              }
            }
          }; // label: DEFINE
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

          /* escape */
          jQuery('noscript', srcDocument).children().parent().each(function () { this.children.length && jQuery(this).text(this.innerHTML); });

          /* redirect */
          this.updateRedirect_(setting, register, title, srcDocument, data, textStatus, XMLHttpRequest);

          jQuery(window).trigger(setting.gns + '.unload');
          
          /* url */
          this.updateUrl_(setting, register, title, dstDocument, data, textStatus, XMLHttpRequest);

          setting.origLocation.href = setting.destLocation.href;
          
          /* title */
          this.updateTitle_(setting, title, dstDocument, data, textStatus, XMLHttpRequest);

          setting.database && DATA.updateCurrentPage();

          /* head */
          this.updateHead_(setting, srcDocument, dstDocument, data, textStatus, XMLHttpRequest);
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

          /* content */
          loadwaits = this.updateContent_(setting, srcDocument, dstDocument, data, textStatus, XMLHttpRequest);
          checker = jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check');
          
          /* check point */
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

          /* escape */
          jQuery('noscript', srcDocument).remove();

          /* verify */
          this.updateVerify_(setting, event);

          /* load */
          this.updateCSS_('link[rel~="stylesheet"], style', setting, cache, srcDocument, dstDocument, data, textStatus, XMLHttpRequest);
          jQuery(window)
          .one(setting.gns + '.rendering', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            this.updateScroll_(setting, false);
            jQuery(dstDocument).trigger(setting.gns + '.ready');
            this.updateScript_(':not([defer]), :not([src])', setting, cache, srcDocument, dstDocument, data, textStatus, XMLHttpRequest);
            if (setting.load.sync) {
              var callback = () => this.updateScript_('[src][defer]', setting, cache, srcDocument, dstDocument, data, textStatus, XMLHttpRequest);
              this.updateRender_(callback, setting, checker, loadwaits);
            } else {
              this.updateRender_(null, setting, checker, loadwaits);
              this.updateScript_('[src][defer]', setting, cache, srcDocument, dstDocument, data, textStatus, XMLHttpRequest);
            }
          })
          .trigger(setting.gns + '.rendering');
          
          if (UTIL.fire(callbacks_update.success, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
          if (UTIL.fire(callbacks_update.complete, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
          if (UTIL.fire(setting.callback, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
        } catch (err) {
          /* cache delete */
          cache && jQuery[M.NAME].removeCache(setting.destLocation.href);

          if (UTIL.fire(callbacks_update.error, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
          if (UTIL.fire(callbacks_update.complete, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
          M.fallback(event, setting);
        };

        if (UTIL.fire(callbacks_update.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
      }; // label: UPDATE
    }

    updateCache_(setting: SettingInterface, cache: CacheInterface, textStatus: string, XMLHttpRequest: XMLHttpRequest): CacheInterface {
      var callbacks_update = setting.callbacks.update;

      if (cache && cache.XMLHttpRequest || !setting.cache.click && !setting.cache.submit && !setting.cache.popstate) { return cache; }
      if ('submit' === event.type.toLowerCase() && !setting.cache[(<HTMLFormElement>event.currentTarget).method.toLowerCase()]) { return cache; }

      if (UTIL.fire(callbacks_update.cache.before, null, [event, setting.param, cache]) === false) { return cache; }

      jQuery[M.NAME].setCache(setting.destLocation.href, cache && cache.data || null, textStatus, XMLHttpRequest);
      cache = jQuery[M.NAME].getCache(setting.destLocation.href);

      if (UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) { return cache; }

      return cache;
    }

    updateRedirect_(setting: SettingInterface, register: boolean, title: string, srcDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void {
      var callbacks_update = setting.callbacks.update;

      var redirect = <HTMLAnchorElement>jQuery('head meta[http-equiv="Refresh"][content*="URL="]', srcDocument)[0];
      if (!redirect) { return; }

      if (UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; };

      redirect = <HTMLAnchorElement>jQuery('<a>', { href: jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i) })[0];
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
              window.history.replaceState(window.history.state, title, redirect.href);
              if (register && setting.fix.location) {
                jQuery[M.NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[M.NAME].enable();
              }
              return void jQuery(window).trigger('popstate');
          }
      }

      if (UTIL.fire(callbacks_update.redirect.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }
    }

    updateUrl_(setting: SettingInterface, register: boolean, title: string, dstDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void {
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.url.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; };

      register &&
      window.history.pushState(
        UTIL.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]),
        window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? title : dstDocument.title,
        setting.destLocation.href);

      if (register && setting.fix.location) {
        jQuery[M.NAME].disable();
        window.history.back();
        window.history.forward();
        jQuery[M.NAME].enable();
      }

      if (UTIL.fire(callbacks_update.url.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }
    }

    updateTitle_(setting: SettingInterface, title: string, dstDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void {
      var callbacks_update = setting.callbacks.update;

      if (UTIL.fire(callbacks_update.title.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }
      dstDocument.title = title;
      setting.database && setting.fix.history && APP.saveTitleToDB(setting.destLocation.href, title);
      if (UTIL.fire(callbacks_update.title.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }
    }

    updateHead_(setting: SettingInterface, srcDocument: Document, dstDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void {
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.head) { return; }

      if (UTIL.fire(callbacks_update.head.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }

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

      if (UTIL.fire(callbacks_update.head.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }
    }

    updateContent_(setting: SettingInterface, srcDocument: Document, dstDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): JQueryDeferred<any>[] {
      var callbacks_update = setting.callbacks.update;
      var checker: JQuery = jQuery(),
          loadwaits: JQueryDeferred<any>[] = [];

      if (UTIL.fire(callbacks_update.content.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return loadwaits; }

      jQuery(setting.area).children('.' + setting.nss.class4html + '-check').remove();
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

      if (UTIL.fire(callbacks_update.content.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return loadwaits; }

      return loadwaits;
    }

    updateScroll_(setting: SettingInterface, call: boolean): void {
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
          call && setting.database && setting.fix.scroll && APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, scrollX, scrollY);
          break;
        case 'popstate':
          call && setting.fix.scroll && setting.database && setting.scroll.record && APP.loadScrollPositionByCacheOrDB(setting.destLocation.href);
          break;
      }

      if (UTIL.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) { return; }
    }

    updateCSS_(selector: string, setting: SettingInterface, cache: CacheInterface, srcDocument: Document, dstDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void {
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.css) { return; }

      if (UTIL.fire(callbacks_update.css.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }

      var css: JQuery, save, adds = [], removes = jQuery(selector).not(jQuery(setting.area).find(selector));
      cache = jQuery[M.NAME].getCache(setting.destLocation.href);
      save = cache && !cache.css;
      css = cache && cache.css ? jQuery(cache.css) : jQuery(selector, srcDocument).not(jQuery(setting.area, srcDocument).find(selector));
      css = css.not(setting.load.ignore);

      if (cache && cache.css && css && css.length !== cache.css.length) { save = true; }
      if (save) { cache.css = []; }

      for (var i = 0, element; element = css[i]; i++) {
        element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);
        element = 'function' === typeof setting.load.rewrite ? UTIL.fire(setting.load.rewrite, null, [element]) || element : element;
        if (save) { cache.css[i] = element; }

        for (var j = 0; removes[j]; j++) {
          if (UTIL.trim((<HTMLLinkElement>removes[j]).href || (<HTMLStyleElement>removes[j]).innerHTML || '') === UTIL.trim(element.href || element.innerHTML || '')) {
            if (adds.length) {
              element = removes.eq(j).prevAll(selector).first();
              element[0] ? element.after(adds) : removes.eq(j).before(adds);
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
      removes[0] ? removes.last().after(adds) : jQuery('head').append(adds);
      removes.not(setting.load.ignore).remove();

      if (UTIL.fire(callbacks_update.css.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = APP.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
    }

    updateScript_(selector: string, setting: SettingInterface, cache: CacheInterface, srcDocument: Document, dstDocument: Document, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): void {
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.script) { return; }

      if (UTIL.fire(callbacks_update.script.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }

      var script: JQuery, save, execs = [];
      cache = jQuery[M.NAME].getCache(setting.destLocation.href);
      save = cache && !cache.script;
      script = cache && cache.script ? jQuery(cache.script) : jQuery('script', srcDocument);
      script = script.not(setting.load.ignore);

      if (cache && cache.script && script && script.length !== cache.script.length) { save = true; }
      if (save) { cache.script = []; }

      var executed: { [index: string]: boolean; } = APP.stock('executed');
      for (var i = 0, element; element = script[i]; i++) {
        //element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);
        element = 'function' === typeof setting.load.rewrite ? UTIL.fire(setting.load.rewrite, null, [element]) || element : element;
        if (save) { cache.script[i] = element; }

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

      if (UTIL.fire(callbacks_update.script.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = APP.stock('speed');
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push(('[src][defer]' === selector ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');
    }

    updateRender_(callback: () => void, setting: SettingInterface, checker: JQuery, loadwaits: JQueryDeferred<any>[]): void {
      var callbacks_update = setting.callbacks.update;

      var rendered = (callback) => {
        var speedcheck = setting.speedcheck, speed = APP.stock('speed');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

        checker.remove();
        setting.scroll.record = true;
        if ('popstate' !== event.type.toLowerCase()) {
          APP.scrollByHash(setting.destLocation.hash) || this.updateScroll_(setting, true);
          setTimeout(function () { APP.scrollByHash(setting.destLocation.hash); }, 50);
        } else {
          this.updateScroll_(setting, true);
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

    updateVerify_(setting: SettingInterface, event: JQueryEventObject): void {
      var callbacks_update = setting.callbacks.update;

      UTIL.fire(callbacks_update.verify.before, null, [event, setting.param]);

      if (setting.destLocation.href === UTIL.canonicalizeUrl(window.location.href)) {
        setting.retry = true;
        new APP.stock(setting.uuid);
      } else if (setting.retry) {
        setting.retry = false;
        setting.destLocation.href = UTIL.canonicalizeUrl(window.location.href);
        new ModelAppUpdate(setting, event, false, setting.cache[event.type.toLowerCase()] && jQuery[M.NAME].getCache(setting.destLocation.href));
      } else {
        throw new Error('throw: location mismatch');
      }

      UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]);
    }

    wait_(ms: number): JQueryPromise<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }

  }
}
