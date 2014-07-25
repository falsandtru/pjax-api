/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class DataStoreServer<T> extends DataStore<T> implements DataStoreServerInterface<T> {

    name: string = 'server'
    keyPath: string = 'id'

  }

}
