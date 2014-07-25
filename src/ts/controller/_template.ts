/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {
  /**
   * @class Controller
   */
  var M: ModelInterface
  var C: Template

  export class Template {

    constructor(model: ModelInterface) {
      M = model;
      C = this;
      this.UUID = GEN_UUID();
      // プラグインに関数を設定してネームスペースに登録
      // $.mvc.func, $().mvc.funcとして実行できるようにするための処理
      if (NAMESPACE && NAMESPACE == NAMESPACE.window) {
        NAMESPACE[NAME] = this.EXEC;
      } else {
        NAMESPACE[NAME] = NAMESPACE.prototype[NAME] = this.EXEC;
      }

      var f = new CONTROLLER.ControllerFunction(<Main>C, M);
      // コンテクストに関数を設定
      this.REGISTER_FUNCTIONS(NAMESPACE[NAME], f);
      // コンテクストのプロパティを更新
      this.UPDATE_PROPERTIES(NAMESPACE[NAME], f);
      this.OBSERVE();
      this.state_ = 0;
    }

    /**
     * UUID
     * 
     * @property UUID
     * @type String
     */
    UUID: string
    
    /**
     * Controllerのコンストラクタに渡された引数が設定される。
     * 
     * @property context
     * @type {JQuery|Window|Document|HTMLElement}
     */
    CONTEXT: any
    
    /**
     * Controllerの遷移状態を持つ
     * 
     * @property state_
     * @type {State}
     */
    state_: State = State.wait
    
    /**
     * 与えられたコンテクストに拡張機能を設定する。
     * 
     * @method EXTEND
     * @param {JQuery|Object|Function} context コンテクスト
     * @chainable
     */
    EXTEND(context): any {
      if (context === NAMESPACE || NAMESPACE && NAMESPACE == NAMESPACE.window) {
        var m = new CONTROLLER.ControllerFunction(<Main>C, M);

        // コンテクストをプラグインに変更
        context = NAMESPACE[NAME];
      } else
        var m = new CONTROLLER.ControllerMethod(<Main>C, M);

        // $().mvc()として実行された場合の処理
        if (context instanceof NAMESPACE) {
          if (context instanceof jQuery) {
            // コンテクストへの変更をend()で戻せるようadd()
            context = context.add();
          }
          // コンテクストに関数とメソッドを設定
          this.REGISTER_FUNCTIONS(context, m);
        }
      // コンテクストのプロパティを更新
      this.UPDATE_PROPERTIES(context, m);
      return context;
    }
    
    /**
     * 拡張モジュール本体のインターフェイス。
     * 
     * @method EXEC
     * @param {Any} [params]* パラメータ
     */
    EXEC(...args: any[]): any {
      var context = C.EXTEND(this);
      args = [context].concat(args);
      args = C.exec_.apply(C, args);
      args = args instanceof Array ? args : [args];
      return (<MODEL.Main>M).MAIN.apply(M, args);
    }
    /**
     * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き換える。戻り値の配列が`MAIN`および`main_`へ渡す引数のリストとなる。
     * 
     * @method exec_
     * @param {Object} context
     * @param {Any} [params]* args
     */
    exec_(context: any, ...args: any[]): any {
      return [context].concat(args);
    }

    /**
     * 拡張の関数を更新する
     * 
     * @method REGISTER_FUNCTIONS
     * @param {JQuery|Object|Function} context コンテクスト
     * @return {JQuery|Object|Function} context コンテクスト
     */
    REGISTER_FUNCTIONS(context, funcs): any {
      var props = CONTROLLER.Template.PROPERTIES;

      var i;
      for (i in funcs) {
        context[i] = funcs[i];
      }
      return context;
    }
    
    /**
     * 拡張のプロパティを更新する
     * 
     * @method UPDATE_PROPERTIES
     * @param {JQuery|Object|Function} context コンテクスト
     * @param {Object} funcs プロパティのリスト
     * @return {JQuery|Object|Function} context コンテクスト
     */
    UPDATE_PROPERTIES(context, funcs): any {
      var props = CONTROLLER.Template.PROPERTIES;

      var i, len, prop;
      for (i = 0, len = props.length; i < len; i++) {
        prop = props[i];
        if (funcs[prop]) {
          context[prop] = funcs[prop].call(context);
        }
      }
      return context;
    }

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
     * Controllerが監視する内部イベント名のリスト
     * 
     * @property EVENTS
     * @type {Object}
     * @static
     */
    static EVENTS = { }
    
    /**
     * 拡張機能として組み込む関数のリスト
     * 
     * @property FUNCTIONS
     * @type {Object}
     * @static
     */
    static FUNCTIONS = { }
    
    /**
     * 拡張機能として組み込むメソッドのリスト
     * 
     * @property METHODS
     * @type {Object}
     * @static
     */
    static METHODS = { }
    
    /**
     * 拡張機能として組み込むプロパティのリスト
     * 
     * @property PROPERTIES
     * @type {Object}
     * @static
     */
    static PROPERTIES = []
    
    /**
     * Controllerが発生させる外部イベント名のリスト
     * 
     * @property TRIGGERS
     * @type {Object}
     * @static
     */
    static TRIGGERS = { }
    
    /**
     * Controllerが待ち受けるイベントに設定されるイベントハンドラのリスト
     * 
     * @property HANDLERS
     * @type {Object}
     */
    HANDLERS = { }

  }

}
