/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M, APP, DATA

  // Deny access
  var V: void, C: void;

  export class ModelApp extends ModelTemplate implements ModelAppInterface {

    landing: string = UTIL.canonicalizeUrl(window.location.href)
    recent: RecentInterface = { order: [], data: {}, size: 0 }
    activeXHR: JQueryXHR
    activeSetting: CommonSettingInterface

    configure(option: any, origURL: string, destURL: string, isBidirectional: boolean = false): SettingInterface {
      origURL = UTIL.canonicalizeUrl(origURL || option.origLocation.href);
      destURL = UTIL.canonicalizeUrl(destURL || option.destLocation.href);
      option = option.option || option;

      var scope = option.scope ? jQuery.extend(true, {}, option, APP.scope_(option, origURL, destURL) || isBidirectional && APP.scope_(option, destURL, origURL) || { disable: true })
                               : jQuery.extend(true, {}, option);

      var initial = {
            gns: M.NAME,
            ns: '',
            disable: false,
            
            area: 'body',
            link: 'a:not([target])',
            filter: function(){return /(\/[^.]*|\.html?|\.php)$/.test('/' + this.pathname);},
            form: null,
            scope: null,
            state: null,
            scrollTop: 0,
            scrollLeft: 0,
            ajax: { dataType: 'text' },
            contentType: 'text/html',
            cache: {
              click: false, submit: false, popstate: false, get: true, post: true, mix: false,
              page: 100 /* pages */, size: 1 * 1024 * 1024 /* 1MB */, expires: { max: null, min: 5 * 60 * 1000 /* 5min */}
            },
            callback: null,
            callbacks: {
              ajax: {},
              update: { redirect: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, cache: {}, render: {}, verify: {} }
            },
            param: null,
            load: {
              head: '', css: false, script: false, execute: true,
              reload: '',
              ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
              sync: true, ajax: { dataType: 'script', cache: true }, rewrite: null
            },
            redirect: true,
            interval: 100,
            wait: 0,
            scroll: { delay: 300 },
            fix: { location: true, history: true, scroll: true, reset: false },
            fallback: true,
            database: true,
            speedcheck: false,
            server: {
              query: 'pjax=1',
              header: true
            }
          },
          force = {
            origLocation: (function (url, a) { a.href = url; return a; })(origURL, document.createElement('a')),
            destLocation: (function (url, a) { a.href = url; return a; })(destURL, document.createElement('a')),
            scroll: { record: true, queue: [] },
            retry: true,
            option: option
          },
          compute = function () {
            var nsArray: string[] = [setting.gns || M.NAME].concat(setting.ns && String(setting.ns).split('.') || []);
            var query: string = setting.server.query;
            switch (query && typeof query) {
              case 'string':
                query = eval('({' + query.replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]+)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
              case 'object':
                query = jQuery.param(query);
                break;
            }
            return {
              nss: {
                name: setting.ns || '',
                array: nsArray,
                event: nsArray.join('.'),
                data: nsArray.join('-'),
                class4html: nsArray.join('-'),
                click: ['click'].concat(nsArray.join(':')).join('.'),
                submit: ['submit'].concat(nsArray.join(':')).join('.'),
                popstate: ['popstate'].concat(nsArray.join(':')).join('.'),
                scroll: ['scroll'].concat(nsArray.join(':')).join('.'),
                requestHeader: ['X', nsArray[0].replace(/^\w/, function ($0) { return $0.toUpperCase(); })].join('-')
              },
              fix: !/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent) ? { location: false, reset: false } : {},
              contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
              server: {
                query: query
              },
              timeStamp: new Date().getTime()
            };
          };

      var setting: SettingInterface;
      setting = jQuery.extend(true, initial, scope, force);
      setting = jQuery.extend(true, setting, compute());

      return new APP.stock(setting);
    }

    registrate($context: ContextInterface, setting: SettingInterface): void {
      var executed: { [index: string]: boolean; } = APP.stock('executed');
      setting.load.script && jQuery('script').each(function () {
        var element = this;
        element = 'function' === typeof setting.load.rewrite ? UTIL.fire(setting.load.rewrite, null, [element.cloneNode(true)]) || element : element;
        if (element.src in executed) { return; }
        if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) { executed[element.src] = true; }
      });

      DATA.openDB(setting);
      new View($context).BIND(setting);
      setTimeout(() => APP.createHTMLDocument_(), 50);
      setTimeout(() => APP.landing = null, 1500);
    }

    drive(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface): void {
      var speedcheck = setting.speedcheck, speed = APP.stock('speed');
      speedcheck && (speed.fire = event.timeStamp);
      speedcheck && speed.time.splice(0, 100, 0);
      speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

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

          APP.update_(setting, event, register, data, textStatus, XMLHttpRequest, null);
        } else if (setting.fallback && 'abort' !== xhrArgs.statusText) {
          XMLHttpRequest = xhrArgs;

          'function' === typeof setting.fallback ? UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])
                                                 : APP.fallback_(event);
        }
      }

      if (cache && cache.XMLHttpRequest) {
        // cache
        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
        M.setActiveXHR(null);
        if (M.isDeferrable) {
          jQuery.when(jQuery.Deferred().resolve(cache), APP.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
          .done((cache) => APP.update_(setting, event, register, cache.data, cache.textStatus, cache.XMLHttpRequest, cache)) && undefined
        } else {
          APP.update_(setting, event, register, cache.data, cache.textStatus, cache.XMLHttpRequest, cache);
        }
      } else if (activeXHR && activeXHR.follow && 'abort' !== activeXHR.statusText) {
        // preload
        speedcheck && speed.time.splice(0, 1, activeXHR.timeStamp - speed.fire);
        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
        var wait = setting.wait && isFinite(activeXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + activeXHR.timeStamp, 0) : 0;
        jQuery.when(activeXHR, APP.wait_(wait))
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
                APP.update_(setting, event, register, data, textStatus, XMLHttpRequest, null);
              }
            } else if (setting.fallback && 'abort' !== textStatus) {
              'function' === typeof setting.fallback ? UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])
                                                     : APP.fallback_(event);
            }
          }
        };

        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

        speedcheck && speed.time.push(speed.now() - speed.fire);
        speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

        jQuery(document).trigger(setting.gns + '.request');
        
        activeXHR = M.setActiveXHR(jQuery.ajax(ajax));
        if (M.isDeferrable) {
          jQuery.when(activeXHR, APP.wait_(UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href])))
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

        var callbacks_update = setting.callbacks.update;

        if (UTIL.fire(callbacks_update.before, null, [event, setting.param, data, textStatus, XMLHttpRequest, cache]) === false) { break UPDATE; }

        if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
          return 'function' === typeof setting.fallback ? UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : APP.fallback_(event);
        }

        /* variable initialization */

        try {
          APP.landing = null;
          if (!cache && !~(XMLHttpRequest.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }

          /* cache */
          UPDATE_CACHE: {
            if (cache && cache.XMLHttpRequest || !setting.cache.click && !setting.cache.submit && !setting.cache.popstate) { break UPDATE_CACHE; }
            if ('submit' === event.type.toLowerCase() && !setting.cache[(<HTMLFormElement>event.currentTarget).method.toLowerCase()]) { break UPDATE_CACHE; }
            if (UTIL.fire(callbacks_update.cache.before, null, [event, setting.param, cache]) === false) { break UPDATE_CACHE; }

            jQuery[M.NAME].setCache(setting.destLocation.href, cache && cache.data || null, textStatus, XMLHttpRequest);
            cache = jQuery[M.NAME].getCache(setting.destLocation.href);

            if (UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) { break UPDATE_CACHE; }
          }; // label: UPDATE_CACHE

          /* variable initialization */
          var srcDocument: Document = APP.createHTMLDocument_(XMLHttpRequest.responseText),
              dstDocument: Document = document,
              cacheDocument: Document,
              checker: JQuery,
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

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

          /* escape */
          jQuery('noscript', srcDocument).children().parent().each(function () { this.children.length && jQuery(this).text(this.innerHTML); });

          /* redirect */
          UPDATE_REDIRECT: {
            var redirect = <HTMLAnchorElement>jQuery('head meta[http-equiv="Refresh"][content*="URL="]', srcDocument)[0];
            if (!redirect) { break UPDATE_REDIRECT; }
            if (UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_REDIRECT; };

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

            if (UTIL.fire(callbacks_update.redirect.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_REDIRECT; }
          }; // label: UPDATE_REDIRECT

          jQuery(window).trigger(setting.gns + '.unload');
          
          /* url */
          UPDATE_URL: {
            if (UTIL.fire(callbacks_update.url.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_URL; };

            register &&
            window.history.pushState(
              UTIL.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]),
              window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? title : dstDocument.title,
              setting.destLocation.href);

            setting.origLocation.href = setting.destLocation.href;
            if (register && setting.fix.location) {
              jQuery[M.NAME].disable();
              window.history.back();
              window.history.forward();
              jQuery[M.NAME].enable();
            }

            if (UTIL.fire(callbacks_update.url.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_URL; }
          }; // label: UPDATE_URL

          /* title */
          UPDATE_TITLE: {
            if (UTIL.fire(callbacks_update.title.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_TITLE; }
            dstDocument.title = title;
            setting.database && setting.fix.history && APP.saveTitleToDB(setting.destLocation.href, title);
            if (UTIL.fire(callbacks_update.title.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_TITLE; }
          }; // label: UPDATE_TITLE

          setting.database && DATA.updateCurrentPage();

          /* head */
          var load_head = function(): void {
            UPDATE_HEAD: {
              if (!setting.load.head) { break UPDATE_HEAD; }
              if (UTIL.fire(callbacks_update.head.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_HEAD; }

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
              
              if (UTIL.fire(callbacks_update.head.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_HEAD; }
            }; // label: UPDATE_HEAD
          }
          load_head();

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

          /* content */
          UPDATE_CONTENT: {
            if (UTIL.fire(callbacks_update.content.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_CONTENT; }
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
              loadwaits = setting.load.sync && jQuery.when && loadwaits.concat($srcAreas.find('img, iframe, frame').map(function() {
                var defer = jQuery.Deferred();
                jQuery(this).one('load error', defer.resolve);
                return defer;
              }).get()) || loadwaits;
              var j: number = -1;
              while ($srcAreas[++j]) {
                $dstAreas.eq(j).replaceWith($srcAreas.eq(j)).append(checker.clone());
              }
            }
            checker = jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check');
            jQuery(dstDocument).trigger(setting.gns + '.DOMContentLoaded');
            if (UTIL.fire(callbacks_update.content.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_CONTENT; }
          }; // label: UPDATE_CONTENT

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

          /* scroll */
          var scroll = function(call) {
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
          } // function: scroll

          /* rendering */
          var rendering = function(callback?: () => void) {
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
          } // function: rendering
          var rendered = function(callback) {
            speedcheck && speed.time.push(speed.now() - speed.fire);
            speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

            checker.remove();
            setting.scroll.record = true;
            if ('popstate' !== event.type.toLowerCase()) {
              APP.scrollByHash_(setting.destLocation.hash) || scroll(true);
              setTimeout(function () { APP.scrollByHash_(setting.destLocation.hash); }, 50);
            } else {
              scroll(true);
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

          /* escape */
          jQuery('noscript', srcDocument).remove();

          /* css */
          var load_css = function(selector: string): void {
            UPDATE_CSS: {
              if (!setting.load.css) { break UPDATE_CSS; }
              if (UTIL.fire(callbacks_update.css.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_CSS; }

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

              if (UTIL.fire(callbacks_update.css.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_CSS; }
              speedcheck && speed.time.push(speed.now() - speed.fire);
              speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
            }; // label: UPDATE_CSS
          } // function: css

          /* script */
          var load_script = function(selector: string): void {
            UPDATE_SCRIPT: {
              if (!setting.load.script) { break UPDATE_SCRIPT; }
              if (UTIL.fire(callbacks_update.script.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_SCRIPT; }

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

              if (UTIL.fire(callbacks_update.script.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE_SCRIPT; }
              speedcheck && speed.time.push(speed.now() - speed.fire);
              speedcheck && speed.name.push(('[src][defer]' === selector ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');
            }; // label: UPDATE_SCRIPT
          } // function: script

          /* verify */
          UPDATE_VERIFY: {
            UTIL.fire(callbacks_update.verify.before, null, [event, setting.param]);
            if (setting.destLocation.href === UTIL.canonicalizeUrl(window.location.href)) {
              setting.retry = true;
              new APP.stock(setting.uuid);
            } else if (setting.retry) {
              setting.retry = false;
              setting.destLocation.href = UTIL.canonicalizeUrl(window.location.href);
              APP.drive(setting, event, false, setting.cache[event.type.toLowerCase()] && jQuery[M.NAME].getCache(setting.destLocation.href));
            } else {
              throw new Error('throw: location mismatch');
            }
            UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]);
          }; // label: UPDATE_VERIFY

          /* load */
          load_css('link[rel~="stylesheet"], style');
          jQuery(window)
          .one(setting.gns + '.rendering', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            scroll(false);
            jQuery(dstDocument).trigger(setting.gns + '.ready');
            load_script(':not([defer]), :not([src])');
            if (setting.load.sync) {
              rendering(() => load_script('[src][defer]'));
            } else {
              rendering();
              load_script('[src][defer]');
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
          if (setting.fallback) { return 'function' === typeof setting.fallback ? UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : APP.fallback_(event); }
        };

        if (UTIL.fire(callbacks_update.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) { break UPDATE; }
      }; // label: UPDATE
    }

    chooseAreas(areas: string[], srcDocument: Document, dstDocument: Document): string {
      var i: number = -1, area: string;
      AREA: while (area = areas[++i]) {
        var options: string[] = area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
        var j: number = -1;
        while (options[++j]) {
          if (!jQuery(options[j], srcDocument)[0] || !jQuery(options[j], dstDocument)[0]) {
            continue AREA;
          }
        }
        return area;
      }
    }

    scope_(common: CommonSettingInterface, origURL: string, destURL: string, rewriteKeyUrl: string = ''): any {
      var origKeyUrl: string,
          destKeyUrl: string,
          scp: any = common.scope,
          dirs: string[],
          keys: string[],
          key: string,
          pattern: any,
          not: boolean,
          reg: boolean,
          rewrite: any,
          inherit: boolean,
          hit_src: boolean,
          hit_dst: boolean,
          option: Object;

      origKeyUrl = M.convertUrlToUrlKey(origURL).match(/.+?\w(\/.*)/).pop();
      destKeyUrl = M.convertUrlToUrlKey(destURL).match(/.+?\w(\/.*)/).pop();
      rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');

      keys = (rewriteKeyUrl || destKeyUrl).replace(/^\/|\/$/g, '').split('/');
      if (rewriteKeyUrl) {
        if (!~rewriteKeyUrl.indexOf('*')) { return undefined; }
        dirs = [];
        var arr: string[] = origKeyUrl.replace(/^\/|\/$/g, '').split('/');
        for (var i = 0, len = keys.length; i < len; i++) { '*' === keys[i] && dirs.push(arr[i]); }
      }

      for (var i = keys.length + 1; i--;) {
        rewrite = inherit = option = hit_src = hit_dst = undefined;
        key = keys.slice(0, i).join('/');
        key = '/' + key + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(key.length + 1) ? '/' : '');

        if (!key || !(key in scp)) { continue; }

        if ('string' === typeof scp[key]) {
          scp[key] = scp[scp[key]];
        }
        if (!scp[key] || !scp[key].length) { return false; }

        for (var j = 0; pattern = scp[key][j]; j++) {
          if (hit_src === false || hit_dst === false) {
            break;
          } else if ('rewrite' === pattern && 'function' === typeof scp.rewrite && !rewriteKeyUrl) {
            rewrite = this.scope_.apply(this, [].slice.call(arguments).slice(0, 3).concat([UTIL.fire(scp.rewrite, null, [destKeyUrl])]));
            if (rewrite) {
              hit_src = hit_dst = true;
              break;
            } else if (false === rewrite) {
              return false;
            }
          } else if ('inherit' === pattern) {
            inherit = true;
          } else if ('string' === typeof pattern) {
            not = '!' === pattern.charAt(0);
            pattern = not ? pattern.slice(1) : pattern;
            reg = '*' === pattern.charAt(0);
            pattern = reg ? pattern.slice(1) : pattern;

            if (rewriteKeyUrl && ~pattern.indexOf('/*/')) {
              for (var k = 0, len = dirs.length; k < len; k++) { pattern = pattern.replace('/*/', '/' + dirs[k] + '/'); }
            }

            if ((not || !hit_src) && (reg ? !origKeyUrl.search(pattern) : !origKeyUrl.indexOf(pattern))) {
              if (not) { return false; } else { hit_src = true; }
            }
            if ((not || !hit_dst) && (reg ? !destKeyUrl.search(pattern) : !destKeyUrl.indexOf(pattern))) {
              if (not) { return false; } else { hit_dst = true; }
            }
          } else if ('object' === typeof pattern) {
            option = pattern;
          }
        }

        if (hit_src && hit_dst) {
          return jQuery.extend(true, {}, common, ('object' === typeof rewrite ? rewrite : option) || {});
        }
        if (inherit) { continue; }
        break;
      }
    }

    scrollByHash_(hash: string): boolean {
      hash = '#' === hash.charAt(0) ? hash.slice(1) : hash;
      if (!hash) { return false; }

      var $hashTargetElement = jQuery('#' + (hash ? hash : ', [name~=' + hash + ']')).first();
      if ($hashTargetElement[0]) {
        isFinite($hashTargetElement.offset().top) &&
        window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
        return true;
      } else {
        return false;
      }
    }

    wait_(ms: number): JQueryPromise<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }

    fallback_(event: JQueryEventObject): void {
      switch (event.type.toLowerCase()) {
        case 'click':
          window.location.assign((<HTMLAnchorElement>event.currentTarget).href);
          break;
        case 'submit':
          (<HTMLFormElement>event.currentTarget).submit();
          break;
        case 'popstate':
          window.location.reload();
          break;
      }
    }

    createHTMLDocument_(html: string = ''): Document {
      // chrome, firefox
      this.createHTMLDocument_ = function (html: string = '') {
        return window.DOMParser && window.DOMParser.prototype && new window.DOMParser().parseFromString(html, 'text/html');
      };
      if (test(this.createHTMLDocument_)) { return this.createHTMLDocument_(html); }

      // ie10+, opera
      this.createHTMLDocument_ = function (html: string = '') {
        if (document.implementation && document.implementation.createHTMLDocument) {
          var doc = document.implementation.createHTMLDocument('');
          var root = document.createElement('html');
          var attrs = (<string>(html.match(/<html([^>]+)>/im) || [0, ''])[1]).match(/[\w\-]+\="[^"]*.|[\w\-]+\='[^']*.|\w+/gm) || [];
          for (var i = 0, attr; attr = attrs[i]; i++) {
            attr = attr.split('=', 2);
            doc.documentElement.setAttribute(attr[0], attr[1].slice(1, -1));
          }
          root.innerHTML = html.slice(0, html.search(/<\/html>/i)).replace(/^.*?<html[^>]*>/i, '');
          doc.documentElement.removeChild(doc.head);
          doc.documentElement.removeChild(doc.body);
          var element;
          while (element = root.childNodes[0]) {
            doc.documentElement.appendChild(element);
          }
        }
        return doc;
      };
      if (test(this.createHTMLDocument_)) { return this.createHTMLDocument_(html); }

      // msafari
      this.createHTMLDocument_ = function (html: string = '') {
        if (document.implementation && document.implementation.createHTMLDocument) {
          var doc = document.implementation.createHTMLDocument('');
          if ('object' === typeof doc.activeElement) {
            doc.open();
            doc.write(html);
            doc.close();
          }
        }
        return doc;
      };
      if (test(this.createHTMLDocument_)) { return this.createHTMLDocument_(html); }

      function test(createHTMLDocument_) {
        try {
          var doc = createHTMLDocument_ && createHTMLDocument_('<html lang="en" class="html"><head><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript></body></html>');
          return doc && jQuery('html', doc).is('.html[lang=en]') && jQuery('head>noscript', doc).html() && jQuery('body>noscript', doc).text() === 'noscript';
        } catch (err) { }
      }

    }

    loadTitleByDB(unsafe_url: string): void {
      var keyUrl = UTIL.canonicalizeUrl(M.convertUrlToUrlKey(unsafe_url));
      DATA.loadTitle(keyUrl);
    }

    saveTitleToDB(unsafe_url: string, title: string): void {
      var keyUrl = UTIL.canonicalizeUrl(M.convertUrlToUrlKey(unsafe_url));
      DATA.saveTitle(keyUrl, title);
    }

    loadScrollPositionByCacheOrDB(unsafe_url: string): void {
      var keyUrl = UTIL.canonicalizeUrl(M.convertUrlToUrlKey(unsafe_url));
      var cache: CacheInterface = jQuery[M.NAME].getCache(keyUrl);
      if (cache && 'number' === typeof cache.scrollX) {
        window.scrollTo(parseInt(Number(cache.scrollX) + '', 10), parseInt(Number(cache.scrollY) + '', 10));
      } else {
        DATA.loadScrollPosition(keyUrl);
      }
    }

    saveScrollPositionToCacheAndDB(unsafe_url: string, scrollX: number, scrollY: number): void {
      var keyUrl = UTIL.canonicalizeUrl(M.convertUrlToUrlKey(unsafe_url));
      jQuery.extend(jQuery[M.NAME].getCache(keyUrl), { scrollX: scrollX, scrollY: scrollY });
      DATA.saveScrollPosition(keyUrl, scrollX, scrollY);
    }

  }
  // 短縮登録
  export var APP = new ModelApp();
}
