/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL.APP {

  export class PageUtility implements PageUtilityInterface {
    
    chooseArea(area: string | string[], srcDocument: Document, dstDocument: Document, fallback = true): string {
      const areas = typeof area === 'string' ? [area] : area;

      SELECTOR:
      for (let i = 0; i < areas.length; i++) {
        const selector = areas[i],
              parts: string[] = selector.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || [selector];
        for (let j = parts.length; j--;) {
          const part = parts[j];
          switch (true) {
            case jQuery(part, srcDocument).length === 0:
            case jQuery(part, srcDocument).length !== jQuery(part, dstDocument).length:
              continue SELECTOR;
          }
        }
        return selector;
      }
      return '';
    }

    // addEventListenerとjQuery以外で発行されたカスタムイベントはjQueryでは発信できない
    dispatchEvent(target: Window | Document | HTMLElement, eventType: string, bubbling: boolean, cancelable: boolean): void {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, bubbling, cancelable);
      target.dispatchEvent(event);
    }

  }

}
