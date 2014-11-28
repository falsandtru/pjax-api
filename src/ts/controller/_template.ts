/// <reference path="../define.ts"/>
/// <reference path="../model/_template.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {

  export class Template {

    constructor(model: ModelInterface, state: State) {
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
     * Controllerの遷移状態を持つ
     * 
     * @property state_
     * @type {State}
     */
    protected state_: State = State.blank

    /**
     * Controllerの関数オブジェクト
     * 
     * @property FUNCTIONS
     * @type {Functions}
     */
    protected FUNCTIONS: Functions
    
    /**
     * Controllerのメソッドオブジェクト
     * 
     * @property METHODS
     * @type {Methods}
     */
    protected METHODS: Methods
    
    /**
     * 拡張モジュール本体。
     * 
     * @property EXTENSION
     * @type {ExtensionStaticInterface}
     */
    protected EXTENSION: ExtensionStaticInterface

    /**
     * 与えられたコンテクストに拡張機能を設定する。
     * 
     * @method EXTEND
     * @param {JQuery|Object|Function} context コンテクスト
     * @chainable
     */
    protected EXTEND(context: ExtensionInterface): ExtensionInterface
    protected EXTEND(context: ExtensionStaticInterface): ExtensionStaticInterface
    protected EXTEND(context: any): any {
      if (context instanceof DEF.NAMESPACE) {
        if (context instanceof jQuery) {
          // コンテクストへの変更をend()で戻せるようadd()
          context = context.add();
        }
        // コンテクストに関数を設定
        this.REGISTER_FUNCTION(context);
        // コンテクストにメソッドを設定
        this.REGISTER_METHOD(context);
      } else {
        if (context !== this.EXTENSION) {
          // コンテクストを拡張に変更
          context = this.EXTENSION;
        }
        // コンテクストに関数を設定
        this.REGISTER_FUNCTION(context);
      }
      // コンテクストのプロパティを更新
      this.UPDATE_PROPERTIES(context);
      return context;
    }
    
    /**
     * 拡張モジュール本体のスコープ。
     * 
     * @method REGISTER
     * @param {Any} [params]* パラメータ
     */
    protected REGISTER(model): void {
      var S = this;
      this.EXTENSION = this.EXTENSION || <ExtensionStaticInterface>function (...args: any[]) {
        var context = S.EXTEND(this);
        args = [context].concat(args);
        args = S.EXEC.apply(S, args);
        return args instanceof Array ? model.MAIN.apply(model, args) : args;
      };
      this.EXTEND(this.EXTENSION);

      // プラグインに関数を設定してネームスペースに登録
      window[DEF.NAMESPACE] = window[DEF.NAMESPACE] || {};
      if (DEF.NAMESPACE.prototype) {
        DEF.NAMESPACE[DEF.NAME] = DEF.NAMESPACE.prototype[DEF.NAME] = this.EXTENSION;
      } else {
        DEF.NAMESPACE[DEF.NAME] = this.EXTENSION;
      }
    }

    /**
     * 拡張モジュール本体を実行したときに呼び出される。
     * 
     * @method EXEC
     * @param {Object|Functin} context
     * @param {Any} [params]* args
     */
    protected EXEC(context: ExtensionInterface, ...args: any[]): any[]
    protected EXEC(context: ExtensionStaticInterface, ...args: any[]): any[]
    protected EXEC(): any {
      return this.exec_.apply(this, arguments);
    }

    /**
     * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き換える。
     * 戻り値が配列であれば`MAIN`および`main_`へ渡す引数のリストとなり、配列以外であれば以降の処理を行わず戻り値を返す。
     * 主にモデルへ渡す引数のフィルターとして使用する。
     * 
     * @method exec_
     * @param {Object|Functin} context
     * @param {Any} [params]* args
     */
    protected exec_(context: ExtensionInterface, ...args: any[]): any[]
    protected exec_(context: ExtensionStaticInterface, ...args: any[]): any[]
    protected exec_(context: any, ...args: any[]): any {
      return [context].concat(args);
    }

    /**
     * 拡張の関数を更新する
     * 
     * @method REGISTER_FUNCTIONS
     * @param {JQuery|Object|Function} context コンテクスト
     * @return {JQuery|Object|Function} context コンテクスト
     */
    protected REGISTER_FUNCTION(context: ExtensionInterface): ExtensionInterface
    protected REGISTER_FUNCTION(context: ExtensionStaticInterface): ExtensionStaticInterface
    protected REGISTER_FUNCTION(context: any): any {
      var funcs = this.FUNCTIONS;
      for (var i in funcs) {
        if ('constructor' === i) { continue; }
        context[i] = funcs[i];
      }
      return context;
    }

    /**
     * 拡張のメソッドを更新する
     * 
     * @method REGISTER_FUNCTIONS
     * @param {JQuery|Object|Function} context コンテクスト
     * @return {JQuery|Object|Function} context コンテクスト
     */
    protected REGISTER_METHOD(context: ExtensionInterface): ExtensionInterface
    protected REGISTER_METHOD(context: ExtensionStaticInterface): ExtensionStaticInterface
    protected REGISTER_METHOD(context: any): any {
      var METHODS = this.METHODS;
      for (var i in METHODS) {
        if ('constructor' === i) { continue; }
        context[i] = METHODS[i];
      }
      return context;
    }
    
    /**
     * 拡張のプロパティを指定する
     * 
     * @property PROPERTIES
     * @type {String}
     */
    protected PROPERTIES: string[] = []

    /**
     * 拡張のプロパティを更新する
     * 
     * @method UPDATE_PROPERTIES
     * @param {JQuery|Object|Function} context コンテクスト
     * @param {Object} funcs プロパティのリスト
     * @return {JQuery|Object|Function} context コンテクスト
     */
    protected UPDATE_PROPERTIES(context: ExtensionInterface): ExtensionInterface
    protected UPDATE_PROPERTIES(context: ExtensionStaticInterface): ExtensionStaticInterface
    protected UPDATE_PROPERTIES(context: any): any {
      var props = this.PROPERTIES;

      var i, len, prop;
      for (i = 0, len = props.length; i < len; i++) {
        if ('constructor' === i) { continue; }
        prop = props[i];
        if (context[prop]) {
          context[prop] = context[prop]();
        }
      }
      return context;
    }

  }

}
