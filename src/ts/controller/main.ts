/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {

  export class Main extends Template implements ControllerInterface {

    constructor(public model_: ModelInterface) {
      super(model_);
    }

    exec_($context: JQuery, option) {
      $context = $context instanceof jQuery ? $context : this.EXTEND(jQuery(document));

      var pattern;
      pattern = $context instanceof NAMESPACE ? 'm:' : 'f:';
      pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
      switch (pattern.toLowerCase()) {
      }

      return [$context, option];
    }

    // CONTROLLERが監視する内部イベントを登録
    OBSERVE() { }

    CLICK(...args: any[]): void {
      this.model_.CLICK.apply(this.model_, args);
    }
    SUBMIT(...args: any[]): void {
      this.model_.SUBMIT.apply(this.model_, args);
    }
    POPSTATE(...args: any[]): void {
      this.model_.POPSTATE.apply(this.model_, args);
    }
    SCROLL(...args: any[]): void {
      this.model_.SCROLL.apply(this.model_, args);
    }

    //内部イベント
    static EVENTS = { }

    // プラグインに登録されるプロパティ
    static PROPERTIES = []

    // プラグインが実行するイベント名
    static TRIGGERS = { }

    // CONTROLLERの待ち受けるイベントに登録されるハンドラ
    HANDLERS = { }

  }

}

module MODULE {
  export var Controller = CONTROLLER.Main
}
