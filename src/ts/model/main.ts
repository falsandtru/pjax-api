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

    constructor() {
      super(State.initiate);
    }

    private controller_: ControllerInterface = new Controller(this).singleton()
    private app_: AppLayerInterface = new MODEL.App(this, this.controller_)
    private util_ = LIBRARY.Utility

    private getRequestDomain(): string {
      return this.host();
    }
    private setRequestDomain(host: string): any {
      return this.app_.balance.changeServer(host.split('//').pop(), null);
    }

    isDeferrable: boolean = !!jQuery.when && '1.006' <= jQuery().jquery.match(/\d[\d.]+\d/).pop().replace(/\.(\d+)/g, '.00$1').replace(/0*(\d{3})/g, '$1')

    location: HTMLAnchorElement = document.createElement('a')
    host(): string { return this.app_.balance.host() }
    state(): State { return this.state_; }
    
    main_($context: ExtensionInterface, setting: PjaxSetting): ExtensionInterface
    main_($context: ExtensionStaticInterface, setting: PjaxSetting): ExtensionStaticInterface
    main_($context: any, option: any): any {

      switch (typeof option) {
        case 'object':
          $context = $context instanceof DEF.NAMESPACE ? $context : jQuery(document)[DEF.NAME]();
          FREEZE(option, true);
          break;

        default:
          return $context;
      }

      if (!window.history || !window.history['pushState'] || !window.history['replaceState']) { return $context; }

      this.location.href = this.util_.normalizeUrl(window.location.href);

      var setting: SettingInterface = this.app_.configure(<PjaxSetting>option);
      if (!setting) { return $context; }

      this.app_.data.connect(setting);

      this.speed = {
        fire: 0,
        time: [],
        name: [],
        now: function () { return new Date().getTime(); }
      };

      jQuery(() => {
        this.app_.initialize($context, setting);
        this.state_ = this.state() === State.initiate ? State.open : this.state();
      });

      return $context;
    }

    convertUrlToKeyUrl(unsafe_url: string): string {
      return unsafe_url.replace(/#.*/, '')
    }

    configure(event: Event): SettingInterface
    configure(destination: HTMLAnchorElement): SettingInterface
    configure(destination: HTMLFormElement): SettingInterface
    configure(destination: Location): SettingInterface
    configure(destination: any): SettingInterface {
      return this.app_.configure(destination);
    }

    isAvailable(event: JQueryEventObject): boolean {
      if (State.open !== this.state()) { return false; }

      if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return false; }

      var setting: SettingInterface;
      switch (event.type.toLowerCase()) {
        case EVENT.CLICK:
          setting = this.app_.configure(<HTMLAnchorElement>event.currentTarget);
          if (setting && !jQuery(event.currentTarget).filter(setting.filter).length) { return false; }
          break;
        case EVENT.SUBMIT:
          setting = this.app_.configure(<HTMLFormElement>event.currentTarget);
          break;
        case EVENT.POPSTATE:
          setting = this.app_.configure(window.location);
          break;
      }

      if (!setting) { return false; }

      if (setting.origLocation.protocol !== setting.destLocation.protocol || setting.origLocation.host !== setting.destLocation.host) { return false; }

      if (setting.destLocation.hash && setting.origLocation.href.replace(/#.*/, '') === setting.destLocation.href.replace(/#.*/, '')) { return false; }
      if (!this.app_.page.chooseArea(setting.area, document, document)) { return false; }

      return true;
    }

    getXHR(): JQueryXHR {
      return this.app_.page.xhr;
    }
    setXHR(xhr: JQueryXHR): JQueryXHR {
      this.app_.page.xhr && this.app_.page.xhr.readyState < 4 && this.app_.page.xhr.abort();
      return this.app_.page.xhr = xhr;
    }

    click(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLAnchorElement>event.currentTarget,
            $context: JQuery = jQuery(context);
        var setting: SettingInterface = this.app_.configure(context);
        
        switch (false) {
          case !event.isDefaultPrevented():
          case !!setting:
          case this.state() === State.open:
          case this.isAvailable(event):
            break PROCESS;
        }
        
        this.app_.page.transfer(setting, event);
        event.preventDefault();
        return;
      };
      // clickメソッド用
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event);
    }

    submit(event: JQueryEventObject): void {
      PROCESS: {
        event.timeStamp = new Date().getTime();
        var context = <HTMLFormElement>event.currentTarget,
            $context: JQuery = jQuery(context);
        var setting: SettingInterface = this.app_.configure(context);
        
        switch (false) {
          case !event.isDefaultPrevented():
          case !!setting:
          case this.state() === State.open:
          case this.isAvailable(event):
            break PROCESS;
        }
        
        this.app_.page.transfer(setting, event);
        event.preventDefault();
        return;
      };
      // submitメソッド用
      !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event);
    }

    popstate(event: JQueryEventObject): void {
      PROCESS: {
        if (this.app_.page.landing && this.app_.page.landing === this.util_.normalizeUrl(window.location.href)) { return; }
        if (this.location.href === this.util_.normalizeUrl(window.location.href)) { return; }
        
        event.timeStamp = new Date().getTime();
        var setting: SettingInterface = this.app_.configure(window.location);
        
        if (setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) { return; }
        
        switch (false) {
          //case !event.isDefaultPrevented():
          case !!setting:
          case this.state() === State.open:
          case this.isAvailable(event):
            break PROCESS;
        }
        
        this.app_.page.transfer(setting, event);
        return;
      };
      // pjax処理されないURL変更によるページ更新
      this.fallback(event);
    }
    
    private queue_: number[] = []
    scroll(event: JQueryEventObject, end: boolean): void {
      var id: number;
      while (id = this.queue_.shift()) { clearTimeout(id); }
      id = setTimeout(() => {
        while (id = this.queue_.shift()) { clearTimeout(id); }
        this.util_.compareUrl(window.location.href, this.location.href) && this.app_.data.saveScrollPosition();
      }, 300);
      this.queue_.push(id);
    }

    fallback(event: JQueryEventObject): void {
      var setting: SettingInterface = this.configure(event);
      switch (true) {
        case setting && !setting.fallback:
        case setting && false === this.util_.fire(setting.fallback, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]):
          break;
        default:
          this.app_.page.movePageNormally(event);
      }
    }

    enable(): void {
      this.state_ = State.open;
    }

    disable(): void {
      this.state_ = State.pause;
    }

    getCache(unsafe_url: string): CacheInterface {
      var setting: SettingInterface = this.configure(window.location),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return null; }

      var secure_url: string = this.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
      unsafe_url = null;

      recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && this.removeCache(secure_url);
      recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && this.removeCache(secure_url);
      return recent.data[secure_url];
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR, host?: string): any {
      var setting: SettingInterface = this.configure(window.location),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return this; }

      var cache: CacheInterface,
          size: number,
          timeStamp: number,
          expires: number;

      var secure_url: string = this.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
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

        age = jqXHR && this.calAge_(jqXHR) || 0;

        age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.min ? Math.max(setting.cache.expires.min, age) : age;
        age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.max ? Math.min(setting.cache.expires.max, age) : age;
        age = Math.max(age, 0) || 0;
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
        setting.fix.history && this.app_.data.saveTitle(secure_url, title);
        this.app_.data.saveExpires(setting.destLocation.href, host, this.calExpires_(jqXHR || cache && cache.jqXHR));
      }
    }

    removeCache(unsafe_url: string): void
    removeCache(index: number): void
    removeCache(param: any): void {
      var setting: SettingInterface = this.configure(window.location),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return; }

      switch (typeof param) {
        case 'string':
          var secure_url: string = this.convertUrlToKeyUrl(this.util_.normalizeUrl(param));
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
      var setting: SettingInterface = this.configure(window.location),
          recent: RecentInterface = this.app_.page.recent;
      if (!setting || !recent) { return; }

      while (recent.order.length) {
        this.removeCache(~-recent.order.length);
      }
    }

    cleanCache(): void {
      var setting: SettingInterface = this.configure(window.location),
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

    private calAge_(jqXHR: JQueryXHR): number {
      var age: any;

      switch (true) {
        case /no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control')):
          return 0;
        case jqXHR.getResponseHeader('Cache-Control') && !!~jqXHR.getResponseHeader('Cache-Control').indexOf('max-age='):
          return Number(jqXHR.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop()) * 1000;
        case !!jqXHR.getResponseHeader('Expires'):
          return new Date(jqXHR.getResponseHeader('Expires')).getTime() - new Date().getTime();
        default:
          return 0;
      }
    }

    private calExpires_(jqXHR: JQueryXHR): number {
      return new Date().getTime() + this.calAge_(jqXHR);
    }
    
    speed: any

  }

  export class Singleton {

    constructor() {
      Singleton.instance_ = Singleton.instance_ || new Main();
    }

    private static instance_: Main

    static singleton(): Main {
      return Singleton.instance_;
    }

    singleton(): Main {
      return Singleton.singleton();
    }

  }

}

module MODULE {
  export var Model = MODEL.Singleton
}
