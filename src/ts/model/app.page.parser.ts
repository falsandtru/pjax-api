/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageParser implements PageParserInterface {

    private mode_: string
    private util_ = LIBRARY.Utility
    private cache_: {
      [uri: string]: Window
    } = {}

    private sandbox_(uri: string = window.location.href): Window {
      uri = this.util_.canonicalizeUrl(uri).split('#').shift();
      if (!this.cache_[uri] || 'object' !== typeof this.cache_[uri].document || this.cache_[uri].document.URL !== uri) {
        jQuery('<iframe src="" sandbox="allow-same-origin"></iframe>')
          .appendTo('body')
          .each((i, elem) => {
            this.cache_[uri] = elem['contentWindow'];
            this.cache_[uri].document.open();
            this.cache_[uri].document.close();
          })
          .remove();
      }
      return this.cache_[uri];
    }

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

    parse(html: string, uri: string = '', mode: string = this.mode_): Document {
      html += ~html.search(/<title[\s>]/i) ? '' : '<title></title>';

      var doc: Document;
      switch (mode) {
        // firefox
        case 'dom':
          if ('function' === typeof window.DOMParser) {
            doc = new (this.sandbox_(uri)).DOMParser().parseFromString(html, 'text/html');
          }
          break;

        // chrome, safari, phantomjs
        case 'doc':
          if (document.implementation && document.implementation.createHTMLDocument) {

            if (/phantomjs/i.test(window.navigator.userAgent)) {
              // PhantomJSでLoad scriptテストで発生する原因不明のエラーの対応
              var backup: string = !uri || !LIBRARY.Utility.compareUrl(uri, window.location.href) ? window.location.href : undefined;
              backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, uri);
              doc = document.implementation.createHTMLDocument('');
              backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, backup);
            } else {
              doc = this.sandbox_(uri).document.implementation.createHTMLDocument('');
            }

            // IE, Operaクラッシュ対策
            if ('object' !== typeof doc.activeElement || !doc.activeElement) { break; }

            // titleプロパティの値をChromeで事後に変更できなくなったため事前に設定する必要がある
            if ('function' === typeof window.DOMParser && new window.DOMParser().parseFromString('', 'text/html')) {
              doc.title = new window.DOMParser().parseFromString(html.match(/<title(?:\s.*?[^\\])?>(?:.*?[^\\])?<\/title>|$/i), 'text/html').title;
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
            // Mac(のChromeのみ？)ではアドレスバーのURLがちらつくため使用させない
            // https://github.com/falsandtru/jquery-pjax/issues/11
            var backup: string = !uri || !LIBRARY.Utility.compareUrl(uri, window.location.href) ? window.location.href : undefined;
            backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, uri);
            doc = manipulate(document.implementation.createHTMLDocument(''), html);
            backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, backup);
          }
          break;

        case null:
          doc = null;
          break;

        default:
          switch (/webkit|firefox|trident|$/i.exec(window.navigator.userAgent).shift().toLowerCase()) {
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
