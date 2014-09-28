/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class Main extends Template implements ModelInterface {

    controller_: ControllerInterface = new Controller(this)
    app_: AppLayerInterface = new MODEL.App(this, this.controller_)

    state_: State = State.wait

    isDeferrable: boolean = jQuery.when && 1.06 <= Number(jQuery().jquery.replace(/\D*(\d+)\.(\d+).*$/, '$1.0$2').replace(/\d+(\d{2})$/, '$1'))
    queue: number[] = []

    host(): string { return this.app_.balance.host() }
    state(): State { return this.state_; }

    main_($context: JQuery, option: PjaxSetting): JQuery {

      if (!option && $context.is('a, form')) { return $context; }

      var pattern;
      pattern = $context instanceof NAMESPACE ? 'm:' : 'f:';
      pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
      switch (pattern.toLowerCase()) {
        case 'm:object':
          break;
        case 'm:undefined':
          option = <PjaxSetting>{};
          break;
        default:
          return $context;
      }

      var setting: SettingInterface = this.app_.configure(<SettingInterface>option, window.location.href, window.location.href);
      this.setGlobalSetting(setting);
      setting.database && this.app_.data.opendb(setting);

      this.stock({
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
          this.app_.initialize($context, setting);
          this.state_ = this.state() === State.wait ? State.ready : this.state();
        });
      }

      return $context;
    }

    convertUrlToKeyUrl(unsafe_url: string): string {
      return unsafe_url.replace(/#.*/, '')
    }

    isImmediateLoadable(unsafe_url: string, setting?: SettingInterface): boolean
    isImmediateLoadable(event: JQueryEventObject, setting?: SettingInterface): boolean
    isImmediateLoadable(param: any, setting?: SettingInterface): boolean {
      if (State.ready !== this.state()) { return; }

      var origURL: string = Util.normalizeUrl(window.location.href),
          destURL: string,
          event: JQueryEventObject;
      switch (typeof param) {
        case 'string':
          event = null;
          destURL = Util.normalizeUrl(param);
          break;
        case 'object':
          event = param;
          switch (event.type.toLowerCase()) {
            case 'click':
              destURL = Util.normalizeUrl((<HTMLAnchorElement>event.currentTarget).href);
              break;
            case 'submit':
              destURL = Util.normalizeUrl((<HTMLFormElement>event.currentTarget).action);
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

      setting = setting || this.app_.configure(this.getGlobalSetting(), origLocation.href, destLocation.href);
      if (setting.cancel) { return; }
      if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) { return false; }
      if (!this.app_.page.chooseArea(setting.area, document, document)) { return false; }
      if (!jQuery(event.currentTarget).filter(setting.filter).length) { return false; }

      return true;
    }

    getGlobalSetting(): SettingInterface {
      return this.app_.page.globalSetting;
    }
    setGlobalSetting(setting: SettingInterface): SettingInterface {
      return this.app_.page.globalSetting = setting;
    }

    getGlobalXHR(): JQueryXHR {
      return this.app_.page.globalXHR;
    }
    setGlobalXHR(xhr: JQueryXHR): JQueryXHR {
      this.app_.page.globalXHR && this.app_.page.globalXHR.readyState < 4 && this.app_.page.globalXHR.abort();
      return this.app_.page.globalXHR = xhr;
    }

    CLICK(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLAnchorElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = this.app_.configure(this.getGlobalSetting(), window.location.href, context.href);

        if (State.ready !== this.state() || setting.cancel || event.isDefaultPrevented()) { break PROCESS; }
        if (!this.isImmediateLoadable(event, setting)) { break PROCESS; }

        if (setting.cache.mix && this.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.database && this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = this.getCache(setting.destLocation.href); }

        this.app_.page.transfer(setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      // clickメソッド用
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event, setting);
    }

    SUBMIT(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLFormElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = this.app_.configure(this.getGlobalSetting(), window.location.href, context.action);

        if (State.ready !== this.state() || setting.cancel || event.isDefaultPrevented()) { break PROCESS; }
        if (!this.isImmediateLoadable(event, setting)) { break PROCESS; }

        var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
        setting.destLocation.href = Util.normalizeUrl(serializedURL);
        if (setting.cache.mix && this.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.database && this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) { cache = this.getCache(setting.destLocation.href); }

      this.app_.page.transfer(setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      // submitメソッド用
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event, setting);
    }

    POPSTATE(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var setting: SettingInterface = this.app_.configure(this.getGlobalSetting(), null, window.location.href);
        if (this.app_.page.landing && this.app_.page.landing === Util.normalizeUrl(window.location.href)) { return; }
        if (setting.origLocation.href === setting.destLocation.href) { return; }

        if (State.ready !== this.state() || setting.cancel) { break PROCESS; }
        if (!this.isImmediateLoadable(event, setting)) { break PROCESS; }

        if (setting.origLocation.hash !== setting.destLocation.hash &&
            setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
          break PROCESS;
        }
        
        setting.database && setting.fix.history && this.app_.data.loadTitleFromDB(setting.destLocation.href);

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = this.getCache(setting.destLocation.href); }

        this.app_.page.transfer(setting, event, false, cache);
        return;
      };
    }

    SCROLL(event: JQueryEventObject, end: boolean): void {
      var setting: SettingInterface = this.getGlobalSetting();
      if (State.ready !== this.state() || event.isDefaultPrevented()) { return; }

      if (!setting.scroll.delay) {
        this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
      } else {
        var id: number;
        while (id = this.queue.shift()) { clearTimeout(id); }
        id = setTimeout(() => {
          while (id = this.queue.shift()) { clearTimeout(id); }
          this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        }, setting.scroll.delay);
        this.queue.push(id);
      }
    }

    fallback(event: JQueryEventObject, setting: SettingInterface): void {
      switch (true) {
        case !setting.fallback:
        case false === Util.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]):
          break;
        default:
          this.app_.page.movePageNormally(event);
      }
    }

    enable(): void {
      this.state_ = State.ready;
    }

    disable(): void {
      this.state_ = State.lock;
    }

    getCache(unsafe_url: string): CacheInterface {
      var setting: SettingInterface = this.getGlobalSetting(),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return null; }

      var secure_url: string = this.convertUrlToKeyUrl(Util.normalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && this.removeCache(secure_url);
      recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && this.removeCache(secure_url);
      return recent.data[secure_url];
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR, host?: string): any {
      var setting: SettingInterface = this.getGlobalSetting(),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return this; }

      var cache: CacheInterface,
          size: number,
          timeStamp: number,
          expires: number;

      var secure_url: string = this.convertUrlToKeyUrl(Util.normalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.order.unshift(secure_url);
      for (var i = 1, key; key = recent.order[i]; i++) { if (secure_url === key) { recent.order.splice(i, 1); } }

      if (setting.cache.limit && recent.order.length > setting.cache.limit || setting.cache.size && recent.size > setting.cache.size) {
        this.cleanCache();
      }

      cache = this.getCache(secure_url);
      if (!data && !jqXHR && (!cache || !cache.data && !cache.jqXHR)) { return; }

      var html: string = (jqXHR || <XMLHttpRequest>{}).responseText || '';
      size = parseInt(html.length * 1.8 + '' || 1024 * 1024 + '', 10);
      timeStamp = new Date().getTime();
      expires = ((timeStamp: number): number => {
        var expires = setting.cache.expires,
            age: any;
        if (!setting.cache.expires) { return 0; }
        if (recent.data[secure_url] && !jqXHR) { return recent.data[secure_url].expires; }

        age = jqXHR && this.app_.page.calAge(jqXHR) || Number(setting.cache.expires);

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
          size: size,
          expires: expires,
          host: host || '',
          timeStamp: timeStamp
        }
        );
      if (!recent.data[secure_url].data && !recent.data[secure_url].jqXHR) {
        this.removeCache(secure_url);
      }
      if (jqXHR || cache && cache.jqXHR) {
        var title: string = ((jqXHR || cache && cache.jqXHR).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
        setting.database && setting.fix.history && this.app_.data.saveTitleToDB(secure_url, title);
      }
    }

    removeCache(unsafe_url: string): void
    removeCache(index: number): void
    removeCache(param: any): void {
      var setting: SettingInterface = this.getGlobalSetting(),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return; }

      switch (typeof param) {
        case 'string':
          var secure_url: string = this.convertUrlToKeyUrl(Util.normalizeUrl(param));
          param = null;

          for (var i = 0, key: string; key = recent.order[i]; i++) {
            if (secure_url === key) {
              this.removeCache(i);
              break;
            }
          }
          break;

        case 'number':
          var i: number = param,
              key: string = recent.order[i];
          recent.order.splice(i, 1);
          recent.size -= recent.data[key].size;
          recent.data[key] = null;
          delete recent.data[key];
          break;
      }
    }

    clearCache(): void {
      var setting: SettingInterface = this.getGlobalSetting(),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return; }

      while (recent.order.length) {
        this.removeCache(~-recent.order.length);
      }
    }

    cleanCache(): void {
      var setting: SettingInterface = this.getGlobalSetting(),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return; }

      for (var i = recent.order.length, now = new Date().getTime(), url: string; url = recent.order[--i];) {
        if (now > recent.data[url].expires) {
          this.removeCache(url);
        }
      }
      while (setting.cache.limit && recent.order.length > setting.cache.limit || setting.cache.size && recent.size > setting.cache.size) {
        this.removeCache(~-recent.order.length);
      }
    }

    getRequestDomain(): string {
      return this.host();
    }

    setRequestDomain(host: string): any {
      return this.app_.balance.changeServer(host.split('//').pop(), null);
    }

  }
  
  export var Util = LIBRARY.Utility

}

module MODULE {
  export var Model = MODEL.Main
}
