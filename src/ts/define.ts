/// <reference path="type/jquery.d.ts"/>

module MODULE {

  export var NAME: string = 'pjax';
  export var NAMESPACE: any = jQuery;

  /*
   * 仕様
   * -----
   * 
   * 構成
   * 
   * Rayer:
   * - View
   * - Controller
   * - Model(mvc-interface)
   * - Model(application-rogic)
   * - Model(data-access)
   * 
   * Model:
   * - class ModelMain (mvc-interface)
   *   single instance(M)
   * - class ModelApp (application-logic)
   *   single instance(APP)
   * - class ModelData (data-access)
   *   single instance(DATA)
   * - class ModelUtil
   *   single instance(UTIL)
   * 
   * View
   * - class ViewMain (mvc-interface)
   *   multi instance
   * 
   * Controller
   * - class ControllerMain (mvc-interface)
   *   single instance(C)
   * - class ControllerFunction
   *   single instance
   * - class ControllerMethod
   *   single instance
   * 
   * -----
   * 
   * 規約
   * 
   * - MVCモジュール間のアクセスは各モジュールのインターフェイスを経由し、内部機能(APP/DATA)に直接アクセスしない。
   * - UTILはどこからでも自由に使用してよい。
   * - モデルインターフェイスへ渡されるデータはすべて正規化、検疫されてないものとして自身で正規化、検疫する。
   * - モデルのインターフェイスより下のレイヤーのメソッドは引数のパターンを省略を除いて固定し、ポリモーフィズムやオーバーロードを使用しない。
   * - モデルインターフェイスもViewやControllerの機能の実体を実装するメソッドは同様とする。
   * 
   */
  // Model
  export declare class ModelInterface {
    constructor()
    // テンプレート
    NAME: string
    NAMESPACE: any

    // プロパティ
    state_: State
    isDeferrable: boolean
    
    // Model機能
    main_(context: ContextInterface, ...args: any[]): ContextInterface
    convertUrlToUrlKey(unsafe_url: string, isIncludeHash: boolean): string
    isImmediateLoadable(unsafe_url: string): boolean
    isImmediateLoadable(event: JQueryEventObject): boolean
    getActiveSetting(): CommonSettingInterface
    setActiveSetting(setting: CommonSettingInterface): CommonSettingInterface
    getActiveXHR(): JQueryXHR
    setActiveXHR(xhr: JQueryXHR): JQueryXHR

    // View機能実体
    CLICK(event: JQueryEventObject): void
    SUBMIT(event: JQueryEventObject): void
    POPSTATE(event: JQueryEventObject): void
    SCROLL(event: JQueryEventObject, end: boolean): void
    
    // Controller機能実体
    enable(): void
    disable(): void
    getCache(unsafe_url: string): any
    setCache(unsafe_url: string, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest): any
    removeCache(unsafe_url: string): void
    clearCache(): void
    cleanCache(): void
  }
  export declare class ModelAppInterface {
    stock(key: string): any
    stock(key: 'executed'): { [index: string]: boolean }

    landing: string
    recent: RecentInterface
    activeXHR: JQueryXHR
    activeSetting: CommonSettingInterface

    update_(setting: SettingInterface, event: JQueryEventObject, register: boolean, data: string, textStatus: string, XMLHttpRequest: XMLHttpRequest, cache: CacheInterface): void
    scope_(common: CommonSettingInterface, src: string, dst: string, relocation: string): any
    scrollByHash_(hash: string): boolean
    fallback_(event: JQueryEventObject): void
    wait_(ms: number): JQueryPromise<any>
    createHTMLDocument_(html: string): Document
    
    configure(option: any, origURL: string, destURL: string, isBidirectional?: boolean): void
    registrate($context: ContextInterface, setting: SettingInterface): void
    drive(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: any): void
    chooseAreas(areas: string[], srcDocument: Document, dstDocument: Document): string

    loadTitleByDB(unsafe_url: string, isIncludeHash: boolean): void
    saveTitleToDB(unsafe_url: string, isIncludeHash: boolean, title: string): void
    loadScrollPositionByCacheOrDB(unsafe_url: string, isIncludeHash: boolean): void
    saveScrollPositionToCacheAndDB(unsafe_url: string, isIncludeHash: boolean, scrollX: number, scrollY: number): void
  }
  export declare class ModelDataInterface {
    createStore_(): IDBObjectStore
    accessRecord_(keyUrl: string, success: (event?: Event) => void): void
    updateVersionNumber_(version: number): void
    clean_(): void

    openDB(setting: SettingInterface, count?: number): void
    updateCurrentPage(isIncludeHash: boolean): void
    loadTitle(keyUrl: string, isIncludeHash: boolean): void
    saveTitle(keyUrl: string, title: string): void
    loadScrollPosition(keyUrl: string): void
    saveScrollPosition(keyUrl: string, scrollX: number, scrollY: number): void
  }
  // View
  export declare class ViewInterface {
    constructor(context?: ContextInterface)
    CONTEXT: ContextInterface
    state_: State
    
    BIND(setting: SettingInterface): ViewInterface
    UNBIND(setting: SettingInterface): ViewInterface
    OBSERVE(): ViewInterface
    RELEASE(): ViewInterface
  }
  // Controller
  export declare class ControllerInterface {
    constructor()
    state_: State

    EXTEND(context: Object): Object
    EXEC(...args: any[]): any
    exec_(context: ContextInterface, ...args: any[]): any
    OBSERVE(): void
    
    CLICK(event: JQueryEventObject): void
    SUBMIT(event: JQueryEventObject): void
    POPSTATE(event: JQueryEventObject): void
  }
  export interface FunctionInterface {
  }
  export interface MethodInterface {
  }

  // enum
  export enum State { wait = -1, ready, lock, seal }

  // Parameter
  export interface CommonSettingInterface {
    scope: {}
    cache: {
      mix: number
      page: number
      size: number
      expires: {
        max: number
        min: number
      }
    }
    fix: {
      history: boolean
    }
    hashquery: boolean
    database: boolean
    
    nss: {
      click: string
      submit: string
    }
    scroll: {
      delay: number
      record: boolean //internal
      queue: number[] //internal
    }
  }
  export interface SettingInterface {
    // public
    gns: string
    ns: string
    area: any
    link: string
    filter(): boolean
    form: string
    scope: {}
    state: {}
    scrollTop: number
    scrollLeft: number
    ajax: JQueryAjaxSettings
    contentType: string
    cache: {
      click: boolean
      submit: boolean
      popstate: boolean
      get: boolean
      post: boolean
      mix: number
      page: number
      size: number
      expires: {
        max: number
        min: number
      }
    }
    callback(): any
    callbacks: any
    param: any
    load: {
      css: boolean
      script: boolean
      execute: boolean
      head: string
      reload: string
      ignore: string
      sync: boolean
      ajax: JQueryAjaxSettings
      rewrite(): any
      redirect: boolean
    }
    interval: number
    wait: number
    scroll: {
      delay: number
      record: boolean //internal
      queue: number[] //internal
    }
    fix: {
      location: boolean
      history: boolean
      scroll: boolean
      reset: boolean
    }
    hashquery: boolean
    fallback: boolean
    database: boolean
    server: {
      query: string
      header: {
        area: boolean
        head: boolean
        css: boolean
        script: boolean
      }
    }
    
    // internal
    uuid: string
    nss: {
      name: string
      event: string[]
      click: string
      submit: string
      popstate: string
      scroll: string
      data: string
      class4html: string
      requestHeader: string
    }
    origLocation: HTMLAnchorElement
    destLocation: HTMLAnchorElement
    retry: boolean
    speedcheck: boolean
    disable: boolean
    option: any
  }

  // Member
  export interface ContextInterface extends JQuery { }
  export interface CacheInterface {
    XMLHttpRequest: JQueryXHR
    data: string
    textStatus: string
    css?: HTMLElement[]
    script?: HTMLElement[]
    size?: number
    expires?: number
    scrollX?: number
    scrollY?: number
    timeStamp?: number
  }

  // Object
  export interface RecentInterface {
    order: string[]
    data: {
      [index: string]: CacheInterface
    }
    size: number
  }

}
