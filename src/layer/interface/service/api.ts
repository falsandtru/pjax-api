import { Config as Options } from '../../../../';
import { route, Config, RouterEvent, RouterEventSource } from './router';
import { process } from './state/process';
import { page } from './state/page';
import { savePjax, isTransitable } from '../../data/store/state';
import { once } from 'typed-dom/listener';

export class API {
  public static assign(url: string, options: Options, io = { document: window.document, router: route }): boolean {
    return click(url, event =>
      io.router(new Config(options), new RouterEvent(event, page.url), process, io));
  }
  public static replace(url: string, options: Options, io = { document: window.document, router: route }): boolean {
    return click(url, event =>
      io.router(new Config({ ...options, replace: '*' }), new RouterEvent(event, page.url), process, io));
  }
  public static sync(isPjaxPage?: boolean): void {
    isPjaxPage && savePjax();
    process.cast('', new Error('Canceled'));
    page.sync();
  }
  public static pushURL(url: string, title: string, state: unknown = null): void {
    window.history.pushState(state, title, url);
    this.sync();
  }
  public static replaceURL(url: string, title: string, state: unknown = window.history.state): void {
    const isPjaxPage = isTransitable(window.history.state);
    window.history.replaceState(state, title, url);
    this.sync(isPjaxPage);
  }
}

function click<T>(url: string, callback: (ev: Event) => T): T {
  const el: RouterEventSource.Link = document.createElement('a');
  el.href = url;
  assert(el.matches('[href]'));
  document.createDocumentFragment().appendChild(el);
  let result: T;
  once(el, 'click', ev => {
    result = callback(ev);
    ev.preventDefault();
  });
  el.click();
  return result!;
}
