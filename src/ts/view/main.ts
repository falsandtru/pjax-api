/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="../model/main.ts"/>

/* VIEW */

module MODULE {
  // Allow access:
  //  M, V, C

  // Deny access

  export class ViewMain extends ViewTemplate implements ViewInterface {

    // VIEWにする要素を選択/解除する
    BIND(setting: SettingInterface): ViewInterface {
      this.UNBIND(setting);
      this.CONTEXT
      .delegate(setting.link, setting.nss.click, this.HANDLERS.CLICK)
      .delegate(setting.form, setting.nss.submit, this.HANDLERS.SUBMIT);
      jQuery(window).bind(setting.nss.popstate, this.HANDLERS.POPSTATE);

      setting.fix.scroll &&
      jQuery(window).bind(setting.nss.scroll, this.HANDLERS.SCROLL);
      return this;
    }
    UNBIND(setting: SettingInterface): ViewInterface {
      this.CONTEXT
      .undelegate(setting.link, setting.nss.click)
      .undelegate(setting.form, setting.nss.submit);
      jQuery(window).unbind(setting.nss.popstate);

      setting.fix.scroll &&
      jQuery(window).unbind(setting.nss.scroll);
      return this;
    }

    // VIEWが監視する内部イベントを登録
    OBSERVE() {
      this.RELEASE();
      return this;
    }
    RELEASE() {
      return this;
    }

    //内部イベント
    static EVENTS = {
      CHANGE: M.NAME + '.change'
    }

    // プラグインが実行するイベント名
    static TRIGGERS = { }

    // VIEWの待ち受けるイベントに登録されるハンドラ
    HANDLERS = {
      CLICK(...args: any[]): void {
        C.CLICK.apply(C, args);
      },
      SUBMIT(...args: any[]): void {
        C.SUBMIT.apply(C, args);
      },
      POPSTATE(...args: any[]): void {
        C.POPSTATE.apply(C, args);
      },
      SCROLL(...args: any[]): void {
        C.SCROLL.apply(C, args);
      }
    }
    
  }
  // 短縮登録
  export var View = ViewMain;
  export var V = new View();
}
