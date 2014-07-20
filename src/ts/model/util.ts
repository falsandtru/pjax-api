/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* MODEL */

module MODULE {
  // Allow access:

  // Deny access
  var M: void, V: void, C: void;

  export interface ModelUtilInterface {
    canonicalizeUrl(url: string): string
    trim(text: string): string
    fire(fn: any, context: Object, args: any[], async: boolean): any
  }
  export class ModelUtil extends ModelTemplate implements ModelUtilInterface {

    canonicalizeUrl(url: string): string {
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

    trim(text: string): string {
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

    fire(fn: any, context: Object = window, args: any[] = [], async: boolean = false): any {
      if ('function' === typeof fn) { return async ? setTimeout(function () { fn.apply(context || window, args) }, 0) : fn.apply(context || window, args); } else { return fn; }
    }

  }
  // 短縮登録
  export var UTIL = new ModelUtil();
}
