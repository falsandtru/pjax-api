/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>

/* MODEL */

module MODULE.MODEL.APP.DATA {
  
  export class Main implements DataLayerInterface {

    DB: DatabaseInterface = new Database()
    Cookie: CookieInterface = new Cookie(10 * 24 * 60 * 60)

  }

}
