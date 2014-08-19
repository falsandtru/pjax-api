/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* MODEL */

module MODULE.MODEL {

  export class Utility {

    /* string */

    static trim(text: string): string {
      text = 'string' === typeof text ? text : String(0 === <any>text && text.toString() || '');
      if (text.trim) {
        text = text.trim();
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

    static repeat(text: string, size: number): string
    
    /* array */
    
    static repeat(arr: any[], size: number): any[]
    static repeat(arg: any, size: number): any{
      switch (arg instanceof Array && 'array' || typeof arg) {
        case 'string':
          var text = arg;
          return Array(size + 1).join(text);
        case 'array':
          var len = arg.length;
          if (size < 300) {
            var arr = Array(size);
            that.duff(-size, (i) => arr[i] = arg[i % len]);
          } else {
            var arr = <any[]>arg.slice();
            while (arr.length * 2 <= size) {
              arr = arr.concat(arr);
            }
            arr = arr.concat(arr.slice(0, size - arr.length));
          }
          return arr;
      }
    }

    /* function */

    static fire(fn: any, context: Object = window, args: any[]= [], async?: boolean): any {
      if ('function' === typeof fn) { return async ? setTimeout(function () { fn.apply(context || window, args) }, 0) : fn.apply(context || window, args); } else { return fn; }
    }

    static duff(loop: number, proc: (index?: number) => void): void {
      if (loop < 0) {
        var i = -loop, r = i % 8;
        while (r--) {
          proc(--i);
        }
        while (i) {
          proc(--i);
          proc(--i);
          proc(--i);
          proc(--i);
          proc(--i);
          proc(--i);
          proc(--i);
          proc(--i);
        }
      } else {
        var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
        while (r--) {
          proc(i++);
        }
        while (q--) {
          proc(i++);
          proc(i++);
          proc(i++);
          proc(i++);
          proc(i++);
          proc(i++);
          proc(i++);
          proc(i++);
        }
      }
    }

    static duffEx(loop: number, proc: (index?: number) => boolean): void {
      if (loop < 0) {
        var i = -loop, r = i % 8;
        DUFF: {
          while (r--) {
            if (false === proc(--i)) { break DUFF; }
          }
          while (i) {
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
            if (false === proc(--i)) { break DUFF; }
          }
        }
      } else {
        var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
        DUFF: {
          while (r--) {
            if (false === proc(i++)) { break DUFF; }
          }
          while (q--) {
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
            if (false === proc(i++)) { break DUFF; }
          }
        }
      }
    }

    /* other */

    static canonicalizeUrl(url: string, strict: boolean = false): string {
      var ret;
      // Trim
      ret = that.trim(url);
      // Remove string of starting with an invalid character
      ret = ret.replace(/["`^|\\<>{}\[\]\s!'()*].*/, '');
      // Convert to absolute path
      ret = /^[\w\-]+:/i.test(ret) ? ret : (function (url, a) { a.href = url; return a.href; })(ret, document.createElement('a'));
      // Convert to UTF-8 encoded string
      ret = encodeURI(decodeURI(ret));
      // Fix case of percent encoding
      ret = strict ? ret.replace(/(?:%\w{2})+/g, replaceLowerToUpper) : justifyPercentEncodingUrlCase(url, ret);
      function replaceLowerToUpper(str) {
        return str.toUpperCase();
      }
      return ret;
    }

    static compareUrl(first: string, second: string, canonicalize?: boolean): boolean {
      if (canonicalize) {
        first = that.canonicalizeUrl(first);
        second = that.canonicalizeUrl(second);
      }

      // URLのパーセントエンコーディングの大文字小文字がAndroidのアドレスバーとリンクで異なるためそろえる
      return first === justifyPercentEncodingUrlCase(first, second);
    }

  }

  var that = Utility
  export var Util = MODEL.Utility

  // private

  function justifyPercentEncodingUrlCase(base: string, target: string): string {
    return base === target ? target : target.replace(/(?:%\w{2})+/g, replace);
    function replace(str) {
      var i = ~base.indexOf(str.toUpperCase()) || ~base.indexOf(str.toLowerCase());
      return i ? base.substr(~i, str.length) : str;
    }
  }

}
