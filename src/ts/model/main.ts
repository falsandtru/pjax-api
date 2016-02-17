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

    isDeferrable: boolean = !!jQuery.when && '1.006' <= jQuery().jquery.match(/\d[\d.]+\d/).pop().replace(/\.(\d+)/g, '.00$1').replace(/0*(\d{3})/g, '$1')

    location: HTMLAnchorElement = document.createElement('a')
    host(): string { return this.app_.balancer.host() }
    state(): State { return this.state_; }
    
    main_($context: ExtensionInterface | ExtensionStaticInterface, option: PjaxSetting): ExtensionInterface | ExtensionStaticInterface {

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
        this.app_.initialize(<ExtensionInterface>$context, setting);
        this.state_ = this.state() === State.initiate ? State.open : this.state();
        this.overlay(setting, true);
      });

      return $context;
    }

    convertUrlToKey(unsafe_url: string, canonicalize?: boolean): string {
      unsafe_url = canonicalize ? this.util_.canonicalizeUrl(unsafe_url) : unsafe_url;
      return this.util_.trim(unsafe_url).split('#').shift();
    }

    compareKeyByUrl(a: string, b: string): boolean {
      a = this.convertUrlToKey(a, true);
      b = this.convertUrlToKey(b, true);
      return a === b;
    }

    comparePageByUrl(a: string, b: string): boolean {
      a = this.convertUrlToKey(a, true);
      b = this.convertUrlToKey(b, true);
      return a === b;
    }

    configure(destination: string | Event | HTMLAnchorElement | HTMLFormElement | Location): SettingInterface {
      return this.app_.configure(destination);
    }

    isOperatable(event: JQueryEventObject): boolean {
      if (State.open !== this.state()) { return false; }

      if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return false; }

      var setting: SettingInterface;
      switch (event.type.toLowerCase()) {
        case EVENT.CLICK:
          setting = this.app_.configure(<HTMLAnchorElement>event.currentTarget);
          if (setting && !jQuery(event.currentTarget).filter(<string>setting.filter).length) { return false; }
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

      switch (event.type.toLowerCase()) {
        case EVENT.CLICK:
          if (this.comparePageByUrl(setting.origLocation.href, setting.destLocation.href) && setting.destLocation.hash) { return false; }
          break;
        case EVENT.SUBMIT:
          break;
        case EVENT.POPSTATE:
          if (this.comparePageByUrl(setting.origLocation.href, setting.destLocation.href)) { return false; }
          break;
      }

      if (!this.app_.page.chooseArea(setting.area, document, document)) { return false; }

      return true;
    }

    getPageXHR(): JQueryXHR {
      return this.app_.page.pageXHR;
    }
    setPageXHR($xhr: JQueryXHR): JQueryXHR {
      this.app_.page.pageXHR && this.app_.page.pageXHR.readyState < 4 && this.app_.page.pageXHR !== $xhr && this.app_.page.pageXHR.abort();
      return this.app_.page.pageXHR = $xhr;
    }
    
    getDataXHR(): JQueryXHR[] {
      return this.app_.page.dataXHR;
    }
    setDataXHR($xhrs: JQueryXHR[]): JQueryXHR[] {
      $xhrs = $xhrs || [];
      const $reqs = this.app_.page.dataXHR;
      return this.app_.page.dataXHR = (<JQueryXHR[]>Array.apply(null, Array(Math.max($xhrs.length, this.app_.page.dataXHR.length))))
        .map((_, i) => swap(i))
        .filter($xhr => !!$xhr);

      function swap(i: number) {
        switch (true) {
          case i >= $reqs.length:
          case $reqs[i].readyState === 4:
          case $reqs.indexOf($xhrs[i]) > -1:
            return $xhrs[i];
        }
        $reqs[i].abort();
        return $xhrs[i];
      }
    }
    
    click(event: JQueryEventObject): void {
      event.timeStamp = new Date().getTime();
      var context = <HTMLAnchorElement>event.currentTarget,
          $context: JQuery = jQuery(context);
      var setting: SettingInterface = this.app_.configure(context);

      this.location.href = this.util_.normalizeUrl(window.location.href);

      switch (true) {
        case !setting:
        case event.isDefaultPrevented():
        case this.state() !== State.open:
          break;

        case this.isOperatable(event):
          this.app_.page.transfer(setting, event);
          event.preventDefault();
          break;

        case this.isHashChange(setting) && this.overlay(setting):
          event.preventDefault();
          window.history.pushState(null, document.title, setting.destLocation.href);
          break;

        case !event.originalEvent && !jQuery(document).has(context).length:
          // clickメソッド用
          this.fallback(event);
          break;
      }
    }

    submit(event: JQueryEventObject): void {
      event.timeStamp = new Date().getTime();
      var context = <HTMLFormElement>event.currentTarget,
          $context: JQuery = jQuery(context);
      var setting: SettingInterface = this.app_.configure(context);

      this.location.href = this.util_.normalizeUrl(window.location.href);
 
      switch (true) {
        case !setting:
        case event.isDefaultPrevented():
        case this.state() !== State.open:
          break;

        case this.isOperatable(event):
          this.app_.page.transfer(setting, event);
          event.preventDefault();
          break;

        case !event.originalEvent && !jQuery(document).has(context).length:
          // submitメソッド用
          this.fallback(event);
          break;
      }
    }

    popstate(event: JQueryEventObject): void {
      if (this.app_.page.landing && this.util_.compareUrl(this.app_.page.landing, window.location.href)) { return; }

      event.timeStamp = new Date().getTime();
      var setting: SettingInterface = this.app_.configure(window.location);

      switch (true) {
        case !setting:
          !this.comparePageByUrl(this.location.href, window.location.href) && this.fallback(event);
          break;

        //case event.isDefaultPrevented():
        case this.state() !== State.open:
          break;

        case this.isOperatable(event):
          this.app_.page.transfer(setting, event);
          break;
          
        case this.isHashChange(setting) && this.overlay(setting):
          break;

        case !this.comparePageByUrl(setting.origLocation.href, window.location.href):
          // pjax処理されないURL変更によるページ更新
          this.fallback(event);
          break;
      }
      this.location.href = this.util_.normalizeUrl(window.location.href);
    }
    
    private queue_: number[] = []
    scroll(event: JQueryEventObject, end: boolean): void {
      var id: number;
      while (id = this.queue_.shift()) { clearTimeout(id); }
      id = setTimeout(() => {
        while (id = this.queue_.shift()) { clearTimeout(id); }
        this.compareKeyByUrl(window.location.href, this.location.href) && this.app_.data.saveScrollPosition();
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
          this.movePageNormally_(event);
      }
    }

    private movePageNormally_(event: JQueryEventObject): void {
      switch (event.type.toLowerCase()) {
        case EVENT.CLICK:
          if (typeof (<HTMLAnchorElement>event.currentTarget).href === 'string') {
            window.location.assign((<HTMLAnchorElement>event.currentTarget).href);
          }
          else {
            window.location.assign((<HTMLAnchorElement>event.currentTarget).href['baseVal']);
          }
          break;
        case EVENT.SUBMIT:
          switch ((<HTMLFormElement>event.currentTarget).method.toUpperCase()) {
            case 'GET':
              window.location.assign((<HTMLFormElement>event.currentTarget).action.replace(/[?#].*/, '') + '?' + jQuery(event.currentTarget).serialize());
              break;
            case 'POST':
              window.location.assign((<HTMLFormElement>event.currentTarget).action);
              break;
          }
          break;
        case EVENT.POPSTATE:
          window.location.reload();
          break;
      }
    }

    isHashChange(setting: SettingInterface): boolean {
      return !!setting &&
             setting.origLocation.href.replace(/#.*/, '') === setting.destLocation.href.replace(/#.*/, '') &&
             setting.origLocation.hash !== setting.destLocation.hash;
    }

    overlay(setting: SettingInterface, immediate?: boolean): boolean {
      var hash = setting.destLocation.hash.replace(/^#/, '');
      if (!hash || !setting.overlay) { return false; }

      var $hashTargetElement = jQuery('#' + hash + ', [name~=' + hash + ']');
      $hashTargetElement = $hashTargetElement.add($hashTargetElement.nextUntil(':header'));
      $hashTargetElement = $hashTargetElement.filter(setting.overlay).add($hashTargetElement.find(setting.overlay)).first();
      if (!$hashTargetElement.length) { return false; }

      if (this.isHashChange(setting)) {
        this.app_.data.loadScrollPosition();
        setTimeout(() => this.app_.data.loadScrollPosition(), 1);
      }

      var $container = jQuery('<div>');
      $hashTargetElement = $hashTargetElement.clone(true);
      $container
      .addClass(setting.nss.elem + '-overlay')
      .css({
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        border: 'none',
      })
      .append($hashTargetElement.css({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto'
      }).show());

      $container.bind('click', $container, (event) => {
        if (event.target !== event.currentTarget) { return; }
        window.history.pushState(window.history.state, document.title, window.location.href.replace(/#.*/, ''));
        this.location.href = this.util_.normalizeUrl(window.location.href);
        jQuery(event.data).fadeOut('fast', () => jQuery(event.data).remove());
      });

      $container.appendTo('body').fadeIn(immediate ? 0 : 100);
      jQuery(window).one('popstate', $container, (event: JQueryEventObject) => {
        setTimeout(() => this.app_.data.loadScrollPosition(), 1);
        jQuery(event.data).fadeOut('fast', () => jQuery(event.data).remove());
      });
      /trident/i.test(window.navigator.userAgent) && $hashTargetElement.width($hashTargetElement.width());
      this.app_.data.saveScrollPosition();

      return true;
    }

    enable(): void {
      this.state_ = State.open;
    }

    disable(): void {
      this.state_ = State.pause;
    }

    getCache(unsafe_url: string): CacheInterface {
      var setting: SettingInterface = this.configure(this.convertUrlToKey(unsafe_url));
      if (!setting) { return; }
      var record: PageRecordInterface = this.app_.page.provider.getRecord(setting);
      return record.state(setting) || record.data.data() ? {
        data: record.data.data(),
        textStatus: record.data.textStatus(),
        jqXHR: record.data.jqXHR(),
        expires: record.data.expires(),
        host: record.data.host()
      } : void this.removeCache(unsafe_url);
    }
    
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR): void {
      var setting: SettingInterface = this.configure(this.convertUrlToKey(unsafe_url));
      if (!setting) { return; }
      var record: PageRecordInterface = this.app_.page.provider.getRecord(setting);
      this.app_.page.provider.setRecord(setting,
                                        data || '',
                                        textStatus || record.data.textStatus(),
                                        jqXHR || record.data.jqXHR(),
                                        this.app_.balancer.sanitize(jqXHR, setting) || record.data.host() || '',
                                        null);
    }

    removeCache(unsafe_url: string): void {
      var setting: SettingInterface = this.configure(this.convertUrlToKey(unsafe_url));
      if (!setting) { return; }
      this.app_.page.provider.removeRecord(setting);
    }

    clearCache(): void {
      this.app_.page.provider.clearRecord();
    }

    bypass(): JQueryDeferred<any> {
      return this.app_.balancer.bypass(this.app_.configure(window.location));
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
