/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class StoreServer<T> extends Store<T> implements StoreServerInterface<T> {

    name: string = 'server'
    keyPath: string = 'id'

  }

}
