/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStoreServer<T> extends DataStore<T> implements DataStoreServerInterface<T> {

    name: string = 'server'
    keyPath: string = 'id'

  }
}
