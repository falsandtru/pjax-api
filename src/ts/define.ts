/// <reference path=".d/jquery.d.ts"/>
/// <reference path=".d/jquery.pjax.d.ts"/>

interface Window {
  DOMParser?: any
  webkitIndexedDB?: IDBFactory
  mozIndexedDB?: IDBFactory
  IDBKeyRange?: IDBKeyRange
  webkitIDBKeyRange?: IDBKeyRange
  mozIDBKeyRange?: IDBKeyRange
  msIDBKeyRange?: IDBKeyRange
  opera?
}
interface JQueryXHR {
  follow: boolean
  timeStamp: number
}
module MODULE {

  export var NAME: string = 'pjax'
  export var NAMESPACE: any = jQuery

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
    convertUrlToUrlKey(unsafe_url: string): string
    isImmediateLoadable(unsafe_url: string): boolean
    isImmediateLoadable(event: JQueryEventObject): boolean
    getActiveSetting(): CommonSettingInterface
    setActiveSetting(setting: CommonSettingInterface): CommonSettingInterface
    getActiveXHR(): JQueryXHR
    setActiveXHR(xhr: JQueryXHR): JQueryXHR
    fallback(event: JQueryEventObject, setting: SettingInterface): void

    // View機能実体
    CLICK(event: JQueryEventObject): void
    SUBMIT(event: JQueryEventObject): void
    POPSTATE(event: JQueryEventObject): void
    SCROLL(event: JQueryEventObject, end: boolean): void
    
    // Controller機能実体
    enable(): void
    disable(): void
    getCache(unsafe_url: string): CacheInterface
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR): any
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

    scope_(common: CommonSettingInterface, src: string, dst: string, rewriteKeyUrl?: string): any
    
    configure(option: any, origURL: string, destURL: string, isBidirectional?: boolean): void
    registrate($context: ContextInterface, setting: SettingInterface): void
    createHTMLDocument(html: string): Document
    chooseAreas(areas: string[], srcDocument: Document, dstDocument: Document): string
    movePageNormally(event: JQueryEventObject): void
    scrollByHash(hash: string): boolean

    loadTitleByDB(unsafe_url: string): void
    saveTitleToDB(unsafe_url: string, title: string): void
    loadScrollPositionByCacheOrDB(unsafe_url: string): void
    saveScrollPositionToCacheAndDB(unsafe_url: string, scrollX: number, scrollY: number): void
    loadBuffer(limit: number): void
    saveBuffer(): void
  }
  export declare class ModelAppUpdateInterface {
    constructor(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface)

    setting_: SettingInterface
    cache_: CacheInterface
    checker_: JQuery
    loadwaits_: JQueryDeferred<any>[]

    event_: JQueryEventObject
    data_: string
    textStatus_: string
    jqXHR_: JQueryXHR
    errorThrown_: string
    register_: boolean
    srcDocument_: Document
    dstDocument_: Document

    update_(): void
    updateCache_(): void
    updateRedirect_(): void
    updateUrl_(): void
    updateTitle_(): void
    updateHead_(): void
    updateContent_(): JQueryDeferred<any>[]
    updateScroll_(call: boolean): void
    updateCSS_(selector: string): void
    updateScript_(selector: string): void
    updateRender_(callback: () => void): void
    updateVerify_(): void
    wait_(ms: number): JQueryPromise<any>
  }
  export declare class ModelDataInterface {
    createStore_(): IDBObjectStore
    accessRecord_(keyUrl: string, success: (event?: Event) => void): void
    updateVersionNumber_(version: number): void
    clean_(): void

    buffer: BufferInterface

    openDB(setting: SettingInterface, count?: number): void
    updateCurrentPage(): void
    loadTitle(keyUrl: string): void
    saveTitle(keyUrl: string, title: string): void
    loadScrollPosition(keyUrl: string): void
    saveScrollPosition(keyUrl: string, scrollX: number, scrollY: number): void
    loadBuffer(limit: number): void
    saveBuffer(): void
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
    enable(): JQueryPjax
    disable(): JQueryPjax
    click(url: string, attr?: { href?: string; }): JQueryPjax
    click(url: HTMLAnchorElement, attr: { href?: string; }): JQueryPjax
    click(url: JQuery, attr: { href?: string; }): JQueryPjax
    submit(url: string, attr: { action?: string; method?: string; }, data: any): JQueryPjax
    submit(url: HTMLFormElement, attr?: { action?: string; method?: string; }, data?: any): JQueryPjax
    submit(url: JQuery, attr?: { action?: string; method?: string; }, data?: any): JQueryPjax
    follow(event: JQueryEventObject, ajax: JQueryXHR): boolean
    setCache(): JQueryPjax
    setCache(url: string): JQueryPjax
    setCache(url: string, data: string): JQueryPjax
    setCache(url: string, data: string, textStatus: string, jqXHR: JQueryXHR): JQueryPjax
    getCache(): PjaxCache
    getCache(url: string): PjaxCache
    removeCache(url: string): JQueryPjax
    removeCache(): JQueryPjax
    clearCache(): JQueryPjax
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
      limit: number
      size: number
      expires: {
        max: number
        min: number
      }
    }
    fix: {
      history: boolean
    }
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
      limit: number
      size: number
      expires: {
        max: number
        min: number
      }
      mix: number
    }
    buffer: {
      limit: number
      delay: number
    }
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
    }
    redirect: boolean
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
    fallback: boolean
    database: boolean
    server: {
      query: any
      header: {
        area: boolean
        head: boolean
        css: boolean
        script: boolean
      }
    }
    callback(): any
    param: any
    callbacks: {
      before?: (event: JQueryEventObject, param: any) => any
      after?: (event: JQueryEventObject, param: any) => any
      ajax: {
        xhr?: (event: JQueryEventObject, param: any) => any
        beforeSend?: (event: JQueryEventObject, param: any, data: string, ajaxSettings: any) => any
        dataFilter?: (event: JQueryEventObject, param: any, data: string, dataType: any) => any
        success?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        error?: (event: JQueryEventObject, param: any, jqXHR: JQueryXHR, textStatus: string, errorThrown: any) => any
        complete?: (event: JQueryEventObject, param: any, jqXHR: JQueryXHR, textStatus: string) => any
        done?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        fail?: (event: JQueryEventObject, param: any, jqXHR: JQueryXHR, textStatus: string, errorThrown: any) => any
        always?: (event: JQueryEventObject, param: any, jqXHR: JQueryXHR, textStatus: string) => any
      }
      update: {
        before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        cache: {
          before?: (event: JQueryEventObject, param: any, cache: any) => any
          after?: (event: JQueryEventObject, param: any, cache: any) => any
        }
        redirect: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        url: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        title: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        head: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        content: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        scroll: {
          before?: (event: JQueryEventObject, param: any) => any
          after?: (event: JQueryEventObject, param: any) => any
        }
        css: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        script: {
          before?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
          after?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        }
        render: {
          before?: (event: JQueryEventObject, param: any) => any
          after?: (event: JQueryEventObject, param: any) => any
        }
        verify: {
          before?: (event: JQueryEventObject, param: any) => any
          after?: (event: JQueryEventObject, param: any) => any
        }
        success?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        error?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
        complete?: (event: JQueryEventObject, param: any, data: string, textStatus: string, jqXHR: JQueryXHR) => any
      }
    }
    
    // internal
    uuid: string
    gns: string
    ns: string
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
  export interface BufferInterface {
    [index: string]: {
      title: string
      scrollX?: number
      scrollY?: number
    }
  }
  export interface RecentInterface {
    order: string[]
    data: {
      [index: string]: CacheInterface
    }
    size: number
  }

  // Object
  export interface CacheInterface {
    jqXHR: JQueryXHR
    data: string
    textStatus: string
    css?: HTMLElement[]
    script?: HTMLElement[]
    size?: number
    expires?: number
    timeStamp?: number
  }

}
