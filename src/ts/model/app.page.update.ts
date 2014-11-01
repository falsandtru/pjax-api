/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageUpdate implements PageUpdateInterface {
    
    constructor(

    private model_: ModelInterface,
    private app_: AppLayerInterface,
    private page_: PageInterface,
    private setting_: SettingInterface,
    private event_: JQueryEventObject,
    private data_: string,
    private textStatus_: string,
    private jqXHR_: JQueryXHR,
    private host_: string,
    private retriable_: boolean
    ) {
      this.main_();
    }
    
    private util_ = LIBRARY.Utility

    private srcDocument_: Document
    private dstDocument_: Document
    private area_: string
    private areas_: string[]
    private loadwaits_: JQueryDeferred<any[]>[] = []

    private main_(): void {
      var app = this.app_,
          setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          data: string = this.data_,
          textStatus: string = this.textStatus_,
          jqXHR: JQueryXHR = this.jqXHR_;
      var callbacks_update = setting.callbacks.update;

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');
      
      UPDATE: {
        ++this.page_.count;
        this.page_.loadtime = this.page_.loadtime && new Date().getTime() - this.page_.loadtime;
        this.page_.loadtime = this.page_.loadtime < 100 ? 0 : this.page_.loadtime;
        
        if (setting.cache.mix && EVENT.POPSTATE !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
          return this.model_.fallback(event);
        }
        
        /* variable initialization */
        
        try {
          app.page.landing = null;
          if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }
          
          /* variable define */
          this.srcDocument_ = this.page_.parser.parse(jqXHR.responseText, setting.destLocation.href);
          this.dstDocument_ = document;
            
          // 更新範囲を選出
          this.area_ = this.page_.chooseArea(setting.area, this.srcDocument_, this.dstDocument_);
          if (!this.area_) { throw new Error('throw: area notfound'); }
          // 更新範囲をセレクタごとに分割
          this.areas_ = this.area_.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');
          
          this.redirect_();
          
          this.page_.dispatchEvent(window, DEF.NAME + ':unload', false, true);
          
          this.url_();
          
          this.document_();
          
        } catch (err) {
          if (!err) { return; }

          this.model_.getCache(window.location.href) &&
          this.model_.removeCache(setting.destLocation.href);

          this.model_.fallback(event);
        };
      }; // label: UPDATE
    }

    private isRegister_(): boolean {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      switch (true) {
        case setting.destLocation.href === setting.origLocation.href:
        case EVENT.POPSTATE === event.type.toLowerCase():
        case !this.retriable_:
          return false;
        default:
          return true;
      }
    }
    
    private redirect_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_).length) { return; }

      if (this.util_.fire(callbacks_update.redirect.before, setting, [event, setting]) === false) { return; };

      var redirect = <HTMLAnchorElement>setting.destLocation.cloneNode();
      redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
      switch (true) {
        case !setting.redirect:
        case redirect.protocol !== setting.destLocation.protocol:
        case redirect.host !== setting.destLocation.host:
        case EVENT.SUBMIT === event.type.toLowerCase() && 'GET' !== (<HTMLFormElement>event.currentTarget).method.toUpperCase():
          switch (event.type.toLowerCase()) {
            case EVENT.CLICK:
            case EVENT.SUBMIT:
              window.location.assign(redirect.href);
              break;
            case EVENT.POPSTATE:
              window.location.replace(redirect.href);
              break;
          }
          throw false;

        default:
          jQuery[DEF.NAME].enable();
          switch (event.type.toLowerCase()) {
            case EVENT.CLICK:
            case EVENT.SUBMIT:
              setTimeout(() => jQuery[DEF.NAME].click(redirect.href), 0);
              break;
            case EVENT.POPSTATE:
              window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
              if (this.isRegister_() && setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
                jQuery[DEF.NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[DEF.NAME].enable();
              }
              setTimeout(() => this.page_.dispatchEvent(window, EVENT.POPSTATE, false, false), 0);
              break;
          }
          throw false;
      }

      if (this.util_.fire(callbacks_update.redirect.after, setting, [event, setting]) === false) { return; }
    }
    
    private url_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      this.model_.location.href = setting.destLocation.href;

      if (this.util_.fire(callbacks_update.url.before, setting, [event, setting]) === false) { return; };

      if (this.isRegister_()) {
        window.history.pushState(this.util_.fire(setting.state, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]),
                                 ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title,
                                 setting.destLocation.href);

        if (setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
          jQuery[DEF.NAME].disable();
          window.history.back();
          window.history.forward();
          jQuery[DEF.NAME].enable();
        }
      }

      // verify
      if (this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
      } else if (this.retriable_) {
        setting.destLocation.href = this.util_.normalizeUrl(window.location.href);
        new PageUpdate(this.model_, this.app_, this.page_, setting, event, this.data_, this.textStatus_, this.jqXHR_, this.host_, false);
        throw false;
      } else {
        throw new Error('throw: location mismatch');
      }

      if (this.util_.fire(callbacks_update.url.after, setting, [event, setting]) === false) { return; }
    }
    
    private document_(): void {
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

      this.content_();

      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

      this.balance_();

      this.css_('link[rel~="stylesheet"], style');
      jQuery(window)
      .one(DEF.NAME + ':rendering', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        var onready = (callback?: () => void) => {
          this.page_.dispatchEvent(document, DEF.NAME + ':ready', false, true);

          this.util_.fire(setting.callback, setting, [event, setting]);

          return jQuery.when ? this.waitRender_(jQuery.Deferred().resolve) : this.waitRender_(callback);
        };

        var onrender = (callback?: () => void) => {
          setTimeout(() => {
            this.app_.page.isScrollPosSavable = true;
            switch (event.type.toLowerCase()) {
              case EVENT.CLICK:
              case EVENT.SUBMIT:
                this.scrollByHash_(setting.destLocation.hash) || this.scroll_(true);
                break;
              case EVENT.POPSTATE:
                this.scroll_(true);
                break;
            }
          }, 100);

          this.page_.dispatchEvent(document, DEF.NAME + ':render', false, true);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');

          return jQuery.when ? jQuery.when.apply(jQuery, this.loadwaits_) : callback();
        };

        var onload = () => {
          this.page_.dispatchEvent(window, DEF.NAME + ':load', false, true);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

          speedcheck && console.log(speed.time);
          speedcheck && console.log(speed.name);

          this.script_('[src][defer]');

          // 未定義を返すとエラー
          return jQuery.when && jQuery.Deferred();
        };

        this.scroll_(false);

        if (100 > this.page_.loadtime && setting.reset.type.match(event.type.toLowerCase()) && !jQuery('form[method][method!="GET"]').length) {
          switch (false) {
            case this.page_.count < setting.reset.count || !setting.reset.count:
            case new Date().getTime() < setting.reset.time + this.page_.time || !setting.reset.time:
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
          cache: CacheInterface = this.model_.getCache(setting.destLocation.href);

      if (!this.page_.isCacheUsable_(event, setting)) { return; }

      if (cache && cache.data) {
        var html: string = setting.fix.noscript ? this.restoreNoscript_(cache.data) : cache.data,
            cacheDocument: Document = this.page_.parser.parse(html, setting.destLocation.href),
            srcDocument: Document = this.srcDocument_;

        srcDocument.title = cacheDocument.title;

        var $srcAreas: JQuery,
            $dstAreas: JQuery;
        for (var i = 0; this.areas_[i]; i++) {
          $srcAreas = jQuery(this.areas_[i], cacheDocument).clone();
          $dstAreas = jQuery(this.areas_[i], srcDocument);
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

      if (this.util_.fire(callbacks_update.rewrite.before, setting, [event, setting]) === false) { return; }

      this.util_.fire(setting.rewrite, setting, [this.srcDocument_, this.area_, this.host_])

      if (this.util_.fire(callbacks_update.rewrite.before, setting, [event, setting]) === false) { return; }
    }

    private title_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (this.util_.fire(callbacks_update.title.before, setting, [event, setting]) === false) { return; }

      this.dstDocument_.title = this.srcDocument_.title;
      setting.fix.history && this.app_.data.saveTitle();

      if (this.util_.fire(callbacks_update.title.after, setting, [event, setting]) === false) { return; }
    }

    private head_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.load.head) { return; }

      if (this.util_.fire(callbacks_update.head.before, setting, [event, setting]) === false) { return; }

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

      if (this.util_.fire(callbacks_update.head.after, setting, [event, setting]) === false) { return; }
    }

    private content_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;

      var checker: JQuery;

      if (this.util_.fire(callbacks_update.content.before, setting, [event, setting]) === false) { return; }

      function map() {
        var defer = jQuery.Deferred();
        jQuery(this).one('load error', defer.resolve);
        return defer;
      }

      jQuery(this.area_).children('.' + setting.nss.class4html + '-check').remove();
      checker = jQuery('<div/>', {
        'class': setting.nss.class4html + '-check',
        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
      }).text(DEF.NAME);

      var $srcAreas: JQuery,
          $dstAreas: JQuery;
      for (var i = 0; this.areas_[i]; i++) {
        $srcAreas = jQuery(this.areas_[i], srcDocument).clone();
        $dstAreas = jQuery(this.areas_[i], dstDocument);
        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }

        $srcAreas.find('script').each((i, elem) => this.escapeScript_(<HTMLScriptElement>elem));
        if (jQuery.when) {
          this.loadwaits_ = this.loadwaits_.concat($srcAreas.find('img, iframe, frame').map(map).get());
        }

        for (var j = 0; $srcAreas[j]; j++) {
          $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
        }

        $dstAreas = jQuery(this.areas_[i], dstDocument);
        $dstAreas.append(checker.clone());
        $dstAreas.find('script').each((i, elem) => this.restoreScript_(<HTMLScriptElement>elem));
      }
      this.page_.dispatchEvent(document, DEF.NAME + ':DOMContentLoaded', false, true);

      if (this.util_.fire(callbacks_update.content.after, setting, [event, setting]) === false) { return; }
    }
    
    private balance_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (!setting.balance.self || !this.page_.loadtime) { return; }
      
      var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || ''),
          performance = Math.ceil(this.page_.loadtime / (this.jqXHR_.responseText.length || 1) * 1e5);

      if (this.util_.fire(callbacks_update.balance.before, setting, [event, setting, host, this.page_.loadtime, this.jqXHR_]) === false) { return; }

      this.app_.data.saveServer(host, performance);
      this.app_.balance.chooseServer(setting);

      if (this.util_.fire(callbacks_update.balance.after, setting, [event, setting, host, this.page_.loadtime, this.jqXHR_]) === false) { return; }
    }

    private css_(selector: string): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      var callbacks_update = setting.callbacks.update;
      
      if (!setting.load.css) { return; }
      
      if (this.util_.fire(callbacks_update.css.before, setting, [event, setting]) === false) { return; }

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
              isSameElement = this.util_.trim((<HTMLStyleElement>element).innerHTML) === this.util_.trim((<HTMLStyleElement>$delElements[j]).innerHTML);
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
      
      if (this.util_.fire(callbacks_update.css.after, setting, [event, setting]) === false) { return; }

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
      
      if (this.util_.fire(callbacks_update.script.before, setting, [event, setting]) === false) { return scriptwaits; }
      
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
            element.hasAttribute('src') && this.page_.dispatchEvent(element, 'load', false, true);
          } catch (e) {
          }
        } catch (err) {
          try {
            element.hasAttribute('src') && this.page_.dispatchEvent(element, 'error', false, true);
          } catch (e) {
          }

          if (true === setting.load.error) {
            throw err;
          } else {
            this.util_.fire(setting.load.error, setting, [err, element]);
          }
        }
      };

      for (var i = 0, element: HTMLScriptElement; element = <HTMLScriptElement>$scriptElements[i]; i++) {
        if (!regType.test(element.type || '')) { continue; }
        if (element.hasAttribute('src') ? loadedScripts[element.src] : !this.util_.trim(element.innerHTML)) { continue; }

        LOG: {
          var srcLogParent = jQuery(element).parent(setting.load.log)[0];
          if (!srcLogParent || jQuery(element).parents(this.area_).length) { break LOG; }

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
                success: () => this.page_.dispatchEvent(element, 'load', false, true),
                error: () => this.page_.dispatchEvent(element, 'error', false, true)
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
      
      if (this.util_.fire(callbacks_update.script.after, setting, [event, setting]) === false) { return scriptwaits; }

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('script(' + speed.time.slice(-1) + ')');

      return scriptwaits;
    }
    
    private scroll_(call: boolean): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      if (this.util_.fire(callbacks_update.scroll.before, setting, [event, setting]) === false) { return; }

      var scrollX: any, scrollY: any;
      switch (event.type.toLowerCase()) {
        case EVENT.CLICK:
        case EVENT.SUBMIT:
          scrollX = call && 'function' === typeof setting.scrollLeft ? this.util_.fire(setting.scrollLeft, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) : setting.scrollLeft;
          scrollX = 0 <= scrollX ? scrollX : 0;
          scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);

          scrollY = call && 'function' === typeof setting.scrollTop ? this.util_.fire(setting.scrollTop, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) : setting.scrollTop;
          scrollY = 0 <= scrollY ? scrollY : 0;
          scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);

          window.scrollTo(scrollX, scrollY);
          break;
        case EVENT.POPSTATE:
          call && setting.fix.scroll && this.app_.data.loadScrollPosition();
          break;
      }

      call && setTimeout(() => this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPosition(), 300);

      if (this.util_.fire(callbacks_update.scroll.after, setting, [event, setting]) === false) { return; }
    }

    private waitRender_(callback: JQueryDeferred<any>): JQueryDeferred<any>
    private waitRender_(callback: () => void): void
    private waitRender_(callback: any) {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;
      var callbacks_update = setting.callbacks.update;

      var areas = jQuery(this.area_),
          checker = areas.children('.' + setting.nss.class4html + '-check'),
          limit = new Date().getTime() + 5 * 1000;

      function filterChecker() {
        return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden');
      }

      var check = () => {
        switch (true) {
          case !this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href)):
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

  }

}
