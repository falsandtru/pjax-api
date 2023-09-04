import { Config as Option, Sequence as ISequence } from '../../../../';
import { Dict } from 'spica/dict';
import { Cache } from 'spica/cache';
import { URL, StandardURL } from 'spica/url';
import { extend, overwrite } from 'spica/assign';

export { scope } from './config/scope';

export class Config implements Option {
  constructor(option: Option) {
    Object.defineProperties(this.update, {
      ignore: {
        enumerable: false,
        set(this: Config['update'], value: string) {
          this.ignores['_'] = value;
        },
        get(this: Config['update']): string {
          return Object.keys(this.ignores)
            .map(i => this.ignores[i])
            .filter(s => s.trim().length > 0)
            .join(',');
        },
      },
    });
    extend<Option>(this, option);
    overwrite(this.scope, option?.scope ?? {});
    this.fetch.headers = new Headers(this.fetch.headers);
    Object.freeze(this);
    this.fetch.headers.set('X-Requested-With', 'XMLHttpRequest');
    this.fetch.headers.set('X-Pjax', '1');
  }
  public readonly areas = ['body'];
  public readonly link = ':is(a, area)[href]:not([target])';
  public filter(_el: HTMLAnchorElement | HTMLAreaElement): boolean {
    return true;
  }
  public readonly form = 'form:not([method])';
  public readonly replace = '';
  public readonly lock = () => `
    :root {
      position: fixed;
      top: ${-window.scrollY}px;
      left: ${-window.scrollX}px;
      right: 0;
      ${window.innerWidth - document.body.clientWidth ? 'overflow-y: scroll;' : ''}
      ${window.innerHeight - document.body.clientHeight ? 'overflow-x: scroll;' : ''}
    }`;
  public readonly cache: Dict<URL.Path<StandardURL>, { etag: string; expiry: number; xhr: XMLHttpRequest; }> = new Cache(100, { sweep: { threshold: 0 } });
  public readonly memory?: Dict<URL.Path<StandardURL>, Document>;
  public readonly fetch = {
    rewrite: undefined,
    headers: new Headers(),
    timeout: 3000,
    wait: 0,
  };
  public readonly update = {
    rewrite: (_url: string, _document: Document, _area: string, _cache: Document | undefined): void => undefined,
    head: 'base, meta, link',
    css: true,
    script: true,
    ignore: '',
    ignores: {
      extension: '[href^="chrome-extension://"]',
      security: '[src*=".scr.kaspersky-labs.com/"]',
    },
    reload: '',
    logger: '',
  };
  public fallback(target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: unknown): void {
    if (target instanceof HTMLAnchorElement) {
      return void window.location.assign(target.href);
    }
    if (target instanceof HTMLFormElement) {
      return void window.location.assign(target.action);
    }
    if (target instanceof Window) {
      return void window.location.reload();
    }
    throw reason;
  }
  public readonly sequence: ISequence<'seq:fetch', 'seq:unload', 'seq:content', 'seq:ready'> = new Sequence();
  public readonly progressbar: string = 'display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);';
  public readonly scope: Record<string, Option | undefined> = {};
}

class Sequence implements ISequence<'seq:fetch', 'seq:unload', 'seq:content', 'seq:ready'> {
  public async fetch() {
    return 'seq:fetch' as const;
  }
  public async unload() {
    return 'seq:unload' as const;
  }
  public async content() {
    return 'seq:content' as const;
  }
  public async ready() {
    return 'seq:ready' as const;
  }
  public async load() {
  }
}
