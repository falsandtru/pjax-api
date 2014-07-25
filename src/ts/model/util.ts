/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export declare class UtilInterface {
    static canonicalizeUrl(url: string): string
    static trim(text: string): string
    static fire(fn: any, context: Object, args: any[], async: boolean): any
  }

  export class Util implements UtilInterface {

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
      ret = ret.replace(/(?:%\w{2})+/g, function (str) {
        return url.match(str.toLowerCase()) || str;
      });
      return ret;
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

    static fire(fn: any, context: Object = window, args: any[]= [], async: boolean = false): any {
      if ('function' === typeof fn) { return async ? setTimeout(function () { fn.apply(context || window, args) }, 0) : fn.apply(context || window, args); } else { return fn; }
    }

  }

  export var UTIL = MODEL.Util

}
