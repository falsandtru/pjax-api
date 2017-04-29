import { extend } from 'spica';
import { Config as Option, Sequence as ISequence } from '../../../../';

export class Config implements Option {
  constructor(option: Option) {
    void extend(this, option);
    void Object.freeze(this);
  }
  public readonly areas = ['body'];
  public readonly link = 'a:not([target])';
  public filter(el: HTMLAnchorElement): boolean {
    if (typeof el.href !== 'string') return false;
    return /^https?:$/.test(new URL(el.href).protocol);
  }
  public readonly form = 'form:not([method])';
  public readonly replace = '';
  public readonly fetch = {
    timeout: 3000,
    wait: 0
  };
  public rewrite(_doc: Document, _area: string, _host: string): void {
  }
  public readonly update = {
    head: 'base, meta, link',
    css: true,
    script: true,
    ignore: '[href^="chrome-extension://"], [src*=".scr.kaspersky-labs.com/"]',
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
  public readonly sequence: ISequence<Sequence.Data.Fetch, Sequence.Data.Unload, Sequence.Data.Ready> = new Sequence();
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

export class Sequence implements ISequence<Sequence.Data.Fetch, Sequence.Data.Unload, Sequence.Data.Ready> {
  public async fetch(): Promise<Sequence.Data.Fetch> {
    return <any>void 0;
  }
  public async unload(): Promise<Sequence.Data.Unload> {
    return <any>void 0;
  }
  public async ready(): Promise<Sequence.Data.Ready> {
    return <any>void 0;
  }
  public load(): void {
  }
}
export namespace Sequence {
  abstract class Sequence<T> {
    protected DATA: T;
  }
  export namespace Data {
    export interface Fetch extends Sequence<'fetch'> {
    }
    export interface Unload extends Sequence<'unload'> {
    }
    export interface Ready extends Sequence<'ready'> {
    }
  }
}
