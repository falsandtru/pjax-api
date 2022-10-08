import { Config as Option } from '../../../../';
import { route, Config, RouterEvent, RouterEventSource } from './router';
import { process } from './state/process';
import { page } from './state/page';
import { savePjax, isTransitable } from '../../data/store/state';
import { assign } from 'spica/assign';
import { once } from 'typed-dom/listener';

export class API {
  public static assign(url: string, option: Option, io = { document: window.document, router: route }): boolean {
    let result!: boolean;
    click(url, event =>
      result = io.router(new Config(option), new RouterEvent(event, page.url), process, io));
    assert(result !== undefined);
    return result;
  }
  public static replace(url: string, option: Option, io = { document: window.document, router: route }): boolean {
    let result!: boolean;
    click(url, event =>
      result = io.router(new Config(assign({}, option, { replace: '*' })), new RouterEvent(event, page.url), process, io));
    assert(result !== undefined);
    return result;
  }
  public static sync(isPjaxPage?: boolean): void {
    isPjaxPage && savePjax();
    process.cast('', new Error(`Canceled.`));
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

function click(url: string, callback: (ev: Event) => void): void {
  const el: RouterEventSource.Link = document.createElement('a');
  el.href = url;
  document.createDocumentFragment().appendChild(el);
  once(el, 'click', callback);
  once(el, 'click', ev => void ev.preventDefault());
  el.click();
}
