import { Config as Option } from '../../../../';
import { extend } from 'spica';
import { Config } from '../../application/api';
import { RouterEventSource } from '../../domain/event/router';
import { process } from './state/process';
import { route } from './router';
import { once } from '../../../lib/dom';
import { parse } from '../../../lib/html';

export class API {
  public static assign(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        route(new Config(option), event, process, io));
  }
  public static replace(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        route(new Config(extend<Option>({}, option, { replace: '*' })), event, process, io));
  }
}

function click(url: string): Promise<Event> {
  const el: RouterEventSource.Anchor = document.createElement('a');
  el.href = url;
  return new Promise<Event>(resolve => (
    void once(el, 'click', event => (
      void event.preventDefault(),
      void resolve(event))),
    void parse('').extract().body.appendChild(el),
    void el.click(),
    void el.remove()));
}
