import { Config as Option } from '../../../../';
import { extend } from 'spica/assign';
import { Config } from '../../application/api';
import { RouterEventSource } from '../../domain/event/router';
import { process } from './state/process';
import { route } from './router';
import { once } from '../../../lib/dom';
import { parse } from '../../../lib/html';

export class API {
  public static assign(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url, event =>
      void route(new Config(option), event, process, io));
  }
  public static replace(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url, event =>
      void route(new Config(extend<Option>({}, option, { replace: '*' })), event, process, io));
  }
}

function click(url: string, callback: (ev: Event) => void): void {
  const el: RouterEventSource.Anchor = document.createElement('a');
  el.href = url;
  void parse('').extract().body.appendChild(el);
  void once(el, 'click', callback);
  void el.click();
}
