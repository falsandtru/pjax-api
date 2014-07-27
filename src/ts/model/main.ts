/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class Main extends Template implements ModelInterface {

    controller_: ControllerInterface = new CONTROLLER.Main(this)
    app_: ModelAppInterface = new MODEL.App(this, this.controller_)
    state_: State = State.wait

    isDeferrable: boolean = jQuery.when && 1.06 <= Number(jQuery().jquery.replace(/\D*(\d+)\.(\d+).*$/, '$1.0$2').replace(/\d+(\d{2})$/, '$1'))
    requestHost: string = ''

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

      var setting: SettingInterface = this.app_.configure(<SettingInterface>option, window.location.href, window.location.href);
      this.setActiveSetting(setting);
      setting.database && this.app_.DATA.opendb(setting);

      this.app_.stock({
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
          this.app_.registrate($context, setting);
          this.state_ = this.state() === State.wait ? State.ready : this.state();
        });
      }

      return $context;
    }

    state(): State { return this.state_; }

    convertUrlToKeyUrl(unsafe_url: string): string {
      return unsafe_url.replace(/#.*/, '')
    }

    isImmediateLoadable(unsafe_url: string, setting?: SettingInterface): boolean
    isImmediateLoadable(event: JQueryEventObject, setting?: SettingInterface): boolean
    isImmediateLoadable(param: any, setting?: SettingInterface): boolean {
      if (State.ready !== this.state()) { return; }

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

      setting = setting || this.app_.configure(this.getActiveSetting(), origLocation.href, destLocation.href);
      if (setting.disable) { return; }
      if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) { return false; }
      if (!this.app_.chooseArea(setting.area, document, document)) { return false; }
      if (!jQuery(event.currentTarget).filter(setting.filter).length) { return false; }

      return true;
    }

    getActiveSetting(): SettingInterface {
      return this.app_.activeSetting;
    }
    setActiveSetting(setting: SettingInterface): SettingInterface {
      return this.app_.activeSetting = setting;
    }

    getActiveXHR(): JQueryXHR {
      return this.app_.activeXHR;
    }
    setActiveXHR(xhr: JQueryXHR): JQueryXHR {
      this.app_.activeXHR && this.app_.activeXHR.readyState < 4 && this.app_.activeXHR.abort();
      return this.app_.activeXHR = xhr;
    }

    CLICK(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLAnchorElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = this.app_.configure(this.getActiveSetting(), window.location.href, context.href);

        if (State.ready !== this.state() || setting.disable || event.isDefaultPrevented()) { break PROCESS; }
        if (!this.isImmediateLoadable(event, setting)) { break PROCESS; }

        if (setting.cache.mix && this.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.database && this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = this.getCache(setting.destLocation.href); }

        new this.app_.Update(this, this.app_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && this.fallback(event, setting);
    }

    SUBMIT(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLFormElement>event.currentTarget,
            $context: ContextInterface = jQuery(context);
        var setting: SettingInterface = this.app_.configure(this.getActiveSetting(), window.location.href, context.action);

        if (State.ready !== this.state() || setting.disable || event.isDefaultPrevented()) { break PROCESS; }
        if (!this.isImmediateLoadable(event, setting)) { break PROCESS; }

        var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
        setting.destLocation.href = UTIL.canonicalizeUrl(serializedURL);
        if (setting.cache.mix && this.getCache(setting.destLocation.href)) { break PROCESS; }
        setting.database && this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) { cache = this.getCache(setting.destLocation.href); }

        new this.app_.Update(this, this.app_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
        event.preventDefault();
        return;
      };
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && this.fallback(event, setting);
    }

    POPSTATE(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var setting: SettingInterface = this.app_.configure(this.getActiveSetting(), null, window.location.href);
        if (this.app_.landing && this.app_.landing === UTIL.canonicalizeUrl(window.location.href)) { return; }
        if (setting.origLocation.href === setting.destLocation.href) { return; }

        if (State.ready !== this.state() || setting.disable) { break PROCESS; }
        if (!this.isImmediateLoadable(event, setting)) { break PROCESS; }

        if (setting.origLocation.hash !== setting.destLocation.hash &&
            setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
          break PROCESS;
        }
        
        setting.database && setting.fix.history && this.app_.DATA.loadTitleFromDB(setting.destLocation.href);

        var cache: CacheInterface;
        if (setting.cache[event.type.toLowerCase()]) { cache = this.getCache(setting.destLocation.href); }

        new this.app_.Update(this, this.app_, setting, event, false, cache);
        return;
      };
      (!event.originalEvent || setting.gns === event.namespace) && this.fallback(event, setting);
    }

    SCROLL(event: JQueryEventObject, end: boolean): void {
      var setting: SettingInterface = this.getActiveSetting();
      if (State.ready !== this.state() || event.isDefaultPrevented()) { return; }

      if (!setting.scroll.delay) {
        this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
      } else {
        var id: number;
        while (id = setting.scroll.queue.shift()) { clearTimeout(id); }
        id = setTimeout(() => {
          while (id = setting.scroll.queue.shift()) { clearTimeout(id); }
          this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
        }, setting.scroll.delay);
        setting.scroll.queue.push(id);
      }
    }

    fallback(event: JQueryEventObject, setting: SettingInterface): void {
      if ('function' === typeof setting.fallback) {
        UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
      } else {
        this.app_.movePageNormally(event);
      }
    }

    enable(): void {
      this.state_ = State.ready;
    }

    disable(): void {
      this.state_ = State.lock;
    }

    getCache(unsafe_url: string): CacheInterface {
      var setting: SettingInterface = this.getActiveSetting(),
          recent: RecentInterface = this.app_.recent;
      if (!setting || !recent) { return null; }

      var secure_url: string = this.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && this.removeCache(secure_url);
      recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && this.removeCache(secure_url);
      return recent.data[secure_url];
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR, host?: string): any {
      var setting: SettingInterface = this.getActiveSetting(),
          recent: RecentInterface = this.app_.recent;
      if (!setting || !recent) { return this; }
      var cache: CacheInterface,
          size: number,
          timeStamp: number,
          expires: number;

      var secure_url: string = this.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.order.unshift(secure_url);
      for (var i = 1, key; key = recent.order[i]; i++) { if (secure_url === key) { recent.order.splice(i, 1); } }

      recent.size > setting.cache.size && this.cleanCache();
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

        age = jqXHR && this.app_.calAge(jqXHR) || Number(setting.cache.expires);

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
        this.removeCache(secure_url);
      }
      if (jqXHR || cache && cache.jqXHR) {
        var title: string = ((jqXHR || cache && cache.jqXHR).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
        setting.database && setting.fix.history && this.app_.DATA.saveTitleToDB(secure_url, title);
      }
    }
    
    removeCache(unsafe_url: string): void {
      var setting: SettingInterface = this.getActiveSetting(),
          recent: RecentInterface = this.app_.recent;
      if (!setting || !recent) { return; }

      var secure_url: string = this.convertUrlToKeyUrl(UTIL.canonicalizeUrl(unsafe_url));
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
      var setting: SettingInterface = this.getActiveSetting(),
          recent: RecentInterface = this.app_.recent;
      if (!setting || !recent) { return; }
      for (var i = recent.order.length, url; url = recent.order[--i];) {
        recent.order.splice(i, 1);
        recent.size -= recent.data[url].size;
        delete recent.data[url];
      }
    }

    cleanCache(): void {
      var setting: SettingInterface = this.getActiveSetting(),
          recent: RecentInterface = this.app_.recent;
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
      return this.requestHost;
    }

    setRequestDomain(host: string): any {
      return this.app_.switchRequestServer(host.split('//').pop(), null);
    }

  }

}
