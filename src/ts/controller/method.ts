/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  var M: ModelInterface
  var C: ControllerInterface
  var S: Methods

  export class Methods {

    constructor(model: ModelInterface, controller: ControllerInterface) {
      M = model;
      C = controller;
      S = this;
      SEAL(this);
    }

  }

}
