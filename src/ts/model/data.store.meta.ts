/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:
  //  M

  // Deny access
  var V: void, C: void;

  export class DataStoreMeta extends DataStore implements DataStoreMetaInterface {

    name: string = 'meta'

    buffer_: BufferInterface = {}

  }
}
