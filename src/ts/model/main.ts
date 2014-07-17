/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M, C, APP

  // Deny access
  var V: void, DATA: void;

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

    convertUrlToUrlKey(unsafe_url: string): string {
      return unsafe_url.replace(/#.*/, '')
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
      if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) { return false; }
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
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLAnchorElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = APP.configure(M.getActiveSetting(), window.location.href, context.href);

        if (M.state_ !== State.ready || setting.disable || event.isDefaultPrevented()) { break PROCESS; }
        if (!M.isImmediateLoadable(event)) { break PROCESS; }

        if (setting.cache.mix && M.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
        setting.area = setting.area instanceof Array ? setting.area : [setting.area];
        setting.database && setting.scroll.record && APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = M.getCache(setting.destLocation.href); }

        new ModelAppUpdate(setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && M.fallback(event, setting);
    }

    SUBMIT(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLFormElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = APP.configure(M.getActiveSetting(), window.location.href, context.action);

        if (M.state_ !== State.ready || setting.disable || event.isDefaultPrevented()) { break PROCESS; }
        if (!M.isImmediateLoadable(event)) { break PROCESS; }

        var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
        setting.destLocation.href = UTIL.canonicalizeUrl(serializedURL);
        if (setting.cache.mix && M.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
        setting.area = setting.area instanceof Array ? setting.area : [setting.area];
        if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { break PROCESS; }
        setting.database && setting.scroll.record && APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) { cache = M.getCache(setting.destLocation.href); }

        new ModelAppUpdate(setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && M.fallback(event, setting);
    }

    POPSTATE(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var setting: SettingInterface = APP.configure(M.getActiveSetting(), null, window.location.href, true);
        if (APP.landing && APP.landing === UTIL.canonicalizeUrl(window.location.href)) { return; }
        if (setting.origLocation.href === setting.destLocation.href) { return; }

        if (M.state_ !== State.ready || setting.disable) { break PROCESS; }

        if (setting.origLocation.hash !== setting.destLocation.hash &&
            setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
          break PROCESS;
        }
        
        setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
        setting.area = setting.area instanceof Array ? setting.area : [setting.area];
        if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { break PROCESS; }

        setting.database && setting.fix.history && APP.loadTitleByDB(setting.destLocation.href);

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = M.getCache(setting.destLocation.href); }

        new ModelAppUpdate(setting, event, false, cache);
        return;
      };
      M.fallback(event, setting);
    }

    SCROLL(event: JQueryEventObject, end: boolean): void {
      var common: CommonSettingInterface = M.getActiveSetting();
      if (M.state_ !== State.ready || event.isDefaultPrevented()) { return; }

      if (!common.scroll.delay) {
        common.scroll.record && APP.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
      } else {
        var id: number;
        while (id = common.scroll.queue.shift()) { clearTimeout(id); }
        id = setTimeout(() => {
          while (id = common.scroll.queue.shift()) { clearTimeout(id); }
          common.scroll.record && APP.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        }, common.scroll.delay);
        common.scroll.queue.push(id);
      }
    }

    fallback(event: JQueryEventObject, setting: SettingInterface): void {
      if ('function' === typeof setting.fallback) {
        UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
      } else {
        APP.movePageNormally(event);
      }
    }

    enable(): void {
      M.state_ = State.ready;
    }

    disable(): void {
      M.state_ = State.lock;
    }

    getCache(unsafe_url: string): CacheInterface {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return null; }

      var secure_url: string = M.convertUrlToUrlKey(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && M.removeCache(secure_url);
      recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && M.removeCache(secure_url);
      return recent.data[secure_url];
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR): any {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return this; }
      var cache: CacheInterface,
          size: number,
          timeStamp: number,
          expires: number;

      var secure_url: string = M.convertUrlToUrlKey(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.order.unshift(secure_url);
      for (var i = 1, key; key = recent.order[i]; i++) { if (secure_url === key) { recent.order.splice(i, 1); } }

      recent.size > common.cache.size && M.cleanCache();
      cache = M.getCache(secure_url);
      if (!data && !jqXHR && (!cache || !cache.data && !cache.jqXHR)) { return; }

      var html: string = (jqXHR || <XMLHttpRequest>{}).responseText || '';
      size = parseInt(html.length * 1.8 + '' || 1024 * 1024 + '', 10);
      timeStamp = new Date().getTime();
      expires = (function (timeStamp: number): number {
        var expires = common.cache.expires,
            age: any;
        if (!common.cache.expires) { return 0; }
        if (recent.data[secure_url] && !jqXHR) { return recent.data[secure_url].expires; }

        if (!jqXHR) {
        } else if (/no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control'))) {
        } else if (~String(age = jqXHR.getResponseHeader('Cache-Control')).indexOf('max-age=')) {
          age = age.match(/max-age=(\d+)/)[1] * 1000;
        } else if (age = jqXHR.getResponseHeader('Expires')) {
          age = new Date(age).getTime() - new Date().getTime();
        } else {
          age = Number(common.cache.expires);
        }
        age = Math.max(age, 0) || 0;
        age = 'object' === typeof common.cache.expires && 'number' === typeof common.cache.expires.min ? Math.max(common.cache.expires.min, age) : age;
        age = 'object' === typeof common.cache.expires && 'number' === typeof common.cache.expires.max ? Math.min(common.cache.expires.max, age) : age;
        return timeStamp + age;
      })(timeStamp);
      recent.size = recent.size || 0;
      recent.size += recent.data[secure_url] ? 0 : size;
      recent.data[secure_url] = jQuery.extend(
        true,
        {},
        cache,
        {
          jqXHR: jqXHR,
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
      if (!recent.data[secure_url].data && !recent.data[secure_url].jqXHR) {
        M.removeCache(secure_url);
      }
      if (jqXHR || cache && cache.jqXHR) {
        var title: string = ((jqXHR || cache && cache.jqXHR).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
        common.database && common.fix.history && APP.saveTitleToDB(secure_url, title);
      }
    }
    
    removeCache(unsafe_url: string): void {
      var common: CommonSettingInterface = M.getActiveSetting(),
          recent: RecentInterface = APP.recent;
      if (!common || !recent) { return; }

      var secure_url: string = M.convertUrlToUrlKey(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

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
