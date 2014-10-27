/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class MetaStore extends Store<MetaStoreSchema> {

    name = 'meta'
    keyPath = 'key'
    autoIncrement = false
    limit = 0

  }

}
