/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {

  export class Main extends Template implements ControllerInterface {

    constructor(private model_: ModelInterface) {
      super(model_, State.initiate);
      this.FUNCTIONS = new Functions();
      this.METHODS = new Methods();
      this.REGISTER(model_);
      FREEZE(this);
    }
    
    exec_($context: ExtensionInterface, setting: PjaxSetting): any[]
    exec_($context: ExtensionStaticInterface, option: any): any[]
    exec_($context: any): any[] {
      var args = [].slice.call(arguments, 1, 2),
          option = args[0];

      switch (typeof option) {
        case 'undefined':
        case 'object':
          break;
        default:
          return $context;
      }

      return [$context].concat(args);
    }

    click(args: IArguments): void {
      this.model_.click.apply(this.model_, args);
    }
    submit(args: IArguments): void {
      this.model_.submit.apply(this.model_, args);
    }
    popstate(args: IArguments): void {
      this.model_.popstate.apply(this.model_, args);
    }
    scroll(args: IArguments): void {
      this.model_.scroll.apply(this.model_, args);
    }

  }

  export class Singleton {

    constructor(model: ModelInterface = Model.singleton()) {
      Singleton.instance_ = Singleton.instance_ || new Main(model);
    }

    private static instance_: Main

    static singleton(): Main {
      return Singleton.instance_;
    }

    singleton(): Main {
      return Singleton.singleton();
    }

  }

}

module MODULE {
  export var Controller = CONTROLLER.Singleton
}
