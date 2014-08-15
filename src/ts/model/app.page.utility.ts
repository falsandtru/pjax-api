/// <reference path="../define.ts"/>

/* MODEL */

module MODULE.MODEL {

  export class AppPageUtility implements AppPageUtilityInterface {

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
          (<HTMLFormElement>event.currentTarget).submit();
          break;
        case 'popstate':
          window.location.reload();
          break;
      }
    }

    calAge(jqXHR: JQueryXHR): number {
      var age: any;

      switch (true) {
        case /no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control')):
          return 0;
        case !!~String(jqXHR.getResponseHeader('Cache-Control')).indexOf('max-age='):
          return Number(jqXHR.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop()) * 1000;
        case !!String(jqXHR.getResponseHeader('Expires')):
          return new Date(jqXHR.getResponseHeader('Expires')).getTime() - new Date().getTime();
        default:
          return 0;
      }
    }

    calExpires(jqXHR: JQueryXHR): number {
      return new Date().getTime() + this.calAge(jqXHR);
    }
    
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
