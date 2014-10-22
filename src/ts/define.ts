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
}
interface JQueryXHR {
  follow?: boolean
  host?: string
  timeStamp?: number
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
   * - class Main (mvc-interface)
   *   single instance
   * - class App (application-logic)
   *   single instance(APP)
   * - class Data (data-access)
   *   single instance(DATA)
   * 
   * View
   * - class Main (mvc-interface)
   *   multi instance
   * 
   * Controller
   * - class Main (mvc-interface)
   *   single instance
   * - class Functions
   *   single instance
   * - class Methods
   *   single instance
   * 
   * -----
   * 
   * 規約
   * 
   * - MVCモジュール間のアクセスは各モジュールのインターフェイスを経由し、内部機能(APP/DATA)に直接アクセスしない。
   * - モデルインターフェイスへ渡されるデータはすべて正規化、検疫されてないものとして自身で正規化、検疫する。
   * 
   */
  export module MODEL { }
  export module VIEW { }
  export module CONTROLLER { }

  // Model Interface
  export declare class ModelInterface {
    constructor()

    // Property
    isDeferrable: boolean
    queue: number[]
    
    // Model
    state(): State
    host(): string
    convertUrlToKeyUrl(unsafe_url: string): string
    isImmediateLoadable(unsafe_url: string, setting?: SettingInterface): boolean
    isImmediateLoadable(event: JQueryEventObject, setting?: SettingInterface): boolean
    getGlobalSetting(): SettingInterface
    setGlobalSetting(setting: SettingInterface): SettingInterface
    getGlobalXHR(): JQueryXHR
    setGlobalXHR(xhr: JQueryXHR): JQueryXHR
    fallback(event: JQueryEventObject, setting: SettingInterface): void
    speed: any
    
    // View
    click(event: JQueryEventObject): void
    submit(event: JQueryEventObject): void
    popstate(event: JQueryEventObject): void
    scroll(event: JQueryEventObject, end: boolean): void
    
    // Controller
    enable(): void
    disable(): void
    getCache(unsafe_url: string): CacheInterface
    setCache(unsafe_url: string, data: string, textStatus: string, jqXHR: JQueryXHR, host?: string): any
    removeCache(unsafe_url: string): void
    clearCache(): void
    cleanCache(): void
  }
  // View Interface
  export declare class ViewInterface {
    constructor(model: ModelInterface, controller: ControllerInterface, $context: JQuery, setting: SettingInterface)
  }
  // Controller Interface
  export declare class ControllerInterface {
    constructor()

    click(event: JQueryEventObject): void
    submit(event: JQueryEventObject): void
    popstate(event: JQueryEventObject): void
    scroll(event: JQueryEventObject): void
  }

  // State
  export enum State { blank = -2, initiate, open, pause, lock, seal, error, crash, terminate, close }

  // Context
  export interface ExtensionInterface extends JQueryPjax { }
  export interface ExtensionStaticInterface extends JQueryPjaxStatic { }

  // Parameter
  export interface SettingInterface extends PjaxSetting {
    // internal
    gns: string
    ns: string
    nss: {
      name: string
      event: string
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
    areas: string[]
    loadtime: number
    retriable: boolean
    cancel: boolean
    option: PjaxSetting
    speedcheck: boolean
  }

  // Member
  export interface RecentInterface {
    order: string[]
    data: {
      [url: string]: CacheInterface
    }
    size: number
  }

  // Object
  export interface CacheInterface {
    jqXHR: JQueryXHR
    data: string
    textStatus: string
    size: number
    expires: number
    host: string
    timeStamp: number
  }

  // Function
  export function GEN_UUID(): string {
    // version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, gen);
    function gen(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).toUpperCase();
    }
  }

  export function FREEZE<T>(object: T, deep?: boolean): T {
    if (!Object.freeze || object === object['window'] || 'ownerDocument' in object) { return object; }
    !Object.isFrozen(object) && Object.freeze(object);
    if (!deep) { return object; }
    for (var i in object) {
      var prop = object[i];
      if (~'object,function'.indexOf(typeof prop) && prop) {
        FREEZE(prop, deep);
      }
    }
    return object;
  }

  export function SEAL<T>(object: T, deep?: boolean): T {
    if (!Object.seal || object === object['window'] || 'ownerDocument' in object) { return object; }
    !Object.isSealed(object) && Object.seal(object);
    if (!deep) { return object; }
    for (var i in object) {
      var prop = object[i];
      if (~'object,function'.indexOf(typeof prop) && prop) {
        SEAL(prop, deep);
      }
    }
    return object;
  }
}

module MODULE.MODEL {
  // APP Layer
  export declare class AppLayerInterface {
    balance: BalanceInterface
    page: PageInterface
    data: DataInterface

    initialize($context: JQuery, setting: SettingInterface): void
    configure(option: PjaxSetting, origURL: string, destURL: string): SettingInterface
  }
  export declare class BalanceInterface {
    constructor(model: ModelInterface, app: AppLayerInterface)
    host(): string
    
    enable(setting: SettingInterface): void
    disable(setting: SettingInterface): void
    changeServer(host: string, setting?: SettingInterface): void
    chooseServer(setting: SettingInterface): void
    bypass(setting: SettingInterface, retry: number): void
  }
  export declare class PageInterface extends PageUtilityInterface {
    constructor(model: ModelInterface, app: AppLayerInterface)

    landing: string
    recent: RecentInterface
    loadedScripts: { [url: string]: boolean }
    isScrollPosSavable: boolean
    globalXHR: JQueryXHR
    globalSetting: SettingInterface
    
    transfer(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface): void
    fetch(setting: SettingInterface,
          event: JQueryEventObject,
          register: boolean,
          cache: CacheInterface,
          done: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => void,
          fail: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => void
         ): void
    update(setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string): void
  }
  export declare class PageFetchInterface extends PageUtilityInterface {
    constructor(model: ModelInterface,
      app: AppLayerInterface,
      setting: SettingInterface,
      event: JQueryEventObject,
      register: boolean,
      cache: CacheInterface,
      done: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any,
      fail: (setting: SettingInterface, event: JQueryEventObject, register: boolean, cache: CacheInterface, data: string, textStatus: string, jqXHR: JQueryXHR, errorThrown: string, host: string) => any)
  }
  export declare class PageUpdateInterface extends PageUtilityInterface {
    constructor(model: ModelInterface,
      app: AppLayerInterface,
      setting: SettingInterface,
      event: JQueryEventObject,
      register: boolean,
      cache: CacheInterface,
      data: string,
      textStatus: string,
      jqXHR: JQueryXHR,
      errorThrown: string,
      host: string)
  }
  export declare class PageUtilityInterface {
    createHTMLDocument(html: string, uri: string): Document
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    movePageNormally(event: JQueryEventObject): void
    calAge(jqXHR: JQueryXHR): number
    calExpires(jqXHR: JQueryXHR): number
  }
  export declare class DataInterface {
    // cookie
    getCookie(key: string): string
    setCookie(key: string, value: string, option?: Object): string

    // db
    opendb(setting: SettingInterface): void
    
    // common
    loadBuffers(limit?: number): void
    saveBuffers(): void

    // meta

    // history
    getHistoryBuffer(unsafe_url: string): APP.HistoryStoreSchema
    loadTitle(): void
    saveTitle(): void
    saveTitle(unsafe_url: string, title: string): void
    loadScrollPosition(): void
    saveScrollPosition(): void
    saveScrollPosition(unsafe_url: string, scrollX: number, scrollY: number): void
    loadExpires(): void
    saveExpires(unsafe_url: string, host: string, expires: number): void

    // server
    getServerBuffers(): APP.ServerStoreSchema[]
    loadServer(): void
    saveServer(host: string, performance: number, state?: number, unsafe_url?: string, expires?: number): void
  }
}

module MODULE.MODEL.APP {
  // DATA Layer
  export declare class DataLayerInterface {
    DB: DBInterface
    Cookie: CookieInterface
  }
  export declare class DBInterface {

    IDBFactory: IDBFactory
    IDBKeyRange: IDBKeyRange

    database(): IDBDatabase
    state(): State
    stores: DatabaseSchema
    meta: {
      version: { key: string; value: number; }
      update: { key: string; value: number; }
    }
    
    conExtend(): void

    opendb(task?: () => void, noRetry?: boolean): void
    closedb(): void
  }
  export declare class StoreInterface<T> {
    constructor(DB: DBInterface)

    name: string
    keyPath: string
    autoIncrement: boolean
    indexes: StoreIndexOptionInterface[]

    loadBuffer(limit?: number): void
    saveBuffer(): void

    getBuffers(): T[]
    getBuffer(key: string): T
    getBuffer(key: number): T
    setBuffers(values: T[], isMerge?: boolean): T[]
    setBuffer(value: T, isMerge?: boolean): T
    addBuffer(value: any): T
    removeBuffer(key: string): T
    removeBuffer(key: number): T
    clearBuffer(): void
    
    get(key: number, success: (event: Event) => void): void
    get(key: string, success: (event: Event) => void): void
    set(value: T, isMerge?: boolean): void
    add(value: T): void
    put(value: T): void
    remove(key: number): void
    remove(key: string): void
  }
  export declare class MetaStoreInterface<T> extends StoreInterface<T> {
  }
  export declare class HistoryStoreInterface<T> extends StoreInterface<T> {
    clean(): void
  }
  export declare class ServerStoreInterface<T> extends StoreInterface<T> {
    clean(): void
  }
  export declare class CookieInterface {
    constructor(age: number)

    getCookie(key: string): string
    setCookie(key: string, value: string, option?: CookieOptionInterface): string
  }

  // Object
  export interface CookieOptionInterface {
    age: number
    path: string
    domain: string
    secure: boolean
  }

  // Database
  export interface DatabaseSchema {
    meta: MetaStoreInterface<MetaStoreSchema>
    history: HistoryStoreInterface<HistoryStoreSchema>
    server: ServerStoreInterface<ServerStoreSchema>
  }
  export interface MetaStoreSchema {
    key: string
    value: any
  }
  export interface HistoryStoreSchema {
    url: string     // primary
    title: string   // fix
    date: number    // fix
    scrollX: number // fix
    scrollY: number // fix
    expires: number // balance
    host: string    // balance
  }
  export interface ServerStoreSchema {
    host: string
    state: number // 0:正常, !0:異常発生時刻(ミリ秒)
    performance: number
    date: number
  }
  export interface StoreIndexOptionInterface {
    name: string
    keyPath: string
    option?: {
      unique: boolean
    }
  }

}
