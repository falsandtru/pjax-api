/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class StoreMeta<T> extends Store<T> implements StoreMetaInterface<T> {

    name = 'meta'
    keyPath = 'id'
    autoIncrement = false
    indexes = [
      { name: this.keyPath, keyPath: this.keyPath, option: { unique: true } }
    ]

  }

}
