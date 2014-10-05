/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* VIEW */

module MODULE.VIEW {
  
  export class Main extends Template implements ViewInterface {

    constructor(private model_: ModelInterface, private controller_: ControllerInterface, private context_: JQuery, setting: SettingInterface) {
      super(State.initiate);
      this.observe_(setting);
    }

    private observe_(setting: SettingInterface): ViewInterface {
      this.release_(setting);
      this.context_
      .delegate(setting.link, setting.nss.click, this.handlers.click)
      .delegate(setting.form, setting.nss.submit, this.handlers.submit);
      jQuery(window).bind(setting.nss.popstate, this.handlers.popstate);

      setting.fix.scroll &&
      jQuery(window).bind(setting.nss.scroll, this.handlers.scroll);
      return this;
    }
    private release_(setting: SettingInterface): ViewInterface {
      this.context_
      .undelegate(setting.link, setting.nss.click)
      .undelegate(setting.form, setting.nss.submit);
      jQuery(window).unbind(setting.nss.popstate);

      setting.fix.scroll &&
      jQuery(window).unbind(setting.nss.scroll);
      return this;
    }

    // VIEWの待ち受けるイベントに登録されるハンドラ
    handlers = {
      click: (...args: any[]): void => {
        this.controller_.click.apply(this.controller_, args);
      },
      submit: (...args: any[]): void => {
        this.controller_.submit.apply(this.controller_, args);
      },
      popstate: (...args: any[]): void => {
        this.controller_.popstate.apply(this.controller_, args);
      },
      scroll: (...args: any[]): void => {
        this.controller_.scroll.apply(this.controller_, args);
      }
    }
    
  }

}

module MODULE {
  export var View = VIEW.Main
}
