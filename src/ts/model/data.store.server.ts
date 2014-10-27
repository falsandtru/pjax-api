/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class ServerStore extends Store<ServerStoreSchema> {

    name = 'server'
    keyPath = 'host'
    autoIncrement = false
    indexes = [
      { name: 'date', keyPath: 'date', option: { unique: false } }
    ]
    limit = 100

  }

}
