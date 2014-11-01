/// <reference path="../define.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  var Util = LIBRARY.Utility

  export class PageUpdate implements PageUpdateInterface {
    
    constructor(

    private model_: ModelInterface,
    private app_: AppLayerInterface,
    private setting_: SettingInterface,
    private event_: JQueryEventObject,
    private register_: boolean,
    private cache_: CacheInterface,
    private data_: string,
    private textStatus_: string,
    private jqXHR_: JQueryXHR,
    private errorThrown_: string,
    private host_: string,
    private count_: number,
    private time_: number
    ) {
      this.main_();
    }

    private srcDocument_: Document
    private dstDocument_: Document
    private loadwaits_: JQueryDeferred<any[]>[] = []

    private main_(): void {
      var that = this,
          app = this.app_,
          setting = this.setting_,
          event = this.event_,
          register = this.register_,
          cache = this.cache_;

      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          register: boolean = this.register_,
          data: string = this.data_,
          textStatus: string = this.textStatus_,
          jqXHR: JQueryXHR = this.jqXHR_;
      var callbacks_update = setting.callbacks.update;

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');
      
      UPDATE: {
        setting.loadtime = setting.loadtime && new Date().getTime() - setting.loadtime;
        setting.loadtime = setting.loadtime < 100 ? 0 : setting.loadtime;
        
        if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
          return this.model_.fallback(event);
        }
        
        /* variable initialization */
        
        try {
          app.page.landing = null;
          if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }
          
          /* variable define */
          this.srcDocument_ = this.createHTMLDocument(jqXHR.responseText, setting.destLocation.href);
          this.dstDocument_ = document;
            
          // 更新範囲を選出
          setting.area = this.chooseArea(setting.area, this.srcDocument_, this.dstDocument_);
          if (!setting.area) { throw new Error('throw: area notfound'); }
          // 更新範囲をセレクタごとに分割
          setting.areas = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
          // キャッシュを設定
          if (this.isCacheUsable_(setting, event)) {
            this.model_.setCache(setting.destLocation.href, cache && cache.data || null, this.textStatus_, this.jqXHR_);
            cache = this.model_.getCache(setting.destLocation.href);
            this.cache_ = cache;
          }
          
          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');
          
          this.checkRedirect_();
          
          this.dispatchEvent(window, DEF.NAME + ':unload', false, true);
          
          this.updateUrl_();
          
          this.updateDocument_();
          
        } catch (err) {
          if (!err) { return; }

          this.cache_ &&
          this.model_.removeCache(setting.destLocation.href);

          this.model_.fallback(event);
        };
      }; // label: UPDATE
    }

    private isCacheUsable_(setting: SettingInterface, event: JQueryEventObject): boolean {
      switch (true) {
        case !setting.cache.click && !setting.cache.submit && !setting.cache.popstate:
        case 'submit' === event.type.toLowerCase() && !setting.cache[(<HTMLFormElement>event.currentTarget).method.toLowerCase()]:
          return false;
        default:
          return true;
      }
    }

    private checkRedirect_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          register: boolean = this.register_;
      var callbacks_update = setting.callbacks.update;

      if (!jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_).length) { return; }

      if (Util.fire(callbacks_update.redirect.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; };

      var redirect = <HTMLAnchorElement>setting.destLocation.cloneNode();
      redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
      switch (true) {
        case !setting.redirect:
        case redirect.protocol !== setting.destLocation.protocol:
        case redirect.host !== setting.destLocation.host:
        case 'submit' === event.type.toLowerCase() && 'GET' !== (<HTMLFormElement>event.currentTarget).method.toUpperCase():
          switch (event.type.toLowerCase()) {
            case 'click':
            case 'submit':
              window.location.assign(redirect.href);
              break;
            case 'popstate':
              window.location.replace(redirect.href);
              break;
          }
          throw false;

        default:
          jQuery[DEF.NAME].enable();
          switch (event.type.toLowerCase()) {
            case 'click':
            case 'submit':
              setTimeout(() => jQuery[DEF.NAME].click(redirect.href), 0);
              break;
            case 'popstate':
              window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
              if (register && setting.fix.location && !Util.compareUrl(setting.destLocation.href, Util.normalizeUrl(window.location.href))) {
                jQuery[DEF.NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[DEF.NAME].enable();
              }
              setTimeout(() => this.dispatchEvent(window, 'popstate', false, false), 0);
              break;
          }
          throw false;
      }

      if (Util.fire(callbacks_update.redirect.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }
    
    private updateUrl_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          register: boolean = this.register_;
      var callbacks_update = setting.callbacks.update;

      this.model_.location.href = setting.destLocation.href;

      if (Util.fire(callbacks_update.url.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; };

      register &&
      window.history.pushState(Util.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]),
                               ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title,
                               setting.destLocation.href);

      if (register && setting.fix.location && !Util.compareUrl(setting.destLocation.href, Util.normalizeUrl(window.location.href))) {
        jQuery[DEF.NAME].disable();
        window.history.back();
        window.history.forward();
        jQuery[DEF.NAME].enable();
      }

      // verify
      if (Util.compareUrl(setting.destLocation.href, Util.normalizeUrl(window.location.href))) {
        setting.retriable = true;
      } else if (setting.retriable) {
        setting.retriable = false;
        setting.destLocation.href = Util.normalizeUrl(window.location.href);
        new PageUpdate(this.model_, this.app_, setting, event, false, setting.cache[event.type.toLowerCase()] && this.model_.getCache(setting.destLocation.href), this.data_, this.textStatus_, this.jqXHR_, this.errorThrown_, this.host_, this.count_, this.time_);
        throw false;
      } else {
        throw new Error('throw: location mismatch');
      }

      if (Util.fire(callbacks_update.url.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }
    
    private updateDocument_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      this.overwriteDocumentByCache_();

      setting.fix.noscript &&
      this.escapeNoscript_(this.srcDocument_);

      this.rewrite_();

      this.title_();
      this.head_();

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

      this.area_();

      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

      this.balance_();

      this.css_('link[rel~="stylesheet"], style');
      jQuery(window)
      .one(DEF.NAME + ':rendering', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        var onready = (callback?: () => void) => {
          this.dispatchEvent(document, DEF.NAME + ':ready', false, true);

          Util.fire(setting.callback, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]);

          return jQuery.when ? this.waitRender_(jQuery.Deferred().resolve) : this.waitRender_(callback);
        };

        var onrender = (callback?: () => void) => {
          setTimeout(() => {
            this.app_.page.isScrollPosSavable = true;
            if ('popstate' !== event.type.toLowerCase()) {
              this.scrollByHash_(setting.destLocation.hash) || this.scroll_(true);
            } else {
              this.scroll_(true);
            }
          }, 100);

          this.dispatchEvent(document, DEF.NAME + ':render', false, true);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');

          return jQuery.when ? jQuery.when.apply(jQuery, this.loadwaits_) : callback();
        };

        var onload = () => {
          this.dispatchEvent(window, DEF.NAME + ':load', false, true);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

          speedcheck && console.log(speed.time);
          speedcheck && console.log(speed.name);

          this.script_('[src][defer]');

          // 未定義を返すとエラー
          return jQuery.when && jQuery.Deferred();
        };

        this.scroll_(false);

        if (100 > setting.loadtime && setting.reset.type.match(event.type.toLowerCase()) && !jQuery('form[method][method!="GET"]').length) {
          switch (false) {
            case this.count_ < setting.reset.count || !setting.reset.count:
            case new Date().getTime() < setting.reset.time + this.time_ || !setting.reset.time:
              throw new Error('throw: reset');
          }
        }

        var scriptwaits = this.script_(':not([defer]), :not([src])');

        if (jQuery.when) {
          // 1.7.2のthenは壊れてるのでpipe
          var then = jQuery.Deferred().pipe ? 'pipe' : 'then';
          jQuery.when.apply(jQuery, scriptwaits)
          [then](() => onready() , () => onready())
          [then](() => onrender(), () => onrender())
          [then](() => onload()  , () => onload());
        } else {
          onready(() => onrender(() => onload()));
        }
      })
      .trigger(DEF.NAME + ':rendering');
    }
    
    private overwriteDocumentByCache_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          cache: CacheInterface = this.cache_;

      if (!this.isCacheUsable_(setting, event)) { return; }

      if (cache && cache.data) {
        var html: string = setting.fix.noscript ? this.restoreNoscript_(cache.data) : cache.data,
            cacheDocument: Document = this.createHTMLDocument(html, setting.destLocation.href),
            srcDocument: Document = this.srcDocument_;

        srcDocument.title = cacheDocument.title;

        var $srcAreas: JQuery,
            $dstAreas: JQuery;
        for (var i = 0; setting.areas[i]; i++) {
          $srcAreas = jQuery(setting.areas[i], cacheDocument).clone();
          $dstAreas = jQuery(setting.areas[i], srcDocument);
          if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }

          for (var j = 0; $srcAreas[j]; j++) {
            $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
          }
        }
      }
    }
    
    private rewrite_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.rewrite) { return; }

      if (Util.fire(callbacks_update.rewrite.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      Util.fire(setting.rewrite, null, [this.srcDocument_, setting.area, this.host_])

      if (Util.fire(callbacks_update.rewrite.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    private title_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (Util.fire(callbacks_update.title.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      this.dstDocument_.title = this.srcDocument_.title;
      setting.fix.history && this.app_.data.saveTitle();

      if (Util.fire(callbacks_update.title.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    private head_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.head) { return; }

      if (Util.fire(callbacks_update.head.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var prefilter: string = 'base, meta, link',
          $srcElements: JQuery = jQuery(srcDocument.head).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'),
          $dstElements: JQuery = jQuery(dstDocument.head).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'),
          $addElements: JQuery = jQuery(),
          $delElements: JQuery = $dstElements;

      for (var i = 0, element: HTMLElement, selector: string; element = $srcElements[i]; i++) {
        for (var j = 0; $delElements[j]; j++) {
          if ($delElements[j].tagName === element.tagName && $delElements[j].outerHTML === element.outerHTML) {
            if ($addElements.length) {
              var ref = $dstElements[$dstElements.index($delElements[j]) - 1];
              ref ? jQuery(ref).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
              $addElements = jQuery();
            }
            $delElements = $delElements.not($delElements[j]);
            element = null;
            break;
          }
        }
        $addElements = $addElements.add(element);
      }
      jQuery('title', dstDocument).before($addElements.clone());
      $delElements.remove();

      if (Util.fire(callbacks_update.head.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }

    private area_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      var checker: JQuery;

      if (Util.fire(callbacks_update.content.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      function map() {
        var defer = jQuery.Deferred();
        jQuery(this).one('load error', defer.resolve);
        return defer;
      }

      jQuery(setting.area).children('.' + setting.nss.class4html + '-check').remove();
      checker = jQuery('<div/>', {
        'class': setting.nss.class4html + '-check',
        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
      }).text(DEF.NAME);

      var $srcAreas: JQuery,
          $dstAreas: JQuery;
      for (var i = 0; setting.areas[i]; i++) {
        $srcAreas = jQuery(setting.areas[i], srcDocument).clone();
        $dstAreas = jQuery(setting.areas[i], dstDocument);
        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }

        $srcAreas.find('script').each((i, elem) => this.escapeScript_(<HTMLScriptElement>elem));
        if (jQuery.when) {
          this.loadwaits_ = this.loadwaits_.concat($srcAreas.find('img, iframe, frame').map(map).get());
        }

        for (var j = 0; $srcAreas[j]; j++) {
          $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
        }

        $dstAreas = jQuery(setting.areas[i], dstDocument);
        $dstAreas.append(checker.clone());
        $dstAreas.find('script').each((i, elem) => this.restoreScript_(<HTMLScriptElement>elem));
      }
      this.dispatchEvent(document, DEF.NAME + ':DOMContentLoaded', false, true);

      if (Util.fire(callbacks_update.content.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }
    }
    
    private balance_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.balance.self || !setting.loadtime) { return; }

      if (Util.fire(callbacks_update.balance.before, null, [event, setting.param]) === false) { return; }

      var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || ''),
          performance = Math.ceil(setting.loadtime / (this.jqXHR_.responseText.length || 1) * 1e5);
      this.app_.data.saveServer(host, performance);
      this.app_.balance.chooseServer(setting);

      if (Util.fire(callbacks_update.balance.after, null, [event, setting.param]) === false) { return; }
    }

    private css_(selector: string): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;
      
      if (!setting.load.css) { return; }
      
      if (Util.fire(callbacks_update.css.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var prefilter: string = 'link, style',
          $srcElements: JQuery = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)),
          $dstElements: JQuery = jQuery(prefilter, dstDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)),
          $addElements: JQuery = jQuery(),
          $delElements: JQuery = $dstElements;
      
      function filterHeadContent() {
        return jQuery.contains(srcDocument.head, this);
      }
      function filterBodyContent() {
        return jQuery.contains(srcDocument.body, this);
      }

      for (var i = 0, element: HTMLElement; element = $srcElements[i]; i++) {
        for (var j = 0, isSameElement: boolean; $delElements[j]; j++) {
          switch (element.tagName.toLowerCase()) {
            case 'link':
              isSameElement = (<HTMLLinkElement>element).href === (<HTMLLinkElement>$delElements[j]).href;
              break;
            case 'style':
              isSameElement = Util.trim((<HTMLStyleElement>element).innerHTML) === Util.trim((<HTMLStyleElement>$delElements[j]).innerHTML);
              break;
          }
          if (isSameElement) {
            if ($addElements.length) {
              if (jQuery.contains(dstDocument.body, $delElements[j]) && $addElements.first().parents('head').length) {
                jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
                $delElements.eq(j).before($addElements.filter(filterBodyContent).clone());
              } else {
                var ref = $dstElements[$dstElements.index($delElements[j]) - 1];
                ref ? jQuery(ref).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
              }
              $addElements = jQuery();
            }
            $delElements = $delElements.not($delElements[j]);
            j -= Number(!!j);
            element = null;
            break;
          }
        }
        $addElements = $addElements.add(element);
      }
      jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
      jQuery(dstDocument.body).append($addElements.filter(filterBodyContent).clone());
      $delElements.remove();
      
      if (Util.fire(callbacks_update.css.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
    }

    private script_(selector: string): JQueryDeferred<any[]>[] {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      var scriptwaits: JQueryDeferred<any[]>[] = [],
          scripts: HTMLScriptElement[] = [];

      if (!setting.load.script) { return scriptwaits; }
      
      if (Util.fire(callbacks_update.script.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return scriptwaits; }
      
      var prefilter: string = 'script',
          $scriptElements: JQuery = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)),
          loadedScripts = this.app_.page.loadedScripts,
          regType: RegExp = /^$|(?:application|text)\/(?:java|ecma)script/i,
          regRemove: RegExp = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
      
      var exec = (element: HTMLScriptElement, response?: any) => {
        if (element.src) {
          loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
        }

        try {
          if (this.model_.isDeferrable) {
            if ('string' === typeof response) {
              eval.call(window, response);
            } else {
              throw response;
            }
          } else {
            if (element.hasAttribute('src')) {
              jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, <JQueryAjaxSettings>{
                url: element.src,
                dataType: 'script',
                async: false,
                global: false,
                success: () => null,
                error: (err) => { throw err; }
              }));
            } else {
              eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, ''));
            }
          }
            
          try {
            element.hasAttribute('src') && this.dispatchEvent(element, 'load', false, true);
          } catch (e) {
          }
        } catch (err) {
          try {
            element.hasAttribute('src') && this.dispatchEvent(element, 'error', false, true);
          } catch (e) {
          }

          if (true === setting.load.error) {
            throw err;
          } else {
            Util.fire(setting.load.error, null, [err, element]);
          }
        }
      };

      for (var i = 0, element: HTMLScriptElement; element = <HTMLScriptElement>$scriptElements[i]; i++) {
        if (!regType.test(element.type || '')) { continue; }
        if (element.hasAttribute('src') ? loadedScripts[element.src] : !Util.trim(element.innerHTML)) { continue; }

        LOG: {
          var srcLogParent = jQuery(element).parent(setting.load.log)[0];
          if (!srcLogParent || jQuery(element).parents(setting.area).length) { break LOG; }

          var dstLogParent = jQuery(srcLogParent.id || srcLogParent.tagName, dstDocument)[0],
              log = <HTMLScriptElement>element.cloneNode(true);
          this.escapeScript_(log);
          dstLogParent.appendChild(log);
          this.restoreScript_(log);
        };

        // リストアップ
        ((element: HTMLScriptElement): void => {
          var defer: JQueryDeferred<any[]> = this.model_.isDeferrable && jQuery.Deferred();

          if (element.hasAttribute('src') && element.getAttribute('src')) {
            loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);

            if (element.hasAttribute('async')) {
              jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, <JQueryAjaxSettings>{
                url: element.src,
                dataType: 'script',
                async: true,
                global: false,
                success: () => this.dispatchEvent(element, 'load', false, true),
                error: () => this.dispatchEvent(element, 'error', false, true)
              }));
            } else {
              if (defer) {
                jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, <JQueryAjaxSettings>{
                  url: element.src,
                  dataType: 'text',
                  async: true,
                  global: false,
                  success: () => defer.resolve([element, <string>arguments[0]]),
                  error: (err) => defer.resolve([element, err])
                }));
                scriptwaits.push(defer);
              } else {
                scripts.push(element);
              }
            }
          } else if (!element.hasAttribute('src')) {
            if (defer) {
              scriptwaits.push(defer.resolve([element, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, '')]));
            } else {
              scripts.push(element);
            }
          }
        })(element);
      }

      try {
        if (this.model_.isDeferrable) {
          jQuery.when.apply(jQuery, scriptwaits)
          .always(() => jQuery.each(arguments, (i, args) => exec.apply(this, args)));
        } else {
          jQuery.each(scripts, (element) => exec(element));
        }
      } catch (err) {
        setTimeout(() => this.model_.fallback(event), 1);
        throw err;
      }
      
      if (Util.fire(callbacks_update.script.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) { return scriptwaits; }

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('script(' + speed.time.slice(-1) + ')');

      return scriptwaits;
    }
    
    private scroll_(call: boolean): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (Util.fire(callbacks_update.scroll.before, null, [event, setting.param]) === false) { return; }

      var scrollX: any, scrollY: any;
      switch (event.type.toLowerCase()) {
        case 'click':
        case 'submit':
          scrollX = call && 'function' === typeof setting.scrollLeft ? Util.fire(setting.scrollLeft, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollLeft;
          scrollX = 0 <= scrollX ? scrollX : 0;
          scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);

          scrollY = call && 'function' === typeof setting.scrollTop ? Util.fire(setting.scrollTop, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollTop;
          scrollY = 0 <= scrollY ? scrollY : 0;
          scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);

          window.scrollTo(scrollX, scrollY);
          break;
        case 'popstate':
          call && setting.fix.scroll && this.app_.data.loadScrollPosition();
          break;
      }

      call && setTimeout(() => this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPosition(), 300);

      if (Util.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) { return; }
    }

    private waitRender_(callback: JQueryDeferred<any>): JQueryDeferred<any>
    private waitRender_(callback: () => void): void
    private waitRender_(callback: any) {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      var areas = jQuery(setting.area),
          checker = areas.children('.' + setting.nss.class4html + '-check'),
          limit = new Date().getTime() + 5 * 1000;

      function filterChecker() {
        return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden');
      }

      var check = () => {
        switch (true) {
          case !Util.compareUrl(setting.destLocation.href, Util.normalizeUrl(window.location.href)):
            break;
          case new Date().getTime() > limit:
          case checker.length !== areas.length:
          case checker.length === checker.filter(filterChecker).length:
            checker.remove();
            callback();
            break;
          default:
            setTimeout(check, 100);
        }
      };
      check();

      return jQuery.when && callback;
    }

    private scrollByHash_(hash: string): boolean {
      hash = '#' === hash.charAt(0) ? hash.slice(1) : hash;
      if (!hash) { return false; }

      var $hashTargetElement = jQuery('#' + (hash ? hash : ', [name~=' + hash + ']')).first();
      if ($hashTargetElement.length) {
        isFinite($hashTargetElement.offset().top) &&
        window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
        return true;
      } else {
        return false;
      }
    }
    
    private escapeNoscript_(srcDocument: Document): void {
      jQuery('noscript', srcDocument).children().parent().each(eachNoscript);
      function eachNoscript() {
        jQuery(this).text(this.innerHTML);
      }
    }

    private restoreNoscript_(html: string): string {
      var $span = jQuery('<span/>');
      return html.replace(/(<noscript>)([^<>]+?)(<\/noscript>)/gim, ($0, $1, $2, $3) => $1 + $span.html($2).text() + $3);
    }

    private escapeScript_(script: HTMLScriptElement): void {
      jQuery.data(script, 'source', script.src);
      jQuery.data(script, 'code', script.innerHTML);
      script.removeAttribute('src');
      script.innerHTML = '';
    }

    private restoreScript_(script: HTMLScriptElement): void {
      if (undefined === jQuery.data(script, 'code')) { return; }

      script.innerHTML = ' ';

      if (jQuery.data(script, 'source')) {
        script.src = jQuery.data(script, 'source');
        jQuery.removeData(script, 'source');
      } else {
        script.removeAttribute('src');
      }

      script.innerHTML = jQuery.data(script, 'code');
      jQuery.removeData(script, 'code');
    }

    // mixin utility
    createHTMLDocument(html: string, uri: string): Document { return }
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string { return }
    movePageNormally(event: JQueryEventObject): void { }
    dispatchEvent(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void { }
    wait(ms: number): JQueryDeferred<any> { return }

  }

}
