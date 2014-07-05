/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="../model/main.ts"/>

/* CONTROLLER */

module MODULE {
  // Allow access:
  //  M, C

  // Deny access
  var V: void, APP: void, DATA: void;

  export class ControllerMain extends ControllerTemplate implements ControllerInterface {

    exec_($context: JQuery, option) {
      $context = $context instanceof jQuery ? $context : C.EXTEND(jQuery(document));

      var pattern;
      pattern = $context instanceof NAMESPACE ? 'm:' : 'f:';
      pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
      switch (pattern.toLowerCase()) {
        case 'm:undefined':
          option = {};
          break;
      }

      return [$context, option];
    }

    // CONTROLLERが監視する内部イベントを登録
    OBSERVE() { }

    CLICK(...args: any[]): void {
      M.CLICK.apply(M, args);
    }
    SUBMIT(...args: any[]): void {
      M.SUBMIT.apply(M, args);
    }
    POPSTATE(...args: any[]): void {
      M.POPSTATE.apply(M, args);
    }
    SCROLL(...args: any[]): void {
      M.SCROLL.apply(M, args);
    }

    //内部イベント
    static EVENTS = {
      CHANGE: M.NAME + '.change'
    }

    // プラグインに登録されるプロパティ
    static PROPERTIES = []

    // プラグインが実行するイベント名
    static TRIGGERS = { }

    // CONTROLLERの待ち受けるイベントに登録されるハンドラ
    HANDLERS = { }

  }
  // 短縮登録
  export var Controller = ControllerMain;
  export var C = new Controller();
}
