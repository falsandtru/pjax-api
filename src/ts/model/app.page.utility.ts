/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageUtility implements PageUtilityInterface {
    
    chooseArea(area: string | string[], srcDocument: Document, dstDocument: Document): string {
      var areas = typeof area === 'string' ? [area] : area;

      var i: number = -1, v: string;
      AREA: while (v = areas[++i]) {
        var options: string[] = v.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
        var j: number = -1;
        while (options[++j]) {
          if (!jQuery(options[j], srcDocument).length || !jQuery(options[j], dstDocument).length) {
            continue AREA;
          }
        }
        return v;
      }
    }

    // addEventListenerとjQuery以外で発行されたカスタムイベントはjQueryでは発信できない
    dispatchEvent(target: Window | Document | HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, bubbling, cancelable);
      target.dispatchEvent(event);
    }

  }

}
