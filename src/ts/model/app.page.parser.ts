/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageParser implements PageParserInterface {

    private mode_: string

    private test_(mode: string): string {
      try {
        var html = '<html lang="en" class="html"><head><title>&amp;</title><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>',
            doc = this.parse(html, window.location.href, mode);
        switch (false) {
          case !!doc:
          case doc.URL && decodeURI(doc.URL) === decodeURI(window.location.href):
          case doc.title === '&':
          case !!doc.querySelector('html.html[lang="en"]'):
          case !!doc.querySelector('head>link')['href']:
          case !!doc.querySelector('head>noscript')['innerHTML']:
          case !!doc.querySelector('body>noscript')['innerHTML']:
          case !!doc.querySelector('body>a')['href']:
            throw true;
        }
        return mode;
      } catch (err) {
      }
    }

    parse(html: string, uri?: string, mode: string = this.mode_): Document {
      html += ~html.search(/<title[\s>]/i) ? '' : '<title></title>';

      var backup: string = !uri || !LIBRARY.Utility.compareUrl(uri, window.location.href, true) ? window.location.href : undefined;
      backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, uri);

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
            if (doc.title !== doc.querySelector('title').textContent) {
              doc.title = doc.querySelector('title').textContent;
            }
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
              this.mode_ = this.test_('doc') || this.test_('dom') || this.test_('manipulate');
              break;
            case 'firefox':
              this.mode_ = this.test_('dom') || this.test_('doc') || this.test_('manipulate');
              break;
            case 'trident':
              this.mode_ = this.test_('manipulate') || this.test_('dom') || this.test_('doc');
              break;
            default:
              this.mode_ = this.test_('dom') || this.test_('doc') || this.test_('manipulate');
          }
          doc = this.mode_ && this.parse(html, uri);
          break;
      }

      backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, backup);

      return doc;

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
      }
    }

  }

  export class PageParserSingleton implements PageParserInterface {

    constructor() {
      PageParserSingleton.instance_ = PageParserSingleton.instance_ || new PageParser();
    }

    private static instance_: PageParserInterface
    private singleton_(): PageParserInterface {
      return PageParserSingleton.instance_;
    }

    parse(html: string, uri?: string): Document {
      return this.singleton_().parse(html, uri);
    }

  }

}
