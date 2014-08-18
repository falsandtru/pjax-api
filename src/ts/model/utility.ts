/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class Utility {

    static fire(fn: any, context: Object = window, args: any[]= [], async?: boolean): any {
      if ('function' === typeof fn) { return async ? setTimeout(function () { fn.apply(context || window, args) }, 0) : fn.apply(context || window, args); } else { return fn; }
    }

    static trim(text: string): string {
      text = 'string' === typeof text ? text : String(0 === <any>text && text.toString() || '');
      if (String.prototype.trim) {
        text = text.toString().trim();
      } else if (text = text.replace(/^[\s\uFEFF\xA0]+/, '')) {
        var regSpace = /[\s\uFEFF\xA0]/;
        var i = text.length, r = i % 8;
        DUFF: {
          while (r--) {
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
          }
          while (i) {
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
            if (!regSpace.test(text.charAt(--i))) { break DUFF; }
          }
        }
        
        text = text.substring(0, i + 1);
      }
      return text;
    }

    static canonicalizeUrl(url: string, inherit: boolean = true): string {
      var ret;
      // Trim
      ret = this.trim(url);
      // Remove string of starting with an invalid character
      ret = ret.replace(/["`^|\\<>{}\[\]\s!'()*].*/, '');
      // Convert to absolute path
      ret = /^[\w\-]+:/i.test(ret) ? ret : (function (url, a) { a.href = url; return a.href; })(ret, document.createElement('a'));
      // Convert to UTF-8 encoded values
      ret = encodeURI(decodeURI(ret));
      // Fix case of percent encoding
      ret = inherit ? justifyPercentEncodingUrlCase(url, ret) : ret.replace(/(?:%\w{2})+/g, replaceLowerToUpper);
      function replaceLowerToUpper(str) {
        return str.toUpperCase();
      }
      return ret;
    }

    static compareUrl(first: string, second: string, canonicalize?: boolean): boolean {
      if (canonicalize) {
        first = this.canonicalizeUrl(first);
        second = this.canonicalizeUrl(second);
      }

      // URLのパーセントエンコーディングの大文字小文字がAndroidのアドレスバーとリンクで異なるためそろえる
      return first === justifyPercentEncodingUrlCase(first, second);
    }

  }

  // private
  function justifyPercentEncodingUrlCase(base: string, target: string): string {
    return base === target ? target : target.replace(/(?:%\w{2})+/g, replace);
    function replace(str) {
      var i = ~base.indexOf(str.toUpperCase()) || ~base.indexOf(str.toLowerCase());
      return i ? base.substr(~i, str.length) : str;
    }
  }

}
