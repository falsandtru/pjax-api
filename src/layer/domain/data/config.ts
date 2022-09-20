import { DeepRequired } from 'spica/type';
import { Object } from 'spica/global';
import { Config as Option, Sequence as ISequence } from '../../../../';
import { URL, StandardURL } from 'spica/url';
import { extend, overwrite } from 'spica/assign';

export { scope } from './config/scope';

export class Config implements DeepRequired<Option, Config['scope']> {
  constructor(option: Option) {
    void Object.defineProperties(this.update, {
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
    void extend(this, option);
    void overwrite(this.scope, option?.scope ?? {});
    this.fetch.headers = new Headers(this.fetch.headers);
    void Object.freeze(this);
    void this.fetch.headers.set('X-Requested-With', 'XMLHttpRequest');
    void this.fetch.headers.set('X-Pjax', '1');
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
  public readonly fetch = {
    rewrite: (path: URL.Path<StandardURL>): string => path,
    cache: (_path: URL.Path<StandardURL>, _headers: Headers): string => '',
    headers: new Headers(),
    timeout: 3000,
    wait: 0,
  };
  public readonly update = {
    rewrite: (_doc: Document, _area: string): void => undefined,
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
  public readonly sequence: ISequence<'fetch', 'unload', 'content', 'ready'> = new Sequence();
  public readonly progressbar: string = 'display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);';
  public readonly scope: Record<string, Option | undefined> = {};
}

class Sequence implements ISequence<'fetch', 'unload', 'content', 'ready'> {
  public async fetch(): Promise<'fetch'> {
    return 'fetch';
  }
  public async unload(): Promise<'unload'> {
    return 'unload';
  }
  public async content(): Promise<'content'> {
    return 'content';
  }
  public async ready(): Promise<'ready'> {
    return 'ready';
  }
  public async load(): Promise<void> {
  }
}
