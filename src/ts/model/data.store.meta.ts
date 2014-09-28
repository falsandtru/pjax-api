/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class StoreMeta<T> extends Store<T> implements StoreMetaInterface<T> {

    name: string = 'meta'
    keyPath: string = 'id'

  }

}
