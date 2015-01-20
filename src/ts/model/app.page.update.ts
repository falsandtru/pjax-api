/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageUpdate {
    
    constructor(

    private model_: ModelInterface,
    private page_: PageInterface,
    private data_: DataInterface,
    private balancer_: BalancerInterface,
    private setting_: SettingInterface,
    private event_: JQueryEventObject,
    private record_: PageRecordInterface
    ) {
      this.main_();
    }
    
    private util_ = LIBRARY.Utility

    private srcTitle_: string
    private dstTitle_: string
    private srcDocument_: Document
    private dstDocument_: Document
    private area_: string
    private areas_: string[]
    private loadwaits_: JQueryPromise<any[]>[] = []

    private main_(): void {
      var record: PageRecordInterface = this.record_,
          setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');
      
      ++this.page_.count;
      this.page_.loadtime = this.page_.loadtime && new Date().getTime() - this.page_.loadtime;
      
      if (setting.cache.mix && EVENT.POPSTATE !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
        return this.model_.fallback(event);
      }
      
      /* variable initialization */
      
      try {
        this.page_.landing = null;

        if (!~(record.data.jqXHR().getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) { throw new Error("throw: content-type mismatch"); }
        
        /* variable define */
        this.srcTitle_ = jQuery(record.data.jqXHR().responseText.match(/<title(?:\s.*?[^\\])?>(?:.*?[^\\])?<\/title>|$/i).pop()).text();
        this.dstTitle_ = document.title;
        
        this.redirect_();
        
        this.dispatchEvent(window, setting.nss.event.pjax.unload, false, false);
        
        this.url_();
        
        if (!this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) { throw new Error("throw: location mismatch"); }

        this.document_();
        
      } catch (err) {
        if (!err) { return; }

        this.model_.getCache(window.location.href) &&
        this.model_.removeCache(setting.destLocation.href);

        this.model_.fallback(event);
      }
    }

    private isRegister_(setting: SettingInterface, event: JQueryEventObject): boolean {
      switch (true) {
        case setting.destLocation.href === setting.origLocation.href:
        case EVENT.POPSTATE === event.type.toLowerCase():
          return false;
        default:
          return true;
      }
    }

    private isCacheUsable_(event: JQueryEventObject, setting: SettingInterface): boolean {
      switch (true) {
        case !setting.cache.click && !setting.cache.submit && !setting.cache.popstate:
        case EVENT.SUBMIT === event.type.toLowerCase() && !setting.cache[(<HTMLFormElement>event.currentTarget).method.toLowerCase()]:
          return false;
        default:
          return true;
      }
    }

    private redirect_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      var url: string = (jQuery('head meta[http-equiv="Refresh"][content*="URL="]').attr('content') || '').match(/\w+:\/\/[^;\s"']+|$/i).shift();
      if (!url || this.model_.comparePageByUrl(setting.destLocation.href, url)) { return; }

      var redirect = <HTMLAnchorElement>setting.destLocation.cloneNode();
      redirect.href = url;

      if (this.util_.fire(setting.callbacks.update.redirect.before, setting, [event, setting, redirect.cloneNode(), setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) { return; };

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
              window.history.replaceState(window.history.state, this.srcTitle_, redirect.href);
              if (this.isRegister_(setting, event) && setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, window.location.href)) {
                jQuery[DEF.NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[DEF.NAME].enable();
              }
              setTimeout(() => this.dispatchEvent(window, EVENT.POPSTATE, false, false), 0);
              break;
          }
          throw false;
      }

      if (this.util_.fire(setting.callbacks.update.redirect.after, setting, [event, setting, redirect.cloneNode(), setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) { return; }
    }
    
    private url_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      this.model_.location.href = setting.destLocation.href;

      if (this.util_.fire(setting.callbacks.update.url.before, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) { return; };

      if (this.isRegister_(setting, event)) {
        window.history.pushState(this.util_.fire(setting.state, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]),
                                 ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstTitle_ : this.srcTitle_,
                                 setting.destLocation.href);

        if (setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, window.location.href)) {
          jQuery[DEF.NAME].disable();
          window.history.back();
          window.history.forward();
          jQuery[DEF.NAME].enable();
        }
      }

      if (this.util_.fire(setting.callbacks.update.url.after, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) { return; }
    }

    private document_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      if (setting.load.script && !this.page_.loadedScripts['']) {
        var loadedScripts = this.page_.loadedScripts;
        loadedScripts[''] = true;
        jQuery('script').each(function () {
          var element: HTMLScriptElement = this;
          if (element.src) { loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload); }
        });
      }

      this.srcDocument_ = this.page_.parser.parse(this.record_.data.jqXHR().responseText, setting.destLocation.href);
      this.dstDocument_ = document;

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');
      
      // 更新範囲を選出
      this.area_ = this.chooseArea(setting.area, this.srcDocument_, this.dstDocument_);
      if (!this.area_) { throw new Error('throw: area notfound'); }
      // 更新範囲をセレクタごとに分割
      this.areas_ = this.area_.match(/(?:[^,]+?|\(.*?\)|\[.*?\])+/g);

      this.overwriteDocumentByCache_();

      setting.fix.noscript &&
      this.escapeNoscript_(this.srcDocument_);

      setting.fix.reference &&
      this.fixReference_(setting.origLocation.href, this.dstDocument_);

      this.rewrite_();

      this.title_();

      setting.fix.history && this.data_.saveTitle();
      this.data_.saveExpires(this.record_.data.url(), this.record_.data.host(), this.record_.data.expires());

      this.head_();

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
          if (!this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
            return;
          }

          this.dispatchEvent(document, setting.nss.event.pjax.ready, false, false);

          jQuery(this.area_).each((i, elem) => jQuery(elem).width());

          return jQuery.when ? jQuery.Deferred().resolve() : <any>callback();
        };

        var onrender = (callback?: () => void) => {
          if (!this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
            return;
          }

          this.util_.fire(setting.callback, setting, [event, setting]);

          setTimeout(() => {
            switch (event.type.toLowerCase()) {
              case EVENT.CLICK:
              case EVENT.SUBMIT:
                this.model_.overlay(setting) || this.scrollByHash_(setting) || this.scroll_(true);
                break;
              case EVENT.POPSTATE:
                this.model_.overlay(setting) || this.scroll_(true);
                break;
            }
          }, 100);

          this.dispatchEvent(document, setting.nss.event.pjax.render, false, false);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');

          return jQuery.when ? jQuery.when.apply(jQuery, this.loadwaits_) : callback();
        };

        var onload = () => {
          if (!this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
            return jQuery.when && jQuery.Deferred().reject();
          }

          this.dispatchEvent(window, setting.nss.event.pjax.load, false, false);

          speedcheck && speed.time.push(speed.now() - speed.fire);
          speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

          speedcheck && console.log(speed.time);
          speedcheck && console.log(speed.name);

          this.script_('[src][defer]');

          // 未定義を返すとエラー
          return jQuery.when && jQuery.Deferred().resolve();
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
          [then](() => onready())
          [then](() => onrender())
          [then](() => onload());
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

      if (!this.isCacheUsable_(event, setting)) { return; }

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

      if (!setting.rewrite) { return; }

      if (this.util_.fire(setting.callbacks.update.rewrite.before, setting, [event, setting, this.srcDocument_, this.dstDocument_]) === false) { return; }

      this.util_.fire(setting.rewrite, setting, [this.srcDocument_, this.area_, this.record_.data.host()])

      if (this.util_.fire(setting.callbacks.update.rewrite.before, setting, [event, setting, this.srcDocument_, this.dstDocument_]) === false) { return; }
    }

    private title_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      if (this.util_.fire(setting.callbacks.update.title.before, setting, [event, setting, this.srcDocument_.title, this.dstDocument_.title]) === false) { return; }

      this.dstDocument_.title = this.srcDocument_.title;

      if (this.util_.fire(setting.callbacks.update.title.after, setting, [event, setting, this.srcDocument_.title, this.dstDocument_.title]) === false) { return; }
    }

    private head_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;

      if (!setting.load.head) { return; }

      if (this.util_.fire(setting.callbacks.update.head.before, setting, [event, setting, this.srcDocument_.querySelector('head'), this.dstDocument_.querySelector('head')]) === false) { return; }

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

      if (this.util_.fire(setting.callbacks.update.head.after, setting, [event, setting, this.srcDocument_.querySelector('head'), this.dstDocument_.querySelector('head')]) === false) { return; }
    }

    private content_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;

      if (this.util_.fire(setting.callbacks.update.content.before, setting, [event, setting, jQuery(this.area_, this.srcDocument_).get(), jQuery(this.area_, this.dstDocument_).get()]) === false) { return; }

      jQuery(this.area_).children('.' + setting.nss.elem + '-check').remove();

      var $srcAreas: JQuery,
          $dstAreas: JQuery;
      for (var i = 0; this.areas_[i]; i++) {
        $srcAreas = jQuery(this.areas_[i], srcDocument);
        $dstAreas = jQuery(this.areas_[i], dstDocument);

        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) { throw new Error('throw: area mismatch'); }

        // importNode/adoptNodeでなければimgなどのloadイベントが発火しない。
        // rewriteで設定されたイベントハンドラは失われる。
        $srcAreas = $srcAreas.map((i, elem) => document.importNode(elem, true));
        $srcAreas.find('script').each((i, elem) => this.escapeScript_(<HTMLScriptElement>elem));
        this.loadwaits_ = this.loadwaits_.concat($srcAreas.find('img, iframe, frame').map(elem2deferred).get());

        for (var j = 0; $srcAreas[j]; j++) {
          $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
          if (document.body === $srcAreas[j]) {
            jQuery.each($srcAreas[j].attributes, (i, attr) => $dstAreas[j].removeAttribute(attr.name));
            jQuery.each($srcAreas[j].attributes, (i, attr) => $dstAreas[j].setAttribute(attr.name, attr.value));
          }
        }

        $dstAreas = jQuery(this.areas_[i], dstDocument);
        $dstAreas.find('script').each((i, elem) => this.restoreScript_(<HTMLScriptElement>elem));
      }
      this.dispatchEvent(document, setting.nss.event.pjax.DOMContentLoaded, false, false);

      if (this.util_.fire(setting.callbacks.update.content.after, setting, [event, setting, jQuery(this.area_, this.srcDocument_).get(), jQuery(this.area_, this.dstDocument_).get()]) === false) { return; }

      function elem2deferred() {
        if (!jQuery.Deferred) { return; }
        var defer = jQuery.Deferred();
        switch (this.tagName.toLowerCase()) {
          case 'img':
            jQuery(this).one('load error abort', defer.resolve);
            break;
          case 'iframe':
          case 'frame':
            jQuery(this).one('load', defer.resolve);
            break;
        }
        return defer;
      }
    }
    
    private balance_(): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      if (!setting.balance.active || this.page_.loadtime < 100) { return; }

      var $xhr = this.record_.data.jqXHR();
      var host = this.balancer_.sanitize($xhr, setting) || this.record_.data.host() || '',
          time = this.page_.loadtime,
          score = this.balancer_.score(time, $xhr.responseText.length);

      if (this.util_.fire(setting.callbacks.update.balance.before, setting, [event, setting, host, this.page_.loadtime, $xhr.responseText.length]) === false) { return; }

      var server = this.data_.getServerBuffer(setting.destLocation.href),
          score = this.balancer_.score(time, $xhr.responseText.length);
      time = server && !server.state && server.time ? Math.round((server.time + time) / 2) : time;
      score = server && !server.state && server.score ? Math.round((server.score + score) / 2) : score;
      this.data_.saveServer(host, new Date().getTime() + setting.balance.server.expires, time, score, 0);
      this.balancer_.changeServer(this.balancer_.chooseServer(setting), setting);

      if (this.util_.fire(setting.callbacks.update.balance.after, setting, [event, setting, host, this.page_.loadtime, $xhr.responseText.length]) === false) { return; }
    }

    private css_(selector: string): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;
      
      if (!setting.load.css) { return; }
      
      var prefilter: string = 'link, style',
          $srcElements: JQuery = jQuery(prefilter, srcDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)),
          $dstElements: JQuery = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)),
          $addElements: JQuery = jQuery(),
          $delElements: JQuery = $dstElements;
      
      if (this.util_.fire(setting.callbacks.update.css.before, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) { return; }

      $srcElements = $srcElements.not(setting.load.ignore);
      $dstElements = $srcElements.not(setting.load.ignore);

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

      $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter));

      if (this.util_.fire(setting.callbacks.update.css.after, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) { return; }

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
    }

    private script_(selector: string): JQueryPromise<any[]>[] {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_,
          srcDocument: Document = this.srcDocument_,
          dstDocument: Document = this.dstDocument_;

      var scriptwaits: JQueryPromise<any[]>[] = [],
          scripts: HTMLScriptElement[] = [];

      if (!setting.load.script) { return scriptwaits; }
      
      var prefilter: string = 'script',
          $srcElements: JQuery = jQuery(prefilter, srcDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)),
          $dstElements: JQuery = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', dstDocument).find(prefilter)),
          loadedScripts = this.page_.loadedScripts,
          regType: RegExp = /^$|(?:application|text)\/(?:java|ecma)script/i,
          regRemove: RegExp = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
      
      if (this.util_.fire(setting.callbacks.update.script.before, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) { return scriptwaits; }

      $srcElements = $srcElements.not(setting.load.ignore);

      var exec = (element: HTMLScriptElement, response?: any) => {
        if (!this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
          return false;
        }

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
            element.hasAttribute('src') && this.dispatchEvent(element, 'load', false, false);
          } catch (e) {
          }
        } catch (err) {
          try {
            element.hasAttribute('src') && this.dispatchEvent(element, 'error', false, false);
          } catch (e) {
          }

          if (true === setting.load.error) {
            throw err;
          } else {
            this.util_.fire(setting.load.error, setting, [err, element]);
          }
        }
      };

      for (var i = 0, element: HTMLScriptElement; element = <HTMLScriptElement>$srcElements[i]; i++) {
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
                success: () => this.dispatchEvent(element, 'load', false, false),
                error: () => this.dispatchEvent(element, 'error', false, false)
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
          jQuery.each(scripts, (i, elem) => exec(elem));
        }
      } catch (err) {
        setTimeout(() => this.model_.fallback(event), 1);
        throw err;
      }

      $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', dstDocument).find(prefilter));

      if (this.util_.fire(setting.callbacks.update.script.after, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) { return scriptwaits; }

      var speedcheck = setting.speedcheck, speed = this.model_.speed;
      speedcheck && speed.time.push(speed.now() - speed.fire);
      speedcheck && speed.name.push('script(' + speed.time.slice(-1) + ')');

      return scriptwaits;
    }
    
    private scroll_(call: boolean): void {
      var setting: SettingInterface = this.setting_,
          event: JQueryEventObject = this.event_;

      if (this.util_.fire(setting.callbacks.update.scroll.before, setting, [event, setting]) === false) { return; }

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
          call && setting.fix.scroll && this.data_.loadScrollPosition();
          break;
      }
      call && this.data_.saveScrollPosition();

      if (this.util_.fire(setting.callbacks.update.scroll.after, setting, [event, setting]) === false) { return; }
    }

    private scrollByHash_(setting: SettingInterface): boolean {
      var hash = setting.destLocation.hash.replace(/^#/, '');
      if (!hash) { return false; }

      var $hashTargetElement = jQuery('#' + hash + ', [name~=' + hash + ']').first();
      if ($hashTargetElement.length) {
        isFinite($hashTargetElement.offset().top) &&
        window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
        this.data_.saveScrollPosition();
        return true;
      } else {
        return false;
      }
    }

    private fixReference_(url: string, document: Document): void {
      var origDir = url.replace(/[^/]+$/, ''),
          destDir = document.URL.replace(/[^/]+$/, ''),
          origDim = origDir.split('/').length,
          destDim = destDir.split('/').length;

      var regUntilHost = /^.+?\w\//;

      var distance: string = this.util_.repeat('../', Math.abs(origDim - destDim)),
          direction: number;
      switch (true) {
        case origDim === destDim:
          direction = 0;
          break;
        case origDim < destDim:
          direction = 1;
          break;
        case origDim > destDim:
          direction = -1;
          break;
      }

      jQuery('[href], [src]', document)
      .not([
        '[href^="/"]',
        '[href^= "http:"]',
        '[href^= "https:"]',
        '[src^= "/"]',
        '[src^= "http:"]',
        '[src^= "https:"]'
      ].join(','))
      .each(eachFixPath);
      function eachFixPath(i, elem: HTMLElement) {
        var attr: string;
        if ('href' in elem) {
          attr = 'href';
        } else if ('src' in elem) {
          attr = 'src';
        } else {
          return;
        }

        switch (direction) {
          case 0:
            break;
          case 1:
            elem[attr] = distance + elem.getAttribute(attr);
            break;
          case -1:
            elem[attr] = elem.getAttribute(attr).replace(distance, '');
            break;
        }
        elem.setAttribute(attr, elem[attr].replace(regUntilHost, '/'));
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
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string { return }
    dispatchEvent(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void { }

  }

}
