/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  var mode: string;

  export class PageUtility implements PageUtilityInterface {
    
    createHTMLDocument(html: string, uri: string): Document {
      var test = (mode_: string): boolean => {
        try {
          mode = mode_;
          var html = '<html lang="en" class="html"><head><title>&amp;</title><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>',
              doc = this.createHTMLDocument(html, '');
          switch (false) {
            case !!doc:
            case doc.URL && decodeURI(doc.URL) === decodeURI(uri || window.location.href):
            case doc.title === '&':
            case !!doc.querySelector('html.html[lang="en"]'):
            case !!doc.querySelector('head>link')['href']:
            case !!doc.querySelector('head>noscript')['innerHTML']:
            case !!doc.querySelector('body>noscript')['innerHTML']:
            case !!doc.querySelector('body>a')['href']:
              throw true;
          }
          return true;
        } catch (err) {
          mode = null;
          return false;
        }
      };
      function manipulate(doc: Document, html: string): Document {
        var wrapper = <HTMLElement>document.createElement('div');
        wrapper.innerHTML = html.match(/<html(?:\s.*?[^\\])?>|$/i).shift().replace(/html/i, 'div') || '<div>';
        var attrs = wrapper.firstChild.attributes;
        for (var i = 0, attr: Attr; attr = attrs[i]; i++) {
          doc.documentElement.setAttribute(attr.name, attr.value);
        }
        var wrapper = <HTMLElement>document.createElement('html');
        wrapper.innerHTML = html.replace(/^.*?<html(?:\s.*?[^\\])?>/im, '');
        doc.documentElement.removeChild(doc.head);
        doc.documentElement.removeChild(doc.body);
        while (wrapper.childNodes.length) {
          doc.documentElement.appendChild(wrapper.childNodes[0]);
        }
        return doc;
      };

      var backup = window.location.href;
      uri && window.history.replaceState(window.history.state, document.title, uri);

      var doc: Document;
      switch (mode) {
        // firefox
        case 'dom':
          if ('function' === typeof window.DOMParser) {
            doc = new window.DOMParser().parseFromString(html, 'text/html');
          }
          break;

        // chrome, safari
        case 'doc':
          if (document.implementation && document.implementation.createHTMLDocument) {
            doc = document.implementation.createHTMLDocument('');

            // IE, Operaクラッシュ対策
            if ('object' !== typeof doc.activeElement || !doc.activeElement) { break; }

            // titleプロパティの値をChromeで事後に変更できなくなったため事前に設定する必要がある
            if ('function' === typeof window.DOMParser && new window.DOMParser().parseFromString('', 'text/html')) {
              doc.title = new window.DOMParser().parseFromString(html.match(/<title(?:\s.*?[^\\])?>(?:.*?[^\\])?<\/title>/i), 'text/html').title;
            }
            doc.open();
            doc.write(html);
            doc.close();
            doc.title = doc.title ? doc.title : jQuery(html.match(/<title(?:\s.*?[^\\])?>(?:.*?[^\\])?<\/title>/i) + '').text();
          }
          break;

        // ie10+, opera
        case 'manipulate':
          if (document.implementation && document.implementation.createHTMLDocument) {
            doc = manipulate(document.implementation.createHTMLDocument(''), html);
          }
          break;

        case null:
          doc = null;
          break;

        default:
          switch (/webkit|firefox|trident|$/i.exec(window.navigator.userAgent.toLowerCase()).shift()) {
            case 'webkit':
              test('doc') || test('dom') || test('manipulate');
              break;
            case 'firefox':
              test('dom') || test('doc') || test('manipulate');
              break;
            case 'trident':
              test('manipulate') || test('dom') || test('doc');
              break;
            default:
              test('dom') || test('doc') || test('manipulate');
          }
          doc = this.createHTMLDocument(html, uri);
          break;
      }

      uri && window.history.replaceState(window.history.state, document.title, backup);
      return doc;
    }

    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string {
      areas = areas instanceof Array ? areas : [areas];

      var i: number = -1, area: string;
      AREA: while (area = areas[++i]) {
        var options: string[] = area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
        var j: number = -1;
        while (options[++j]) {
          if (!jQuery(options[j], srcDocument).length || !jQuery(options[j], dstDocument).length) {
            continue AREA;
          }
        }
        return area;
      }
    }

    movePageNormally(event: JQueryEventObject): void {
      switch (event.type.toLowerCase()) {
        case 'click':
          window.location.assign((<HTMLAnchorElement>event.currentTarget).href);
          break;
        case 'submit':
          switch ((<HTMLFormElement>event.currentTarget).method.toUpperCase()) {
            case 'GET':
              window.location.assign((<HTMLFormElement>event.currentTarget).action.replace(/[?#].*/, '') + '?' + jQuery(event.currentTarget).serialize());
              break;
            case 'POST':
              window.location.assign((<HTMLFormElement>event.currentTarget).action);
              break;
          }
          break;
        case 'popstate':
          window.location.reload();
          break;
      }
    }

    calAge(jqXHR: JQueryXHR): number {
      var age: any;

      switch (true) {
        case /no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control')):
          return 0;
        case !!~String(jqXHR.getResponseHeader('Cache-Control')).indexOf('max-age='):
          return Number(jqXHR.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop()) * 1000;
        case !!String(jqXHR.getResponseHeader('Expires')):
          return new Date(jqXHR.getResponseHeader('Expires')).getTime() - new Date().getTime();
        default:
          return 0;
      }
    }

    calExpires(jqXHR: JQueryXHR): number {
      return new Date().getTime() + this.calAge(jqXHR);
    }
    
    dispatchEvent_(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, bubbling, cancelable);
      target.dispatchEvent(event);
    }

    wait_(ms: number): JQueryDeferred<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }
    
  }

}
