/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class HistoryStore extends Store<HistoryStoreSchema> {

    name = 'history'
    keyPath = 'url'
    autoIncrement = false
    indexes = [
      { name: 'date', keyPath: 'date', option: { unique: false } }
    ]
    limit = 1000

  }

}
