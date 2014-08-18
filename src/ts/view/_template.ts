/// <reference path="../define.ts"/>

/* VIEW */

module MODULE.VIEW {
  /**
   * View of MVC
   * 
   * @class View
   * @constructor
   * @param {JQuery|HTMLElement} [context] 監視するDOM要素を設定する。
   */
  var C: ControllerInterface
  
  export class Template {

    constructor(public model_: ModelInterface, public controller_: ControllerInterface, context: ContextInterface, ...args: any[]) {
      C = controller_;
      this.UUID = GEN_UUID();
      this.CONTEXT = context;
      this.OBSERVE.apply(this, args);
      this.state_ = 0
    }

    /**
     * UUID
     * 
     * @property UUID
     * @type String
     */
    UUID: string
    
    /**
     * Viewのコンストラクタに渡された引数が設定される。
     * 
     * @property context
     * @type {JQuery|Window|Document|HTMLElement}
     */
    CONTEXT: ContextInterface

    /**
     * Viewの遷移状態を持つ
     * 
     * @property state_
     * @type {State}
     */
    state_: State = State.wait

    queue_: any[] = [] // $.deferred()

    /**
     * 内部イベントを監視する。
     * 
     * @method OBSERVE
     */
    OBSERVE(...args: any[]): any { }

    /**
     * 内部イベントの監視を終了する。
     * 
     * @method RELEASE
     */
    RELEASE(...args: any[]): any { }

    /**
     * 外部イベントを監視する。
     * 
     * @method BIND
     * @param {String} selector jQueryセレクタ
     * @chainable
     */
    BIND(...args: any[]): any {
      this.UNBIND();
      return this;
    }
    /**
     * 外部イベントの監視を解除する。
     * 
     * @method UNBIND
     * @param {String} selector jQueryセレクタ
     * @chainable
     */
    UNBIND(...args: any[]): any {
      return this;
    }

    /**
     * Viewが監視する内部イベント名のリスト
     * 
     * @property EVENTS
     * @type {Object}
     * @static
     */
    static EVENTS = { }

    /**
     * Viewが発生させる外部イベント名のリスト
     * 
     * @property TRIGGERS
     * @type {Object}
     * @static
     */
    static TRIGGERS = { }

    /**
     * Viewが待ち受けるイベントに設定されるイベントハンドラのリスト
     * 
     * @property HANDLERS
     * @type {Object}
     */
    HANDLERS = { }
    
  }
}
