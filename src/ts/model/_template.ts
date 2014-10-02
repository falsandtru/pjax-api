/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL {

  export class Template {

    constructor(state: State) {
      this.state_ = state;
    }

    /**
     * 拡張モジュール名。ネームスペースにこの名前のプロパティでモジュールが追加される。
     * 
     * @property NAME
     * @type String
     */
    NAME: string = NAME
    
    /**
     * ネームスペース。ここにモジュールが追加される。
     * 
     * @property NAMESPACE
     * @type Window|JQuery
     */
    NAMESPACE: any = NAMESPACE

    /**
     * UUID
     * 
     * @property UUID
     * @type String
     */
    UUID: string = GEN_UUID()
    
    /**
     * Modelの遷移状態を持つ
     * 
     * @property state_
     * @type {State}
     */
    state_: State = State.blank

    /**
     * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き変えない。
     * 
     * @method MAIN
     */
    MAIN(context: ExtensionInterface, ...args: any[]): any
    MAIN(context: ExtensionStaticInterface, ...args: any[]): any
    MAIN(context: any, ...args: any[]): any {
      return this.main_.apply(this, [context].concat(args));
    }
    /**
     * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き換える。
     * 
     * @method main_
     * @param {Object} context
     * @param {Any} [params]* args
     */
    main_(context: ExtensionInterface, ...args: any[]): any
    main_(context: ExtensionStaticInterface, ...args: any[]): any
    main_(context: any, ...args: any[]): any {
      return context;
    }
    
  }

}
