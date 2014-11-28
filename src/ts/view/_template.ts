/// <reference path="../define.ts"/>

/* VIEW */

module MODULE.VIEW {

  export class Template {

    constructor(state: State) {
      this.state_ = state;
    }

    /**
     * UUID
     * 
     * @property UUID
     * @type String
     */
    UUID: string = UUID()
    
    /**
     * Viewの遷移状態を持つ
     * 
     * @property state_
     * @type {State}
     */
    protected state_: State = State.blank

  }

}
