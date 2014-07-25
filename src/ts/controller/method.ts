/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  var M: ModelInterface
  var C: ControllerInterface

  export class ControllerMethod extends ControllerFunction implements MethodInterface {

    constructor(controller: ControllerInterface, model: ModelInterface) {
      super(controller, model);
    }

  }

}
