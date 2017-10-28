import { extend } from 'spica/assign';
import { Config as Option, Sequence as ISequence } from '../../../../';

export { scope } from './config/scope';

export class Config implements Option {
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
  }
  public readonly areas = ['body'];
  public readonly link = 'a';
  public filter(el: HTMLAnchorElement): boolean {
    return el.matches(':not([target])');
  }
  public readonly form = 'form:not([method])';
  public readonly replace = '';
  public readonly fetch = {
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
  public readonly sequence: ISequence<SequenceData.Fetch, SequenceData.Unload, SequenceData.Ready> = new Sequence();
  public readonly progressbar: string = 'display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);';
  public readonly scope: Record<string, Option | undefined> = {};
}

class Sequence {
  public async fetch(): Promise<SequenceData.Fetch> {
    return undefined as any;
  }
  public async unload(): Promise<SequenceData.Unload> {
    return undefined as any;
  }
  public async ready(): Promise<SequenceData.Ready> {
    return undefined as any;
  }
  public load(): void {
  }
}
export namespace SequenceData {
  declare class SequenceData<T> {
    private DATA: T;
  }
  export interface Fetch extends SequenceData<'fetch'> {
  }
  export interface Unload extends SequenceData<'unload'> {
  }
  export interface Ready extends SequenceData<'ready'> {
  }
}
