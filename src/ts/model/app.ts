/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.update.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class ModelApp extends ModelTemplate implements ModelAppInterface {

    DATA: AppData = new AppData(this)

    landing: string = UTIL.canonicalizeUrl(window.location.href)
    recent: RecentInterface = { order: [], data: {}, size: 0 }
    activeXHR: JQueryXHR
    activeSetting: SettingInterface

    configure(option: SettingInterface, origURL: string, destURL: string): SettingInterface {
      origURL = UTIL.canonicalizeUrl(origURL || option.origLocation.href);
      destURL = UTIL.canonicalizeUrl(destURL || option.destLocation.href);
      option = option.option || option;

      var scope = option.scope ? jQuery.extend(true, {}, option, this.scope_(option, origURL, destURL) || { disable: true })
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
              limit: 100 /* pages */, size: 1 * 1024 * 1024 /* 1MB */, expires: { max: null, min: 5 * 60 * 1000 /* 5min */}
            },
            buffer: {
              limit: 30,
              delay: 500 
            },
            load: {
              sync: true,
              head: '',
              css: false,
              script: false,
              execute: true,
              reload: '',
              ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
              ajax: { dataType: 'script', cache: true },
              rewrite: null
            },
            balance: {
              self: false,
              weight: 3,
              client: {
                support: /chrome|firefox|safari/i,
                exclude: /msie|trident|mobile|phone|android|iphone|ipad|blackberry/i,
                cookie: 'balanceable'
              },
              server: {
                header: 'X-Ajax-Host',
                preclude: 10 * 60 * 1000,
              },
              log: {
                expires: 1.5 * 24 * 60 * 60 * 1000,
                limit: 10
              },
              option: {
                server: {
                  header: false
                },
                ajax: {
                  crossDomain: true
                },
                callbacks: {
                  ajax: {
                    beforeSend: null
                  }
                }
              }
            },
            callback: null,
            callbacks: {
              ajax: {},
              update: { redirect: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, cache: {}, render: {}, verify: {}, balance: {} }
            },
            param: null,
            redirect: true,
            interval: 100,
            wait: 0,
            scroll: { delay: 300 },
            fix: { location: true, history: true, scroll: true, reset: false },
            fallback: true,
            database: true,
            server: {
              query: 'pjax=1',
              header: true
            },
            speedcheck: false
          },
          force = {
            origLocation: (function (url, a) { a.href = url; return a; })(origURL, document.createElement('a')),
            destLocation: (function (url, a) { a.href = url; return a; })(destURL, document.createElement('a')),
            balance: {
              server: {
                host: ''
              }
            },
            scroll: { record: true, queue: [] },
            loadtime: null,
            retriable: true,
            option: option
          },
          compute = function () {
            var nsArray: string[] = [setting.gns || M.NAME].concat(setting.ns && String(setting.ns).split('.') || []);
            var query: string = setting.server.query;
            switch (query && typeof query) {
              case 'string':
                query = eval('({' + query.replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]*)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
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
      setting = jQuery.extend(true, initial, scope);
      setting = jQuery.extend(true, setting, setting.balance.self && setting.balance.option, force);
      setting = jQuery.extend(true, setting, compute());

      return setting; //new this.stock(setting);
    }

    registrate($context: ContextInterface, setting: SettingInterface): void {
      var executed: { [index: string]: boolean; } = this.stock('executed');
      setting.load.script && jQuery('script').each(function () {
        var element = this;
        element = 'function' === typeof setting.load.rewrite ? UTIL.fire(setting.load.rewrite, null, [element.cloneNode(true)]) || element : element;
        if (element.src in executed) { return; }
        if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) { executed[element.src] = true; }
      });

      new View($context).BIND(setting);
      setTimeout(() => this.createHTMLDocument(), 50);
      setTimeout(() => this.DATA.loadBufferAll(setting.buffer.limit), setting.buffer.delay);
      setTimeout(() => setting.balance.self && this.enableBalance(), setting.buffer.delay);
      setTimeout(() => this.landing = null, 1500);
    }
    
    chooseRequestServer(setting: SettingInterface): void {
      if (setting.balance.self && !~document.cookie.indexOf(setting.balance.client.cookie + '=1')) {
        this.enableBalance();
      }
      if (!setting.balance.self || !~document.cookie.indexOf(setting.balance.client.cookie + '=1')) {
        this.disableBalance();
        return;
      }

      this.DATA.loadBufferAll(setting.buffer.limit);

      var expires: number;
      var historyBufferData = <HistorySchema>this.DATA.getBuffer(this.DATA.storeNames.history, M.convertUrlToKeyUrl(setting.destLocation.href));

      expires = historyBufferData && historyBufferData.expires;
      if (expires && expires >= new Date().getTime()) {
        M.requestHost = historyBufferData.host;
        setting.balance.server.host = historyBufferData.host;
        return;
      }

      var logBuffer = <{ [index: number]: LogSchema }>this.DATA.getBuffer(this.DATA.storeNames.log),
          timeList: number[] = [],
          logTable: { [index: number]: LogSchema } = {},
          now: number = new Date().getTime();

      if (!logBuffer) {
        this.disableBalance();
        return;
      }
      for (var i in logBuffer) {
        if (now > logBuffer[i].date + setting.balance.log.expires) { continue; }
        timeList.push(logBuffer[i].response);
        logTable[logBuffer[i].response] = logBuffer[i];
      }


      function compareNumbers(a, b) {
        return a - b;
      }
      timeList = timeList.sort(compareNumbers);
      var serverBuffer = <{ [index: string]: ServerSchema }>this.DATA.getBuffer(this.DATA.storeNames.server),
          time: number = timeList.shift();

      M.requestHost = '';
      if (!serverBuffer) {
        this.disableBalance();
        return;
      }
      var host: string = '',
          time: number;
      for (var j = setting.balance.log.limit; time = i-- && timeList.shift();) {
        host = logTable[time].host.split('//').pop() || '';
        if (!serverBuffer[host] || serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.preclude) {
          continue;
        }
        if (!host && setting.balance.weight && !(Math.floor(Math.random()) * setting.balance.weight)) {
          continue;
        }
        M.requestHost = host;
        setting.balance.server.host = host;
        return;
      }
      this.disableBalance();
    }
    
    enableBalance(): void {
      var setting: SettingInterface = M.getActiveSetting();

      if (!setting.balance.client.support.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
        return;
      }

      document.cookie = setting.balance.client.cookie + '=1'
      if (!~document.cookie.indexOf(setting.balance.client.cookie + '=1') || !setting.database) {
        return void this.disableBalance();
      }
    }

    disableBalance(): void {
      var setting: SettingInterface = M.getActiveSetting();

      M.requestHost = '';
      document.cookie = setting.balance.client.cookie + '=0'
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

    scope_(setting: SettingInterface, origURL: string, destURL: string, rewriteKeyUrl: string = ''): any {
      var origKeyUrl: string,
          destKeyUrl: string,
          scp: any = setting.scope,
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

      origKeyUrl = M.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
      destKeyUrl = M.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
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

            if (reg ? !origKeyUrl.search(pattern) : !origKeyUrl.indexOf(pattern)) {
              if (not) {
                return false;
              } else {
                hit_src = true;
              }
            }
            if (reg ? !destKeyUrl.search(pattern) : !destKeyUrl.indexOf(pattern)) {
              if (not) {
                return false;
              } else {
                hit_dst = true;
                if (scp['$' + pattern]) {
                  option = scp['$' + pattern];
                }
              }
            }
          } else if ('object' === typeof pattern) {
            option = pattern;
          }
        }

        if (hit_src && hit_dst) {
          return jQuery.extend(true, {}, setting, ('object' === typeof rewrite ? rewrite : option) || {});
        }
        if (inherit) { continue; }
        break;
      }
    }

    scrollByHash(hash: string): boolean {
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

    movePageNormally(event: JQueryEventObject): void {
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

    createHTMLDocument(html: string = ''): Document {
      // chrome, firefox
      this.createHTMLDocument = function (html: string = '') {
        return window.DOMParser && window.DOMParser.prototype && new window.DOMParser().parseFromString(html, 'text/html');
      };
      if (test(this.createHTMLDocument)) { return this.createHTMLDocument(html); }

      // ie10+, opera
      this.createHTMLDocument = function (html: string = '') {
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
      if (test(this.createHTMLDocument)) { return this.createHTMLDocument(html); }

      // msafari
      this.createHTMLDocument = function (html: string = '') {
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
      if (test(this.createHTMLDocument)) { return this.createHTMLDocument(html); }

      function test(createHTMLDocument) {
        try {
          var doc = createHTMLDocument && createHTMLDocument('<html lang="en" class="html"><head><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript></body></html>');
          return doc && jQuery('html', doc).is('.html[lang=en]') && jQuery('head>noscript', doc).html() && jQuery('body>noscript', doc).text() === 'noscript';
        } catch (err) { }
      }

    }

    calAge(jqXHR: JQueryXHR): number {
      var age: any;

      switch (true) {
        case /no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control')):
          return 0;
        case !!~String(jqXHR.getResponseHeader('Cache-Control')).indexOf('max-age='):
          return Number(jqXHR.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop()) * 1000;
        case !!String(jqXHR.getResponseHeader('Expires')):
          return new Date(jqXHR.getResponseHeader('Expires')).getTime() - new Date().getTime();
        default:
          return 0;
      }
    }

    calExpires(jqXHR: JQueryXHR): number {
      return new Date().getTime() + this.calAge(jqXHR);
    }

  }
}
