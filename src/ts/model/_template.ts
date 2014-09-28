/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL {
  /**
   * Model of MVC
   * 
   * @class Model
   */
  export class Template {
    constructor() {
      this.UUID = GEN_UUID();
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
    UUID: string
    
    /**
     * Modelの遷移状態を持つ
     * 
     * @property state_
     * @type {State}
     */
    state_: State = State.wait

    /**
     * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き変えない。
     * 
     * @method MAIN
     */
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
    main_(context: any, ...args: any[]): any {
      this.state_ = State.ready;
      return context;
    }
    
    /**
    /**
     * 他のインスタンスとの共有データ保存用オブジェクト。
     * 
     * @property store
     * @type Object
     * @static
     */
    static store: (key: string, value?: any, merge?: boolean) => any = function store(key: string, value?: any, merge?: boolean): any {
      switch (arguments.length) {
        case 0:
          break;
        case 1:
          // 共有データを取得
          return Template.store[key];
        case 2:
          // 共有データを設定
          return Template.store[key] = value;
        case 3:
          return Template.store[key] = jQuery.extend(true, Template.store[key], value);
      }
    }

    /**
     * `new`をつけて実行した場合、MVCインスタンスごとの個別データ保存用のデータオブジェクトの操作となる。
     * メソッドとして実行した場合、MVCインスタンスをまたぐ共有データ保存用の操作となる。
     * 
     * 個別データ操作
     * + add: new stock()
     *   インスタンス別のデータオブジェクトを返す。`uuid`プロパティにuuidが設定される。
     * + add: new stock(Data: object/function/array, ...)
     *   データオブジェクトに可変数の引数のオブジェクトのプロパティを追加して返す。`uuid`プロパティは上書きされない。
     * + get: stock(uuid: string)
     *   データオブジェクトを取得する。
     * + del: new stock(uuid: string)
     *   データオブジェクトを削除する。
     * 
     * 共有データ操作
     * + set: stock(key: string, value: any)
     *   key-valueで共有データを保存する。
     * + set: stock(key: string, value: any, true)
     *   共有データをマージ保存する。
     * + set: stock(data: object)
     *   オブジェクトのプロパティをkey-valueのセットとして共有データを保存する。
     * + get: stock(key: string)
     *   共有データを取得する。
     * + del: stock(key: string, undefined)
     *   共有データを空データの保存により削除する。
     * 
     * @method stock
     * @param {String} key
     * @param {Any} value
     * @param {Boolean} merge
     */
    stock: any = function stock(key?: any, value?: any, merge?: boolean): any {
      if (this instanceof stock || this.constructor.toString() === stock.toString()) {
        // 個別データ操作
        switch (typeof key) {
          case 'object':
          case 'function':
            this.uuid = GEN_UUID();
            stock[this.uuid] = this;
            return jQuery.extend.apply(jQuery, [true, this].concat([].slice.call(arguments)).concat({ uuid: this.uuid }));
          case 'string':
            return delete stock[key];
        }
      } else if ('object' === typeof key) {
        // 共有データ操作
        var keys = <Object>key, iKeys;
        for (iKeys in keys) { Template.store(iKeys, keys[iKeys]); }
      } else {
        // 共有データ操作
        switch (arguments.length) {
          case 0:
            // `new stock()`にリダイレクト
            return new this.stock();
          case 1:
            // インスタンス別のデータオブジェクトまたは共有データを取得
            return stock[key] || Template.store(key);
          case 2:
            // 共有データを保存
            return Template.store(key, value);
          case 3:
            return Template.store(key, value, merge);
        }
      }
    }
    
    /*
    // FactoryMethodパターン
    // サブクラスを作成して利用する機能のフォーマット
    static Factory() {
      this.uuid = this.UUID();
    }

    // Commandパターン
    // 複雑な処理を代行させる機能のフォーマット
    static Command() {
      this.uuid = this.UUID();
    }
    */
  }
}
