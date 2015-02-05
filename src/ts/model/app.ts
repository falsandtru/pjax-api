/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  MIXIN(Page, [PageUtility]);

  export class Main implements AppLayerInterface {

    constructor(private model_: ModelInterface, private controller_: ControllerInterface) {
    }
    
    private util_ = LIBRARY.Utility

    private settings_: { [index: string]: SettingInterface } = {}
    private option_: PjaxSetting

    data: DataInterface = new Data(this.model_)
    balancer: BalancerInterface = new Balancer(this.data)
    page: PageInterface = new Page(this.model_, this.data, this.balancer)

    initialize($context: JQuery, setting: SettingInterface): void {
      this.controller_.view($context, setting);
      this.balancer.enable(setting);
      this.data.loadBuffers();
      setTimeout(() => this.page.landing = null, 1500);
    }
    
    configure(option: PjaxSetting): SettingInterface
    configure(event: Event): SettingInterface
    configure(destination: string): SettingInterface
    configure(destination: HTMLAnchorElement): SettingInterface
    configure(destination: HTMLFormElement): SettingInterface
    configure(destination: Location): SettingInterface
    configure(destination: any): SettingInterface {
      var event: Event = (<Event>destination).preventDefault ? destination : null;
      switch (event && 'object' === typeof event && event.type.toLowerCase()) {
        case EVENT.CLICK:
          return this.configure(<HTMLAnchorElement>event.currentTarget);
        case EVENT.SUBMIT:
          return this.configure(<HTMLFormElement>event.currentTarget);
        case EVENT.POPSTATE:
          return this.configure(window.location);
        case null:
          break;
      }

      var url: string;
      switch (true) {
        case 'string' === typeof destination:
          url = destination;
          break;
        case 'href' in destination:
          url = this.util_.normalizeUrl(destination.href);
          break;
        case 'action' in destination:
          url = this.util_.normalizeUrl(destination.action.replace(/[?#].*/, ''));
          switch (destination.method.toUpperCase()) {
            case 'GET':
              url += '?' + jQuery(destination).serialize();
              break;
          }
          break;
        default:
          url = this.model_.location.href;
          this.option_ = destination;
      }

      var index: string = [
        this.util_.canonicalizeUrl(this.model_.location.href).slice(0, 2048),
        this.util_.canonicalizeUrl(url).slice(0, 2048)
      ].join(' ');

      if (!this.option_) {
        return null;
      }
      if (index in this.settings_) {
        return this.settings_[index];
      }
      
      var origLocation: HTMLAnchorElement = <HTMLAnchorElement>this.model_.location.cloneNode(),
          destLocation: HTMLAnchorElement = <HTMLAnchorElement>this.model_.location.cloneNode();

      origLocation.href = this.util_.canonicalizeUrl(origLocation.href);
      destLocation.href = this.util_.canonicalizeUrl(url);

      var scope: PjaxSetting = this.scope_(this.option_, origLocation.href, destLocation.href) || null;

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
              limit: 100 /* pages */, expires: { max: null, min: 5 * 60 * 1000 /* 5min */}
            },
            buffer: {
              limit: 30,
              delay: 500 
            },
            load: {
              head: '',
              css: false,
              script: false,
              ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
              reload: '',
              log: 'head, body',
              error: true,
              ajax: { dataType: 'script', cache: true }
            },
            balance: {
              active: false,
              bounds: ['*'],
              weight: 1,
              random: 0,
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
                hosts: [],
                support: {
                  browser: /msie|trident.+ rv:|chrome|firefox|safari/i,
                  redirect: /chrome|firefox|safari/i
                },
                cookie: {
                  balance: 'balanceable',
                  redirect: 'redirectable',
                  host: 'host'
                }
              },
              server: {
                header: 'X-Ajax-Host',
                respite: 10 * 60 * 1000,
                expires: 10 * 24 * 60 * 60 * 1000
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
              reference: true
            },
            database: {
              active: true,
              revision: 0,
              refresh: 10
            },
            server: {
              query: null,
              header: true
            },
            overlay: '',
            callback: null,
            callbacks: {
              ajax: {},
              update: { redirect: {}, url: {}, rewrite: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, balance: {} }
            },
            data: undefined
          },
          force = <SettingInterface>{
            uid: UUID(),
            ns: '',
            nss: undefined,
            speedcheck: undefined,

            origLocation: origLocation,
            destLocation: destLocation,

            scroll: { queue: [] },
            option: this.option_
          },
          compute = () => {
            setting.ns = setting.ns ? setting.ns.split('.').sort().join('.') : '';
            var nsArray: string[] = [DEF.NAME].concat(setting.ns ? setting.ns.split('.') : []);
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
              uid: undefined,
              ns: undefined,
              origLocation: undefined,
              destLocation: undefined,
              scroll: undefined,
              option: undefined,
              speedcheck: undefined,

              nss: {
                array: nsArray,
                name: nsArray.join('.'),
                data: nsArray[0],
                url: this.model_.convertUrlToKey(setting.destLocation.href, true),
                event: {
                  pjax: {
                    fetch: [EVENT.PJAX, 'fetch'].join(':'),
                    unload: [EVENT.PJAX, 'unload'].join(':'),
                    DOMContentLoaded: [EVENT.PJAX, 'DOMContentLoaded'].join(':'),
                    ready: [EVENT.PJAX, 'ready'].join(':'),
                    render: [EVENT.PJAX, 'render'].join(':'),
                    load: [EVENT.PJAX, 'load'].join(':')
                  },
                  click: [EVENT.CLICK].concat(nsArray.join(':')).join('.'),
                  submit: [EVENT.SUBMIT].concat(nsArray.join(':')).join('.'),
                  popstate: [EVENT.POPSTATE].concat(nsArray.join(':')).join('.'),
                  scroll: [EVENT.SCROLL].concat(nsArray.join(':')).join('.')
                },
                elem: nsArray.join('-'),
                requestHeader: ['X', nsArray[0].replace(/^\w/, function (str) { return str.toUpperCase(); })].join('-')
              },
              fix: /android|iphone os|like mac os x/i.test(window.navigator.userAgent) ? undefined : { location: false },
              contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
              database: {
                refresh: Math.min(setting.database.refresh, 30)
              },
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
      setting = jQuery.extend(true, initial, scope || this.option_);
      setting = jQuery.extend(true, setting, setting.balance.active && setting.balance.option, force);
      setting = jQuery.extend(true, setting, compute());

      if (scope) {
        FREEZE(setting, true);
        this.settings_[index] = setting;
        return setting;
      } else {
        this.settings_[index] = null;
        return null;
      }
    }

    private scope_(option: PjaxSetting, origURL: string, destURL: string, rewriteKeyUrl: string = ''): PjaxSetting {
      option = jQuery.extend(true, {}, option);
      if (!option.scope) { return option; }

      var origKeyUrl: string,
          destKeyUrl: string,
          scpTable = option.scope,
          dirs: string[],
          scpKeys: string[],
          scpKey: string,
          scpTag: string,
          scope: PjaxSetting;

      origKeyUrl = this.model_.convertUrlToKey(origURL, true).match(/.+?\w(\/.*)/).pop();
      destKeyUrl = this.model_.convertUrlToKey(destURL, true).match(/.+?\w(\/.*)/).pop();
      rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');

      scpKeys = (rewriteKeyUrl || origKeyUrl).split('/');
      if (rewriteKeyUrl) {
        if (!~rewriteKeyUrl.indexOf('*')) { return undefined; }
        dirs = [];
        var arr: string[] = origKeyUrl.split('/');
        for (var i = 0, len = scpKeys.length; i < len; i++) { '*' === scpKeys[i] && dirs.push(arr[i]); }
      }

      for (var i = scpKeys.length; i--;) {
        scpKey = scpKeys.slice(0, i + 1).join('/');
        scpKey = scpKey + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(scpKey.length) ? '/' : '');

        if (!scpKey || !(scpKey in scpTable)) { continue; }

        var patterns: string[];
        if (scpTable[scpKey] instanceof Array) {
          scpTag = '';
          patterns = scpTable[scpKey];
        } else {
          scpTag = scpTable[scpKey];
          patterns = scpTable[scpTag];
        }
        if (patterns) {
          patterns = patterns.concat();
        } else {
          continue;
        }

        var hit_src: boolean,
            hit_dst: boolean,
            inherit: boolean,
            expanded: string[] = [];
        inherit = scope = hit_src = hit_dst = undefined;
        for (var j = 0, pattern: string; pattern = patterns[j]; j++) {
          if ('#' === pattern.charAt(0)) {
            if (!~jQuery.inArray(pattern, expanded) && pattern.length > 1) {
              expanded.push(pattern);
              scpTag = pattern.slice(1);
              [].splice.apply(patterns, [j, 1].concat(scpTable[scpTag], '#'));
              pattern = patterns[j];
            } else {
              scpTag = '';
              continue;
            }
          }

          if ('inherit' === pattern) {
            inherit = true;
          } else if ('rewrite' === pattern && 'function' === typeof scpTable.rewrite && !rewriteKeyUrl) {
            scope = this.scope_(option, origURL, destURL, this.util_.fire(scpTable.rewrite, null, [destKeyUrl]));
            if (scope) {
              hit_src = hit_dst = true;
            } else if (null === scope) {
              hit_src = hit_dst = false;
            }
          } else if ('string' === typeof pattern) {
            var not: boolean = '!' === pattern.charAt(0);
            pattern = not ? pattern.slice(1) : pattern;
            var reg: boolean = '*' === pattern.charAt(0);
            pattern = reg ? pattern.slice(1) : pattern;

            if (rewriteKeyUrl && ~pattern.indexOf('/*/')) {
              for (var k = 0, len = dirs.length; k < len; k++) { pattern = pattern.replace('/*/', '/' + dirs[k] + '/'); }
            }

            if (reg ? ~origKeyUrl.search(pattern) : ~origKeyUrl.indexOf(pattern)) {
              if (not) {
                hit_src = false;
              } else {
                hit_src = true;
                scope = scpTable['$' + scpTag] || scpTable['$' + pattern] || undefined;
              }
            }
            if (reg ? ~destKeyUrl.search(pattern) : ~destKeyUrl.indexOf(pattern)) {
              if (not) {
                hit_dst = false;
              } else {
                hit_dst = true;
                scope = scpTable['$' + scpTag] || scpTable['$' + pattern] || undefined;
              }
            }
          }
          if (false === hit_src || false === hit_dst) { return null; }
        }

        if (hit_src && hit_dst) {
          return jQuery.extend(true, option, scope);
        } else if (inherit) {
          continue;
        }
        break;
      }
      return undefined;
    }
      
  }

}

module MODULE.MODEL {
  export var App = MODEL.APP.Main
}
