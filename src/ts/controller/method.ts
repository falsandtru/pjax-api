/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  var M: ModelInterface
  var C: ControllerInterface

  export class ControllerMethod extends ControllerFunction {

    constructor(controller: ControllerInterface, model: ModelInterface) {
      super(controller, model);
    }

  }

}
