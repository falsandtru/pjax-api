/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA.STORE {
  
  export class History extends Store<HistoryStoreSchema> {

    name = 'history'
    keyPath = 'url'
    autoIncrement = false
    indexes = [
      { name: 'date', keyPath: 'date', option: { unique: false } }
    ]
    size = 300

  }

}
