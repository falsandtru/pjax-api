/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>

/* MODEL */

module MODULE.MODEL {
  
  export class Data implements ModelDataInterface {

    DB: DataDBInterface = new MODEL.DataDB()
    Cookie: DataCookieInterface = new MODEL.DataCookie(10 * 24 * 60 * 60)

  }

}
