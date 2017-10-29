import { Config as Option } from '../../../../';
import { route, Config, RouterEvent, RouterEventSource } from './router';
import { process } from './state/process';
import { parse } from '../../../lib/html';
import { extend } from 'spica/assign';
import { once } from 'typed-dom';

export class API {
  public static assign(url: string, option: Option, io = { document: window.document, router: route }): undefined {
    return void click(url, event =>
      void io.router(new Config(option), new RouterEvent(event), process, io));
  }
  public static replace(url: string, option: Option, io = { document: window.document, router: route }): undefined {
    return void click(url, event =>
      void io.router(new Config(extend<Option>({}, option, { replace: '*' })), new RouterEvent(event), process, io));
  }
}

function click(url: string, callback: (ev: Event) => void): void {
  const el: RouterEventSource.Anchor = document.createElement('a');
  el.href = url;
  void parse('').extract().body.appendChild(el);
  void once(el, 'click', callback);
  void el.click();
}
