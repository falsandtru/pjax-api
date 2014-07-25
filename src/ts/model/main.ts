/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M, C

  // Deny access
  var V: void;

  export class ModelMain extends ModelTemplate implements ModelInterface {

    state_: State = State.wait

    isDeferrable: boolean = jQuery.when && 1.06 <= Number(jQuery().jquery.replace(/\D*(\d+)\.(\d+).*$/, '$1.0$2').replace(/\d+(\d{2})$/, '$1'))
    requestHost: string = ''

    APP_: ModelApp = new ModelApp()

    main_($context: JQuery, option: PjaxSetting): JQuery {

      var pattern;
      pattern = $context instanceof NAMESPACE ? 'm:' : 'f:';
      pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
      switch (pattern.toLowerCase()) {
        case 'm:object':
          break;
        case 'm:undefined':
          if ($context.is('a, form')) { return $context; }
          option = <PjaxSetting>{};
          break;
        default:
          return $context;
      }

      var setting: SettingInterface = this.APP_.configure(<SettingInterface>option, window.location.href, window.location.href);
      M.setActiveSetting(setting);
      setting.database && this.APP_.DATA.opendb(setting);

      this.APP_.stock({
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
          this.APP_.registrate($context, setting);
          M.state_ = M.state() === State.wait ? State.ready : M.state();
        });
      }

      return $context;
    }

    state(): State { return this.state_; }

    convertUrlToKeyUrl(unsafe_url: string): string {
      return unsafe_url.replace(/#.*/, '')
    }

    isImmediateLoadable(url: string): boolean
    isImmediateLoadable(event: JQueryEventObject): boolean
    isImmediateLoadable(param: any): boolean {
      if (State.ready !== M.state()) { return; }

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

      var setting: SettingInterface = this.APP_.configure(M.getActiveSetting(), origLocation.href, destLocation.href);
      if (setting.disable) { return; }
      if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) { return false; }
      setting.area = UTIL.fire(setting.area, null, [event, setting.param, origLocation.href, destLocation.href]);
      setting.area = setting.area instanceof Array ? setting.area : [setting.area];
      if (!jQuery(event.currentTarget).filter(setting.filter).length) { return false; }
      if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { return false; }

      return true;
    }

    getActiveSetting(): SettingInterface {
      return this.APP_.activeSetting;
    }
    setActiveSetting(setting: SettingInterface): SettingInterface {
      return this.APP_.activeSetting = setting;
    }

    getActiveXHR(): JQueryXHR {
      return this.APP_.activeXHR;
    }
    setActiveXHR(xhr: JQueryXHR): JQueryXHR {
      this.APP_.activeXHR && this.APP_.activeXHR.readyState < 4 && this.APP_.activeXHR.abort();
      return this.APP_.activeXHR = xhr;
    }

    CLICK(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLAnchorElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = this.APP_.configure(M.getActiveSetting(), window.location.href, context.href);

        if (State.ready !== M.state() || setting.disable || event.isDefaultPrevented()) { break PROCESS; }
        if (!M.isImmediateLoadable(event)) { break PROCESS; }

        if (setting.cache.mix && M.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
        setting.area = setting.area instanceof Array ? setting.area : [setting.area];
        setting.database && setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = M.getCache(setting.destLocation.href); }

        new AppUpdate(this.APP_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
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
        var setting: SettingInterface = this.APP_.configure(M.getActiveSetting(), window.location.href, context.action);

        if (State.ready !== M.state() || setting.disable || event.isDefaultPrevented()) { break PROCESS; }
        if (!M.isImmediateLoadable(event)) { break PROCESS; }

        var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
        setting.destLocation.href = UTIL.canonicalizeUrl(serializedURL);
        if (setting.cache.mix && M.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
        setting.area = setting.area instanceof Array ? setting.area : [setting.area];
        if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { break PROCESS; }
        setting.database && setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) { cache = M.getCache(setting.destLocation.href); }

        new AppUpdate(this.APP_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && M.fallback(event, setting);
    }

    POPSTATE(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var setting: SettingInterface = this.APP_.configure(M.getActiveSetting(), null, window.location.href);
        if (this.APP_.landing && this.APP_.landing === UTIL.canonicalizeUrl(window.location.href)) { return; }
        if (setting.origLocation.href === setting.destLocation.href) { return; }

        if (State.ready !== M.state() || setting.disable) { break PROCESS; }

        if (setting.origLocation.hash !== setting.destLocation.hash &&
            setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
          break PROCESS;
        }
        
        setting.area = UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
        setting.area = setting.area instanceof Array ? setting.area : [setting.area];
        if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) { break PROCESS; }

        setting.database && setting.fix.history && this.APP_.DATA.loadTitleFromDB(setting.destLocation.href);

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = M.getCache(setting.destLocation.href); }

        new AppUpdate(this.APP_, setting, event, false, cache);
        return;
      };
      (!event.originalEvent || setting.gns === event.namespace) && M.fallback(event, setting);
    }

    SCROLL(event: JQueryEventObject, end: boolean): void {
      var setting: SettingInterface = M.getActiveSetting();
      if (State.ready !== M.state() || event.isDefaultPrevented()) { return; }

      if (!setting.scroll.delay) {
        setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
      } else {
        var id: number;
        while (id = setting.scroll.queue.shift()) { clearTimeout(id); }
        id = setTimeout(() => {
          while (id = setting.scroll.queue.shift()) { clearTimeout(id); }
          setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        }, setting.scroll.delay);
        setting.scroll.queue.push(id);
      }
    }

    fallback(event: JQueryEventObject, setting: SettingInterface): void {
      if ('function' === typeof setting.fallback) {
        UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
      } else {
        this.APP_.movePageNormally(event);
      }
    }

    enable(): void {
      M.state_ = State.ready;
    }

    disable(): void {
      M.state_ = State.lock;
    }

    getCache(unsafe_url: string): CacheInterface {
      var setting: SettingInterface = M.getActiveSetting(),
          recent: RecentInterface = this.APP_.recent;
      if (!setting || !recent) { return null; }

      var secure_url: string = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && M.removeCache(secure_url);
      recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && M.removeCache(secure_url);
      return recent.data[secure_url];
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR, host?: string): any {
      var setting: SettingInterface = M.getActiveSetting(),
          recent: RecentInterface = this.APP_.recent;
      if (!setting || !recent) { return this; }
      var cache: CacheInterface,
          size: number,
          timeStamp: number,
          expires: number;

      var secure_url: string = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.order.unshift(secure_url);
      for (var i = 1, key; key = recent.order[i]; i++) { if (secure_url === key) { recent.order.splice(i, 1); } }

      recent.size > setting.cache.size && M.cleanCache();
      cache = M.getCache(secure_url);
      if (!data && !jqXHR && (!cache || !cache.data && !cache.jqXHR)) { return; }

      var html: string = (jqXHR || <XMLHttpRequest>{}).responseText || '';
      size = parseInt(html.length * 1.8 + '' || 1024 * 1024 + '', 10);
      timeStamp = new Date().getTime();
      expires = ((timeStamp: number): number => {
        var expires = setting.cache.expires,
            age: any;
        if (!setting.cache.expires) { return 0; }
        if (recent.data[secure_url] && !jqXHR) { return recent.data[secure_url].expires; }

        age = jqXHR && this.APP_.calAge(jqXHR) || Number(setting.cache.expires);

        age = Math.max(age, 0) || 0;
        age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.min ? Math.max(setting.cache.expires.min, age) : age;
        age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.max ? Math.min(setting.cache.expires.max, age) : age;
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
          host: host || '',
          timeStamp: timeStamp
        }
        );
      if (!recent.data[secure_url].data && !recent.data[secure_url].jqXHR) {
        M.removeCache(secure_url);
      }
      if (jqXHR || cache && cache.jqXHR) {
        var title: string = ((jqXHR || cache && cache.jqXHR).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
        setting.database && setting.fix.history && this.APP_.DATA.saveTitleToDB(secure_url, title);
      }
    }
    
    removeCache(unsafe_url: string): void {
      var setting: SettingInterface = M.getActiveSetting(),
          recent: RecentInterface = this.APP_.recent;
      if (!setting || !recent) { return; }

      var secure_url: string = M.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
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
      var setting: SettingInterface = M.getActiveSetting(),
          recent: RecentInterface = this.APP_.recent;
      if (!setting || !recent) { return; }
      for (var i = recent.order.length, url; url = recent.order[--i];) {
        recent.order.splice(i, 1);
        recent.size -= recent.data[url].size;
        delete recent.data[url];
      }
    }

    cleanCache(): void {
      var setting: SettingInterface = M.getActiveSetting(),
          recent: RecentInterface = this.APP_.recent;
      if (!setting || !recent) { return; }
      for (var i = recent.order.length, url; url = recent.order[--i];) {
        if (i >= setting.cache.limit || url in recent.data && new Date().getTime() > recent.data[url].expires) {
          recent.order.splice(i, 1);
          recent.size -= recent.data[url].size;
          delete recent.data[url];
        }
      }
    }

    getRequestDomain(): string {
      return M.requestHost;
    }

    setRequestDomain(host: string): any {
      return this.APP_.switchRequestServer(host.split('//').pop(), null);
    }

  }
  // 短縮登録
  export var Model = ModelMain;
  export var M = new Model();
}
