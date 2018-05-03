import { extend } from 'spica/assign';
import { DeepRequired } from 'spica/type';
import { Config as Option, Sequence as ISequence } from '../../../../';
import { URL } from '../../../lib/url';
import { StandardUrl } from '../../data/model/domain/url';

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
    void Object.freeze(this);
    void this.fetch.headers.set('X-Pjax', '1');
  }
  public readonly areas = ['body'];
  public readonly link = 'a';
  public filter(el: HTMLAnchorElement): boolean {
    return el.matches(':not([target])');
  }
  public readonly form = 'form:not([method])';
  public readonly replace = '';
  public redirect(path: URL.Path<StandardUrl>): string {
    return path;
  }
  public readonly fetch = {
    headers: new Headers(),
    timeout: 3000,
    wait: 0
  };
  public rewrite(_doc: Document, _area: string): void {
  }
  public readonly update = {
    head: 'base, meta, link',
    css: true,
    script: true,
    ignore: '',
    ignores: <{ [index: string]: string; }>{
      extension: '[href^="chrome-extension://"]',
      security: '[src*=".scr.kaspersky-labs.com/"]',
    },
    reload: '',
    logger: '',
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
