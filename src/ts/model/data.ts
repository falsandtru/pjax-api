/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>
/// <reference path="util.ts"/>

/* MODEL */

module MODULE {
  // Allow access:

  // Deny access
  var M: void, V: void, C: void;

  export class ModelData implements ModelDataInterface {

    DB: DataDBInterface = new DataDB()
    Cookie: DataCookieInterface = new DataCookie(10 * 24 * 60 * 60)

  }
}
