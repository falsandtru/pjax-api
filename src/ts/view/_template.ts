/// <reference path="../define.ts"/>
/// <reference path="../model/main.ts"/>

/* VIEW */

module MODULE {
  /**
   * View of MVC
   * 
   * @class View
   * @constructor
   * @param {JQuery|HTMLElement} [context] 監視するDOM要素を設定する。
   */
  export class ViewTemplate {
    
    constructor(context?: ContextInterface) {
      this.UUID = M.GEN_UUID();
      switch (arguments.length) {
        case 0:
          break;
        case 1:
          this.CONTEXT = context;
          this.OBSERVE();
          break;
      }
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
    OBSERVE(): any { }

    /**
     * 内部イベントの監視を終了する。
     * 
     * @method RELEASE
     */
    RELEASE(): any { }

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
