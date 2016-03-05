import { extend } from 'spica';
import { Config as Option } from 'pjax-api';
import { Url } from '../../../lib/url';

export class Config implements Option {
  constructor(option: Option) {
    void extend(this, option);
    void Object.freeze(this);
  }
  public readonly areas = ['body'];
  public readonly link = 'a:not([target])';
  public filter(el: HTMLAnchorElement): boolean {
    if (typeof el.href !== 'string') return false;
    const dest = new Url(el.href);
    return /^https?:$/.test(dest.protocol)
        && /^$|\.(html?|php)$/.test(dest.file);
  }
  public readonly form = 'form:not([method])';
  public readonly replace = '';
  public readonly fetch = {
    timeout: 3000,
    wait: 0
  };
  public rewrite(_doc: Document, _area: string, _host: string): void {
  }
  public readonly load = {
    head: 'base, meta, link',
    css: true,
    script: true,
    ignore: '[href^="chrome-extension://"]',
    reload: '',
    logger: ''
  };
  public fallback(target: HTMLAnchorElement | HTMLFormElement | Window, reason: any): void {
    if (target instanceof HTMLAnchorElement) {
      return void window.location.assign(target.href);
    }
    if (target instanceof HTMLFormElement) {
      return void window.location.assign(target.action);
    }
    if (target instanceof Window) {
      return void window.location.reload(true);
    }
    throw reason;
  }
  public readonly balance = {
    bounds: [
      ''
    ],
    weight: 1,
    random: 0,
    client: {
      hosts: <string[]>[
      ],
      support: {
        balance: /msie|trident.+ rv:|chrome|firefox|safari/i,
        redirect: /msie|trident.+ rv:|chrome|firefox|safari/i
      },
      cookie: {
        balance: 'balanceable',
        redirect: 'redirectable'
      }
    },
    server: {
      header: 'X-Ajax-Host',
      expiry: 3 * 24 * 3600 * 1e3
    }
  };
  public readonly store = {
    expiry: 3 * 3600 * 1e3
  };
  public readonly progressbar: string = 'display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);';
  public readonly scope: { [path: string]: Option | undefined; } = {
    '/': {}
  };
}
