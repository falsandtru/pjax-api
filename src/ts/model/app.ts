/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.update.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="util.ts"/>
/// <reference path="../view/main.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class App extends Template implements ModelAppInterface {

    constructor(public model_: ModelInterface, public controller_: ControllerInterface) {
      super();
    }

    Update = AppUpdate
    DATA: AppDataInterface = new AppData(this.model_, this)

    landing: string = UTIL.canonicalizeUrl(window.location.href)
    recent: RecentInterface = { order: [], data: {}, size: 0 }
    isScrollPosSavable: boolean = true
    activeXHR: JQueryXHR
    activeSetting: SettingInterface

    configure(option: SettingInterface, origURL: string, destURL: string): SettingInterface {
      origURL = UTIL.canonicalizeUrl(origURL || option.origLocation.href);
      destURL = UTIL.canonicalizeUrl(destURL || option.destLocation.href);
      option = option.option || option;

      var scope = option.scope ? jQuery.extend(true, {}, option, this.scope_(option, origURL, destURL) || { disable: true })
                                : jQuery.extend(true, {}, option);

      var initial = {
            gns: NAME,
            ns: '',
            disable: false,
            
            area: 'body',
            link: 'a:not([target])',
            filter: function(){return /(\/[^.]*|\.html?|\.php)$/.test('/' + this.pathname);},
            form: null,
            scope: null,
            rewrite: null,
            state: null,
            scrollTop: 0,
            scrollLeft: 0,
            ajax: { dataType: 'text' },
            contentType: 'text/html',
            cache: {
              click: false, submit: false, popstate: false, get: true, post: true, mix: 0,
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
              ajax: { dataType: 'script', cache: true }
            },
            balance: {
              self: false,
              weight: 3,
              client: {
                support: {
                  userAgent: /msie|trident.+ rv:|chrome|firefox|safari/i,
                  redirect: /chrome|firefox|safari/i
                },
                exclude: /mobile|phone|android|iphone|blackberry/i,
                cookie: {
                  balance: 'ajax_balanceable',
                  redirect: 'ajax_redirectable',
                  host: 'ajax_host'
                }
              },
              server: {
                header: 'X-Ajax-Host',
                filter: null,
                error: 10 * 60 * 1000,
              },
              log: {
                expires: 10 * 24 * 60 * 60 * 1000,
                limit: 30
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
              update: { rewrite: {}, cache: {}, redirect: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, render: {}, verify: {}, balance: {} }
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
            scroll: { queue: [] },
            loadtime: null,
            retriable: true,
            option: option
          },
          compute = function () {
            var nsArray: string[] = [setting.gns || NAME].concat(setting.ns && String(setting.ns).split('.') || []);
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
              fix: !/android|iphone os|like mac os x/i.test(window.navigator.userAgent) ? { location: false, reset: false } : {},
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
        if (element.src in executed) { return; }
        if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) { executed[element.src] = true; }
      });

      new VIEW.Main(this.model_, this.controller_, $context).BIND(setting);
      setTimeout(() => this.createHTMLDocument(), 50);
      setTimeout(() => this.DATA.loadBufferAll(setting.buffer.limit), setting.buffer.delay);
      setting.balance.self && setTimeout(() => this.enableBalance(), setting.buffer.delay);
      setTimeout(() => this.landing = null, 1500);
    }

    enableBalance(host?: string): void {
      var setting: SettingInterface = this.model_.getActiveSetting();

      if (!setting.balance.client.support.userAgent.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
        return void this.disableBalance();
      }

      if (Number(!this.DATA.setCookie(setting.balance.client.cookie.balance, '1'))) {
        return void this.disableBalance();
      }
      if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
        this.DATA.setCookie(setting.balance.client.cookie.redirect, '1');
      }
      host && this.switchRequestServer(host, setting);
    }

    disableBalance(): void {
      var setting: SettingInterface = this.model_.getActiveSetting();

      this.DATA.setCookie(setting.balance.client.cookie.balance, '0');
      this.DATA.setCookie(setting.balance.client.cookie.redirect, '0');
      this.switchRequestServer(null, setting);
    }

    switchRequestServer(host: string, setting: SettingInterface): void {
      host = host || '';
      setting = setting || this.model_.getActiveSetting();
      this.model_.requestHost = host;
      setting.balance.server.host = host;
      this.DATA.setCookie(setting.balance.client.cookie.host, host);
    }

    chooseRequestServer(setting: SettingInterface): void {
      setting.balance.self && this.enableBalance();
      if (!setting.balance.self || '1' !== this.DATA.getCookie(setting.balance.client.cookie.balance)) {
        this.disableBalance();
        return;
      }

      this.DATA.loadBufferAll(setting.buffer.limit);

      var expires: number;
      var historyBufferData: HistorySchema = this.DATA.getBuffer<HistorySchema>(this.DATA.storeNames.history, this.model_.convertUrlToKeyUrl(setting.destLocation.href));

      expires = historyBufferData && historyBufferData.expires;
      if (expires && expires >= new Date().getTime()) {
        this.switchRequestServer(historyBufferData.host, setting);
        return;
      }

      var logBuffer = this.DATA.getBuffer<{ [index: number]: LogSchema }>(this.DATA.storeNames.log),
          timeList: number[] = [],
          logTable: { [index: number]: LogSchema } = {},
          now: number = new Date().getTime();

      if (!logBuffer) {
        host = this.DATA.getCookie(setting.balance.client.cookie.host);
        if (host) {
          this.enableBalance(host);
        } else {
          this.disableBalance();
        }
        return;
      }
      var time: number;
      for (var i in logBuffer) {
        if (now > logBuffer[i].date + setting.balance.log.expires) { continue; }
        timeList.push(logBuffer[i].performance);
        logTable[logBuffer[i].performance] = logBuffer[i];
      }


      function compareNumbers(a, b) {
        return a - b;
      }
      timeList = timeList.sort(compareNumbers);
      var serverBuffer = this.DATA.getBuffer<{ [index: string]: ServerSchema }>(this.DATA.storeNames.server),
          time: number = timeList.shift();

      if (!serverBuffer) {
        this.disableBalance();
        return;
      }
      var host: string = '',
          time: number;
      for (var j = setting.balance.log.limit; time = i-- && timeList.shift();) {
        host = logTable[time].host.split('//').pop() || '';
        if (!serverBuffer[host] || serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.error) {
          continue;
        }
        if (!host && setting.balance.weight && !(Math.floor(Math.random()) * setting.balance.weight)) {
          continue;
        }
        this.switchRequestServer(host, setting);
        return;
      }

      this.disableBalance();
    }
    
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string {
      areas = areas instanceof Array ? areas : [areas];

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
          scpTable = setting.scope,
          dirs: string[],
          scpKeys: string[],
          scpKey: string,
          scpTag: string,
          patterns: string[],
          inherit: boolean,
          hit_src: boolean,
          hit_dst: boolean,
          option: Object;

      origKeyUrl = this.model_.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
      destKeyUrl = this.model_.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
      rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');

      scpKeys = (rewriteKeyUrl || destKeyUrl).replace(/^\/|\/$/g, '').split('/');
      if (rewriteKeyUrl) {
        if (!~rewriteKeyUrl.indexOf('*')) { return undefined; }
        dirs = [];
        var arr: string[] = origKeyUrl.replace(/^\/|\/$/g, '').split('/');
        for (var i = 0, len = scpKeys.length; i < len; i++) { '*' === scpKeys[i] && dirs.push(arr[i]); }
      }

      for (var i = scpKeys.length + 1; i--;) {
        inherit = option = hit_src = hit_dst = undefined;
        scpKey = scpKeys.slice(0, i).join('/');
        scpKey = '/' + scpKey + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(scpKey.length + 1) ? '/' : '');

        if (!scpKey || !(scpKey in scpTable)) { continue; }

        if (scpTable[scpKey] instanceof Array) {
          scpTag = '';
          patterns = scpTable[scpKey];
        } else {
          scpTag = scpTable[scpKey];
          patterns = scpTable[scpTag];
        }

        if (!patterns || !patterns[0]) { return false; }

        patterns = patterns.concat();
        for (var j = 0, pattern; pattern = patterns[j]; j++) {
          if (hit_src === false || hit_dst === false) { break; }

          if ('#' === pattern[0]) {
            scpTag = pattern.slice(1);
            [].splice.apply(patterns, [j, 1].concat(scpTable[scpTag]));
            pattern = patterns[j];
          }

          if ('inherit' === pattern) {
            inherit = true;
          } else if ('rewrite' === pattern && 'function' === typeof scpTable.rewrite && !rewriteKeyUrl) {
            var rewrite: any = this.scope_.apply(this, [].slice.call(arguments).slice(0, 3).concat([UTIL.fire(scpTable.rewrite, null, [destKeyUrl])]));
            if (rewrite) {
              hit_src = hit_dst = true;
              option = rewrite;
              break;
            } else if (false === rewrite) {
              return false;
            }
          } else if ('string' === typeof pattern) {
            var not: boolean = '!' === pattern[0];
            pattern = not ? pattern.slice(1) : pattern;
            var reg: boolean = '*' === pattern[0];
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
                option = scpTable['$' + scpTag] || scpTable['$' + pattern] || null;
              }
            }
          }
        }

        if (hit_src && hit_dst) {
          return jQuery.extend(true, {}, setting, option);
        }
        if (inherit) { continue; }
        break;
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
      // firefox
      this.createHTMLDocument = function (html: string = '') {
        return window.DOMParser && window.DOMParser.prototype && new window.DOMParser().parseFromString(html, 'text/html');
      };
      if (test(this.createHTMLDocument)) { return this.createHTMLDocument(html); }

      // chrome, safari
      this.createHTMLDocument = function (html: string = '') {
        if (document.implementation && document.implementation.createHTMLDocument) {
          var doc = document.implementation.createHTMLDocument('');
          // IE, Operaクラッシュ対策
          if ('object' === typeof doc.activeElement && doc.activeElement) {
            doc.open();
            doc.write(html);
            doc.close();
          }
        }
        return doc;
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

      function test(createHTMLDocument) {
        try {
          var doc = createHTMLDocument && createHTMLDocument('<html lang="en" class="html"><head><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>');
          return doc &&
                 jQuery('html', doc).is('.html[lang=en]') &&
                 (<HTMLLinkElement>jQuery('head>link', doc)[0]).href &&
                 jQuery('head>noscript', doc).html() &&
                 jQuery('body>noscript', doc).text() === 'noscript' &&
                 (<HTMLAnchorElement>jQuery('body>a', doc)[0]).href;
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
