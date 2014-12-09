/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* VIEW */

module MODULE.VIEW {
  
  export class Main extends Template implements ViewInterface {

    constructor(private model_: ModelInterface, private controller_: ControllerInterface, private context_: JQuery, setting: SettingInterface) {
      super(State.initiate);
      FREEZE(this);
      this.observe_(setting);
    }

    private observe_(setting: SettingInterface): ViewInterface {
      this.release_(setting);
      setting.link && this.context_.delegate(setting.link, setting.nss.event.click, this.handlers.click);
      setting.form && this.context_.delegate(setting.form, setting.nss.event.submit, this.handlers.submit);
      jQuery(window).bind(setting.nss.event.popstate, this.handlers.popstate);

      setting.database.active && setting.fix.scroll &&
      jQuery(window).bind(setting.nss.event.scroll, this.handlers.scroll);
      return this;
    }

    private release_(setting: SettingInterface): ViewInterface {
      setting.link && this.context_.undelegate(setting.link, setting.nss.event.click)
      setting.form && this.context_.undelegate(setting.form, setting.nss.event.submit);
      jQuery(window).unbind(setting.nss.event.popstate);

      setting.database.active && setting.fix.scroll &&
      jQuery(window).unbind(setting.nss.event.scroll);
      return this;
    }

    // VIEWの待ち受けるイベントに登録されるハンドラ
    handlers = {
      click: (): void => {
        this.controller_.click(arguments);
      },
      submit: (): void => {
        this.controller_.submit(arguments);
      },
      popstate: (): void => {
        this.controller_.popstate(arguments);
      },
      scroll: (): void => {
        this.controller_.scroll(arguments);
      }
    }
    
  }

}

module MODULE {
  export var View = VIEW.Main
}
