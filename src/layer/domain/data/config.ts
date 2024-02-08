import { Config as Option, Sequence as ISequence } from '../../../../';
import { Dict } from 'spica/dict';
import { Cache } from 'spica/cache';
import { URL, StandardURL } from 'spica/url';
import { extend, overwrite } from 'spica/assign';

export { scope } from './config/scope';

export class Config implements Option {
  constructor(option: Option) {
    extend<Option>(this, option);
    this.update.ignores.$ ??= option.update?.ignore ?? '';
    this.update.ignore = Object.values(this.update.ignores).filter(s => s).join(',');
    overwrite(this.scope, option?.scope ?? {});
    Object.freeze(this);
    Object.freeze(this.fetch);
    Object.freeze(this.update);
  }
  public readonly areas = ['body'];
  public readonly link = ':is(a, area)[href]:not([target])';
  public filter(_el: HTMLAnchorElement | HTMLAreaElement): boolean {
    return true;
  }
  public readonly form = 'form:not([method])';
  public readonly replace = '';
  public readonly cache: Dict<URL.Path<StandardURL>, { etag: string; expiry: number; xhr: XMLHttpRequest; }> = new Cache(100, { sweep: { threshold: 0 } });
  public readonly memory?: Dict<URL.Path<StandardURL>, Document>;
  public readonly fetch = {
    rewrite: undefined,
    headers: new Headers(),
    timeout: 3000,
    wait: 0,
  };
  public readonly update = {
    rewrite: undefined as NonNullable<Option['update']>['rewrite'],
    head: 'base, meta, link',
    css: true,
    script: true,
    ignore: '',
    ignores: {
      $: undefined as string | undefined,
      extension: '[href^="chrome-extension://"]',
      security: '[src*=".scr.kaspersky-labs.com/"]',
    },
    reload: '',
    logger: '',
  };
  public fallback(target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: unknown): void {
    if (target instanceof HTMLAnchorElement ||
        target instanceof HTMLAreaElement) {
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
