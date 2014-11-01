/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageUtility implements PageUtilityInterface {
    
    chooseArea(area: string, srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: string[], srcDocument: Document, dstDocument: Document): string
    chooseArea(areas: any, srcDocument: Document, dstDocument: Document): string {
      areas = areas instanceof Array ? areas : [areas];

      var i: number = -1, area: string;
      AREA: while (area = areas[++i]) {
        var options: string[] = area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
        var j: number = -1;
        while (options[++j]) {
          if (!jQuery(options[j], srcDocument).length || !jQuery(options[j], dstDocument).length) {
            continue AREA;
          }
        }
        return area;
      }
    }

    movePageNormally(event: JQueryEventObject): void {
      switch (event.type.toLowerCase()) {
        case 'click':
          window.location.assign((<HTMLAnchorElement>event.currentTarget).href);
          break;
        case 'submit':
          switch ((<HTMLFormElement>event.currentTarget).method.toUpperCase()) {
            case 'GET':
              window.location.assign((<HTMLFormElement>event.currentTarget).action.replace(/[?#].*/, '') + '?' + jQuery(event.currentTarget).serialize());
              break;
            case 'POST':
              window.location.assign((<HTMLFormElement>event.currentTarget).action);
              break;
          }
          break;
        case 'popstate':
          window.location.reload();
          break;
      }
    }

    // addEventListenerとjQuery以外で発行されたカスタムイベントはjQueryでは発信できない
    dispatchEvent(target: Window, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: Document, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void
    dispatchEvent(target: any, eventType: string, bubbling: boolean, cancelable: boolean): void {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, bubbling, cancelable);
      target.dispatchEvent(event);
    }

    wait(ms: number): JQueryDeferred<any> {
      var defer = jQuery.Deferred();
      if (!ms) { return defer.resolve(); }

      setTimeout(function () { defer.resolve(); }, ms);
      return defer;
    }
    
  }

}
