/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.log.ts"/>
/// <reference path="data.store.server.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataCookie implements DataCookieInterface {
    constructor(age: number) {
      this.age_ = age;
    }

    age_: number

    getCookie(key: string): string {
      var reg = new RegExp('(?:^|; )(' + encodeURIComponent(key) + '=[^;]*)'),
          data = (document.cookie.match(reg) || []).pop();

      return data && decodeURIComponent(data.split('=').pop());
    }

    setCookie(key: string, value: string, option: CookieOptionInterface = <CookieOptionInterface>{}): string {
      option.age = option.age || this.age_;
      document.cookie = [
        encodeURIComponent(key) + '=' + encodeURIComponent(value),
        option.age    ? '; expires=' + new Date(new Date().getTime() + option.age * 1000).toUTCString() : '',
        option.path   ? '; path=' + option.path : '',
        option.domain ? '; domain=' + option.domain : '',
        option.secure ? '; secure' : ''
      ].join('');
      return this.getCookie(key);
    }

  }
}
