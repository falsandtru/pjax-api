/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

interface Window {
  DOMParser?: any
  webkitIndexedDB?: IDBFactory
  mozIndexedDB?: IDBFactory
  IDBKeyRange?: IDBKeyRange
  webkitIDBKeyRange?: IDBKeyRange
  mozIDBKeyRange?: IDBKeyRange
  msIDBKeyRange?: IDBKeyRange
  opera?
}
interface JQueryXHR {
  follow: boolean
  timeStamp: number
}
module MODULE {
  export class ModelMain extends ModelTemplate implements ModelInterface {
    constructor() {
      super();
      this.state_ = State.wait;
    }

    state: State
    isDeferrable: boolean = jQuery.when && 1.6 <= Number(jQuery().jquery.match(/\d+\.\d+/))

    main_($context: JQuery, option): JQuery {

      var pattern;
      pattern = $context instanceof NAMESPACE ? 'm:' : 'f:';
      pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
      switch (pattern.toLowerCase()) {
        case 'm:object':
        case 'm:undefined':
          break;
        default:
          return $context;
      }

      var setting: SettingInterface = APP.configure(option, window.location.href, window.location.href);
      M.setActiveSetting(setting);

      APP.stock({
        executed: {},
        speed: {
          fire: 0,
          time: [],
          name: [],
          now: function () { return new Date().getTime(); }
        }
      });

      //$context._uuid = setting.uuid;

      if ('pushState' in window.history && window.history['pushState']) {
        jQuery(() => {
          APP.registrate($context, setting);
          M.state_ = ~M.state_ ? M.state_ : State.ready;
        });
      }

      return $context;
    }

    convertUrlToUrlKey(unsafe_url: string, isIncludeHash: boolean): string {
      return isIncludeHash ? unsafe_url : unsafe_url.replace(/#.*/, '')
    }

    isImmediateLoadable(url: string): boolean
    isImmediateLoadable(event: JQueryEventObject): boolean
    isImmediateLoadable(param: any): boolean {
      if (M.state_ !== State.ready) { return; }

      var origURL: string = UTIL.canonicalizeUrl(window.location.href),
          destURL: string,
          event: JQueryEventObject;
      switch (typeof param) {
        case 'string':
          event = null;
          destURL = UTIL.canonicalizeUrl(param);
          break;
        case 'object':
          event = param;
          switch (event.type.toLowerCase()) {
            case 'click':
              destURL = UTIL.canonicalizeUrl((<HTMLAnchorElement>event.currentTarget).href);
              break;
            case 'submit':
              destURL = UTIL.canonicalizeUrl((<HTMLFormElement>event.currentTarget).action);
              break;
            case 'popstate':
              return true;
          }
          if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return false; }
          break;
      }
      var origLocation: HTMLAnchorElement = <HTMLAnchorElement>jQuery('<a/>', { href: origURL })[0],
          destLocation: HTMLAnchorElement = <HTMLAnchorElement>jQuery('<a/>', { href: destURL })[0];

      if (origLocation.protocol !== destLocation.protocol || origLocation.host !== destLocation.host) { return false; }

      var setting: SettingInterface = APP.configure(M.getActiveSetting(), origLocation.href, destLocation.href);
      if (setting.disable) { return; }
      if (!setting.hashquery && destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) { return false; }
      setting.area = UTIL.fire(setting.area, null, [event, setting.param, origLocation.href, destLocation.href]);
      setting.area = setting.area instanceof Array ? setting.area : [setting.area];
      if (!jQuery(event.currentTarget).filter(setting.filter).length) { return false; }
      if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { return false; }

      return true;
    }

    getActiveSetting(): CommonSettingInterface {
      return APP.activeSetting;
    }
    setActiveSetting(setting: CommonSettingInterface): CommonSettingInterface {
      return APP.activeSetting = setting;
    }

    getActiveXHR(): JQueryXHR {
      return APP.activeXHR;
    }
    setActiveXHR(xhr: JQueryXHR): JQueryXHR {
      APP.activeXHR && APP.activeXHR.readyState < 4 && APP.activeXHR.abort();
      return APP.activeXHR = xhr;
    }

    CLICK(event: JQueryEventObject): void {
      event.timeStamp = new Date().getTime();
      var context = <HTMLAnchorElement>event.currentTarget,
          $context: ContextInterface = jQuery(context);
      var setting: SettingInterface = APP.configure(M.getActiveSetting(), window.location.href, context.href);

      if (M.state_ !== State.ready || setting.disable || event.isDefaultPrevented()) { return; }
      if (!M.isImmediateLoadable(event)) { return; }

      if (setting.cache.mix && jQuery[M.NAME].getCache(setting.destLocation.href)) { return; }
      setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
      setting.area = setting.area instanceof Array ? setting.area : [setting.area];
      setting.database && setting.scroll.record && APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, setting.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

      var cache: CacheInterface;
      if (setting.cache[event.type.toLowerCase()]) { cache = jQuery[M.NAME].getCache(setting.destLocation.href); }

      APP.drive(setting, event, true, cache);
      return event.preventDefault();
    }

    SUBMIT(event: JQueryEventObject): void {
      event.timeStamp = new Date().getTime();
      var context = <HTMLFormElement>event.currentTarget,
          $context: ContextInterface = jQuery(context);
      var setting: SettingInterface = APP.configure(M.getActiveSetting(), window.location.href, context.action);

      if (M.state_ !== State.ready || setting.disable || event.isDefaultPrevented()) { return; }
      if (!M.isImmediateLoadable(event)) { return; }

      var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + (context.method.toUpperCase() === 'GET' ? '?' + jQuery(context).serialize() : '');
      setting.destLocation.href = UTIL.canonicalizeUrl(serializedURL);
      if (setting.cache.mix && jQuery[M.NAME].getCache(setting.destLocation.href)) { return; }
      setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
      setting.area = setting.area instanceof Array ? setting.area : [setting.area];
      if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { return; }
      setting.database && setting.scroll.record && APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, setting.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

      var cache: CacheInterface;
      if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) { cache = jQuery[M.NAME].getCache(setting.destLocation.href); }

      APP.drive(setting, event, true, cache);
      return event.preventDefault();
    }

    POPSTATE(event: JQueryEventObject): void {
      event.timeStamp = new Date().getTime();
      var setting: SettingInterface = APP.configure(M.getActiveSetting(), null, window.location.href, true);
      if (APP.landing && APP.landing === UTIL.canonicalizeUrl(window.location.href)) { return; }

      if (M.state_ !== State.ready || setting.disable || event.isDefaultPrevented()) { return; }
      if (setting.origLocation.href === setting.destLocation.href) { return; }

      if (setting.origLocation.hash !== setting.destLocation.hash &&
          setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search &&
          !setting.hashquery) {
        return;
      }

      if (setting.cache.mix && jQuery[M.NAME].getCache(setting.destLocation.href)) { return; }
      setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
      setting.area = setting.area instanceof Array ? setting.area : [setting.area];
      if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { return; }

      setting.database && setting.fix.history && APP.loadTitleByDB(setting.destLocation.href, setting.hashquery);

      var cache: CacheInterface;
      if (setting.cache[event.type.toLowerCase()]) { cache = jQuery[M.NAME].getCache(setting.destLocation.href); }

      APP.drive(setting, event, false, cache);
      return event.preventDefault();
    }

    SCROLL(event: JQueryEventObject, end: boolean): void {
      var common: CommonSettingInterface = M.getActiveSetting();
      if (M.state_ !== State.ready || event.isDefaultPrevented()) { return; }

      if (!common.scroll.delay) {
        common.scroll.record && APP.saveScrollPositionToCacheAndDB(window.location.href, common.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
      } else {
        var id: number;
        while (id = common.scroll.queue.shift()) { clearTimeout(id); }
        id = setTimeout(() => {
          while (id = common.scroll.queue.shift()) { clearTimeout(id); }
          common.scroll.record && APP.saveScrollPositionToCacheAndDB(window.location.href, common.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        }, common.scroll.delay);
        common.scroll.queue.push(id);
      }
    }

    enable(): void {
      M.state_ = State.ready;
    }

    disable(): void {
      M.state_ = State.lock;
    }

    getCache(unsafe_url: string): any {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return false; }

      var secure_url: string = UTIL.canonicalizeUrl(unsafe_url);
      unsafe_url = null;

      secure_url = common.hashquery ? secure_url : secure_url.replace(/#.*/, '');
      recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && jQuery[M.NAME].removeCache(secure_url);
      recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].XMLHttpRequest && jQuery[M.NAME].removeCache(secure_url);
      return recent.data[secure_url];
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): any {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return this; }
      var cache: CacheInterface,
          size: number,
          timeStamp: number,
          expires: number;

      var secure_url: string = UTIL.canonicalizeUrl(unsafe_url);
      unsafe_url = null;

      secure_url = common.hashquery ? secure_url : secure_url.replace(/#.*/, '');
      recent.order.unshift(secure_url);
      for (var i = 1, key; key = recent.order[i]; i++) { if (secure_url === key) { recent.order.splice(i, 1); } }

      recent.size > common.cache.size && M.cleanCache();
      cache = jQuery[M.NAME].getCache(secure_url);
      if (!data && !XMLHttpRequest && (!cache || !cache.data && !cache.XMLHttpRequest)) { return; }

      var html: string = (XMLHttpRequest || <XMLHttpRequest>{}).responseText || '';
      size = parseInt(html.length * 1.8 + '' || 1024 * 1024 + '', 10);
      timeStamp = new Date().getTime();
      expires = (function (timeStamp: number): number {
        var expires = common.cache.expires,
            expire: any;
        if (!common.cache.expires) { return 0; }
        if (recent.data[secure_url] && !XMLHttpRequest) { return recent.data[secure_url].expires; }

        if (!XMLHttpRequest) {
        } else if (/no-store|no-cache/.test(XMLHttpRequest.getResponseHeader('Cache-Control'))) {
        } else if (~String(expire = XMLHttpRequest.getResponseHeader('Cache-Control')).indexOf('max-age=')) {
          expire = expire.match(/max-age=(\d+)/)[1] * 1000;
        } else if (expire = XMLHttpRequest.getResponseHeader('Expires')) {
          expire = new Date(expire).getTime() - new Date().getTime();
        } else {
          expire = Number(common.cache.expires);
        }
        expire = Math.max(expire, 0) || 0;
        expire = 'object' === typeof common.cache.expires && 'number' === typeof common.cache.expires.min ? Math.max(common.cache.expires.min, expire) : expire;
        expire = 'object' === typeof common.cache.expires && 'number' === typeof common.cache.expires.max ? Math.min(common.cache.expires.max, expire) : expire;
        return timeStamp + expire;
      })(timeStamp);
      recent.size = recent.size || 0;
      recent.size += recent.data[secure_url] ? 0 : size;
      recent.data[secure_url] = jQuery.extend(
        true,
        {},
        cache,
        {
          XMLHttpRequest: XMLHttpRequest,
          textStatus: textStatus,
          data: data,
          //css: undefined,
          //script: undefined,
          size: size,
          expires: expires,
          scrollX: null,
          scrollY: null,
          timeStamp: timeStamp
        }
        );
      if (!recent.data[secure_url].data && !recent.data[secure_url].XMLHttpRequest) {
        jQuery[M.NAME].removeCache(secure_url);
      }
      if (XMLHttpRequest || cache && cache.XMLHttpRequest) {
        var title: string = ((XMLHttpRequest || cache && cache.XMLHttpRequest).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
        common.database && common.fix.history && APP.saveTitleToDB(secure_url, common.hashquery, title);
      }
    }
    
    removeCache(unsafe_url: string): void {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return; }

      var secure_url: string = UTIL.canonicalizeUrl(unsafe_url);
      unsafe_url = null;

      secure_url = common.hashquery ? secure_url : secure_url.replace(/#.*/, '');
      for (var i = 0, key; key = recent.order[i]; i++) {
        if (secure_url === key) {
          recent.order.splice(i, 1);
          recent.size -= recent.data[key].size;
          recent.data[key] = null;
          delete recent.data[key];
        }
      }
    }

    clearCache(): void {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return; }
      for (var i = recent.order.length, url; url = recent.order[--i];) {
        recent.order.splice(i, 1);
        recent.size -= recent.data[url].size;
        delete recent.data[url];
      }
    }

    cleanCache(): void {
      var common: CommonSettingInterface = M.getActiveSetting(),
        recent: RecentInterface = APP.recent;
      if (!common || !recent) { return; }
      for (var i = recent.order.length, url; url = recent.order[--i];) {
        if (i >= common.cache.page || url in recent.data && new Date().getTime() > recent.data[url].expires) {
          recent.order.splice(i, 1);
          recent.size -= recent.data[url].size;
          delete recent.data[url];
        }
      }
    }

  }
  // 短縮登録
  export var Model = ModelMain;
  export var M = new Model();
}
