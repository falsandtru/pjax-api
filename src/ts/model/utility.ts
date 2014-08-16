/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class Utility {

    static fire(fn: any, context: Object = window, args: any[]= [], async?: boolean): any {
      if ('function' === typeof fn) { return async ? setTimeout(function () { fn.apply(context || window, args) }, 0) : fn.apply(context || window, args); } else { return fn; }
    }

    static trim(text: string): string {
      text = text || '';
      if (String.prototype.trim) {
        text = text.toString().trim();
      } else {
        if (text = String(text).replace(/^[\s\uFEFF\xA0]+/, '')) {
          for (var i = text.length; --i;) {
            if (/[^\s\uFEFF\xA0]/.test(text.charAt(i))) {
              text = text.substring(0, i + 1);
              break;
            }
          }
        }
      }
      return text;
    }

    static canonicalizeUrl(url: string): string {
      var ret;
      // Trim
      ret = this.trim(url);
      // Remove string starting with an invalid character
      ret = ret.replace(/["`^|\\<>{}\[\]\s].*/, '');
      // Deny value beginning with the string of HTTP(S) other than
      ret = /^https?:/i.test(ret) ? ret : (function (url, a) { a.href = url; return a.href; })(ret, document.createElement('a'));
      // Unify to UTF-8 encoded values
      ret = encodeURI(decodeURI(ret));
      // Fix case
      ret = justifyPercentEncodingUrlCase(url, ret);
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

  export var UTIL = MODEL.Utility

  // private
  function justifyPercentEncodingUrlCase(base: string, target: string): string {
    return base === target ? target : target.replace(/(?:%\w{2})+/g, replace);
    function replace(str) {
      var i = base.indexOf(str.toLowerCase());
      return ~i ? base.substr(i, str.length) : str;
    }
  }

}
