/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.balance.ts"/>
/// <reference path="app.page.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  var Util = LIBRARY.Utility

  export class Main implements AppLayerInterface {

    constructor(private model_: ModelInterface, private controller_: ControllerInterface) {
    }

    balance: BalanceInterface = new Balance(this.model_, this)
    page: PageInterface = new Page(this.model_, this)
    data: DataInterface = new Data(this.model_, this)

    initialize($context: JQuery, setting: SettingInterface): void {
      var loadedScripts = this.page.loadedScripts;
      setting.load.script && jQuery('script').each(function () {
        var element: HTMLScriptElement = this;
        if (element.src) { loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload); }
      });

      new View(this.model_, this.controller_, $context, setting);
      setTimeout(() => this.data.loadBuffers(setting.buffer.limit), setting.buffer.delay);
      setTimeout(() => this.balance.enable(setting), setting.buffer.delay);
      setTimeout(() => this.page.landing = null, 1500);
    }

    configure(option: PjaxSetting, origURL: string, destURL: string): SettingInterface {
      var that = this;

      origURL = Util.normalizeUrl(origURL || (<SettingInterface>option).origLocation.href);
      destURL = Util.normalizeUrl(destURL || (<SettingInterface>option).destLocation.href);
      option = jQuery.extend(true, {}, (<SettingInterface>option).option || option);

      option = option.scope ? jQuery.extend(true, {}, option, scope(option, origURL, destURL) || { cancel: true })
                            : jQuery.extend(true, {}, option);
      FREEZE(option, true);

      var initial = <PjaxSetting>{
            area: 'body',
            link: 'a:not([target])',
            // this.protocolはIEでエラー
            filter: function () { return /^https?:/.test(this.href) && /\/[^.]*$|\.(html?|php)$/.test(this.pathname.replace(/^\/?/, '/')); },
            form: null,
            scope: null,
            rewrite: null,
            state: null,
            scrollTop: 0,
            scrollLeft: 0,
            ajax: { dataType: 'text' },
            contentType: 'text/html',
            redirect: true,
            cache: {
              click: false, submit: false, popstate: false, get: true, post: true, mix: 0,
              limit: 100 /* pages */, size: 1 * 1024 * 1024 /* 1MB */, expires: { max: null, min: 5 * 60 * 1000 /* 5min */}
            },
            buffer: {
              limit: 30,
              delay: 500 
            },
            load: {
              head: '',
              css: false,
              script: false,
              execute: true,
              log: 'head, body',
              reload: '',
              ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
              ajax: { dataType: 'script', cache: true }
            },
            balance: {
              self: false,
              weight: 3,
              option: <PjaxSetting>{
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
              },
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
                respite: 10 * 60 * 1000,
              },
              history: {
                expires: 10 * 24 * 60 * 60 * 1000,
                limit: 30
              }
            },
            wait: 0,
            fallback: true,
            reset: {
              type: '',
              count: 100,
              time: 3 * 60 * 60 * 1000
            },
            fix: {
              location: true,
              history: true,
              scroll: true,
              noscript: true,
              reset: false
            },
            database: true,
            server: {
              query: null,
              header: true
            },
            callback: null,
            callbacks: {
              ajax: {},
              update: { redirect: {}, rewrite: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, balance: {} }
            },
            param: null
          },
          force = <SettingInterface>{
            ns: undefined,
            nss: undefined,
            speedcheck: undefined,
            cancel: undefined,
            origLocation: undefined,
            destLocation: undefined,

            gns: NAME,
            areas: [],
            scroll: { queue: [] },
            loadtime: null,
            retriable: true,
            option: option
          },
          compute = () => {
            setting.ns = setting.ns && setting.ns.split('.').sort().join('.') || '';
            var nsArray: string[] = [setting.gns || NAME].concat(setting.ns && String(setting.ns).split('.') || []);
            var query: string = setting.server.query;
            switch (query && typeof query) {
              case 'string':
                query = eval('({' + query.match(/[^?=&]+=[^&]*/g).join('&').replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]*)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
              case 'object':
                query = jQuery.param(query);
                break;
              default:
                query = '';
            }
            return <SettingInterface>{
              gns: undefined,
              ns: undefined,
              areas: undefined,
              scroll: undefined,
              loadtime: undefined,
              retriable: undefined,
              option: undefined,
              speedcheck: undefined,
              cancel: undefined,

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
                requestHeader: ['X', nsArray[0].replace(/^\w/, function (str) { return str.toUpperCase(); })].join('-')
              },
              origLocation: (function (url, a) { a.href = url; return a; })(origURL, document.createElement('a')),
              destLocation: (function (url, a) { a.href = url; return a; })(destURL, document.createElement('a')),
              fix: /android|iphone os|like mac os x/i.test(window.navigator.userAgent) ? undefined : { location: false, reset: false },
              contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
              reset: {
                type: (setting.reset.type || '').toLowerCase()
              },
              server: {
                query: query
              },
              timeStamp: new Date().getTime()
            };
          };

      var setting: SettingInterface;
      setting = jQuery.extend(true, initial, option);
      setting = jQuery.extend(true, setting, setting.balance.self && setting.balance.option, force);
      setting = jQuery.extend(true, setting, compute());

      return SEAL(setting, true);

      function scope(setting: PjaxSetting, origURL: string, destURL: string, rewriteKeyUrl: string = ''): any {
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

        origKeyUrl = that.model_.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
        destKeyUrl = that.model_.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
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

          if (!patterns || !patterns.length) { return false; }

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
              var rewrite: any = scope.apply(this, [].slice.call(arguments).slice(0, 3).concat([Util.fire(scpTable.rewrite, null, [destKeyUrl])]));
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
    
    }

  }

}

module MODULE.MODEL {
  export var App = MODEL.APP.Main
}
