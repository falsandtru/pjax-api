/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class Cookie implements CookieInterface {
    constructor(age: number) {
      this.age_ = age;
    }

    age_: number

    getCookie(key: string): string {
      if (!key || !window.navigator.cookieEnabled) { return; }

      var reg = new RegExp('(?:^|; )(' + encodeURIComponent(key) + '=[^;]*)'),
          data = (document.cookie.match(reg) || []).pop();

      return data && decodeURIComponent(data.split('=').pop());
    }

    setCookie(key: string, value: string, option: CookieOptionInterface = <CookieOptionInterface>{}): string {
      if (!key || !window.navigator.cookieEnabled) { return; }

      option.age = option.age || this.age_;
      document.cookie = [
        encodeURIComponent(key) + '=' + encodeURIComponent(value),
        option.age    ? '; expires=' + new Date(new Date().getTime() + option.age * 1000).toUTCString() : '',
        //option.path   ? '; path=' + option.path : '',
        //option.domain ? '; domain=' + option.domain : '',
        option.secure ? '; secure' : ''
      ].join('');
      return this.getCookie(key);
    }

  }

}
