/// <reference path="../define.ts"/>
/// <reference path="utility.ts"/>

/* MODEL */

module MODULE.MODEL {

  export class AppPage implements AppPageInterface {

    dispatchEvent_(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent_(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, bubbling, cancelable);
      target.dispatchEvent(event);
    }

    wait_(ms: number): JQueryDeferred<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }

  }

}
