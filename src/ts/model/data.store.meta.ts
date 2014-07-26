/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class DataStoreMeta<T> extends DataStore<T> implements DataStoreMetaInterface<T> {

    name: string = 'meta'
    keyPath: string = 'id'

  }

}
