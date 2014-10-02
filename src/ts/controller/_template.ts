/// <reference path="../define.ts"/>
/// <reference path="../model/_template.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>

/* CONTROLLER */

module MODULE.CONTROLLER {

  export class Template {

    constructor(model: ModelInterface, state: State) {
      this.state_ = state;
      this.FUNCTIONS = new Functions(model, <any>this);
      this.METHODS = new Methods(model, <any>this);
      this.REGISTER(model);
    }

    /**
     * UUID
     * 
     * @property UUID
     * @type String
     */
    UUID: string = GEN_UUID()
    
    /**
     * Controllerの遷移状態を持つ
     * 
     * @prperty state_
     * @type {State}
     */
    state_: State = State.blank

    /**
     * Controllerの関数オブジェクト
     * 
     * @prperty FUNCTIONS
     * @type {Functions}
     */
    FUNCTIONS: Functions
    
    /**
     * Controllerのメソッドオブジェクト
     * 
     * @prperty METHODS
     * @type {Methods}
     */
    METHODS: Methods
    
    /**
     * 拡張モジュール本体。
     * 
     * @prperty EXTENSION
     * @type {Function}
     */
    EXTENSION: Function

    /**
     * 与えられたコンテクストに拡張機能を設定する。
     * 
     * @method EXTEND
     * @param {JQuery|Object|Function} context コンテクスト
     * @chainable
     */
    EXTEND(context: ExtensionInterface): ExtensionInterface
    EXTEND(context: ExtensionStaticInterface): ExtensionStaticInterface
    EXTEND(context: any): any {
      if (context instanceof NAMESPACE) {
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
    REGISTER(model): void {
      var S = this;
      this.EXTENSION = this.EXTENSION || function (...args: any[]) {
        var context = S.EXTEND(this);
        args = [context].concat(args);
        args = S.EXEC.apply(S, args);
        return args instanceof Array ? model.MAIN.apply(model, args) : args;
      };
      this.EXTEND(<ExtensionStaticInterface>this.EXTENSION);

      // プラグインに関数を設定してネームスペースに登録
      window[NAMESPACE] = window[NAMESPACE] || {};
      if (NAMESPACE.prototype) {
        NAMESPACE[NAME] = NAMESPACE.prototype[NAME] = this.EXTENSION;
      } else {
        NAMESPACE[NAME] = this.EXTENSION;
      }
    }

    /**
     * 拡張モジュール本体を実行したときに呼び出される。
     * 
     * @method EXEC
     * @param {Object|Functin} context
     * @param {Any} [params]* args
     */
    EXEC(context: ExtensionInterface, ...args: any[]): any[]
    EXEC(context: ExtensionStaticInterface, ...args: any[]): any[]
    EXEC(): any {
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
    exec_(context: ExtensionInterface, ...args: any[]): any[]
    exec_(context: ExtensionStaticInterface, ...args: any[]): any[]
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
    REGISTER_FUNCTION(context: ExtensionInterface): ExtensionInterface
    REGISTER_FUNCTION(context: ExtensionStaticInterface): ExtensionStaticInterface
    REGISTER_FUNCTION(context: any): any {
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
    REGISTER_METHOD(context: ExtensionInterface): ExtensionInterface
    REGISTER_METHOD(context: ExtensionStaticInterface): ExtensionStaticInterface
    REGISTER_METHOD(context: any): any {
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
     * @prperty PROPERTIES
     * @type {String}
     */
    PROPERTIES: string[] = []

    /**
     * 拡張のプロパティを更新する
     * 
     * @method UPDATE_PROPERTIES
     * @param {JQuery|Object|Function} context コンテクスト
     * @param {Object} funcs プロパティのリスト
     * @return {JQuery|Object|Function} context コンテクスト
     */
    UPDATE_PROPERTIES(context: ExtensionInterface): ExtensionInterface
    UPDATE_PROPERTIES(context: ExtensionStaticInterface): ExtensionStaticInterface
    UPDATE_PROPERTIES(context: any): any {
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
