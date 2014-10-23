/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class MetaStore<T> extends Store<T> implements MetaStoreInterface<T> {

    name = 'meta'
    keyPath = 'key'
    autoIncrement = false
    indexes = [
      { name: this.keyPath, keyPath: this.keyPath, option: { unique: true } }
    ]

  }

}
