/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA.STORE {
  
  export class Meta extends Store<MetaStoreSchema> {

    name = 'meta'
    keyPath = 'key'
    autoIncrement = false
    limit = 0

  }

}
