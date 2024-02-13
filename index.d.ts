import { Dict } from 'spica/dict';

export default Pjax;

export class Pjax {
  static assign(url: string, config: Config): boolean;
  static replace(url: string, config: Config): boolean;
  static sync(isPjaxPage?: boolean): void;
  static pushURL(url: string, title: string, state?: any): void;
  static replaceURL(url: string, title: string, state?: any): void;
  constructor(config: Config);
  assign(url: string): boolean;
  replace(url: string): boolean;
}

export interface Config {
  readonly areas?: string[];
  readonly link?: string;
  readonly filter?: (el: HTMLAnchorElement | HTMLAreaElement) => boolean;
  readonly form?: string;
  readonly replace?: string;
  readonly memory?: Dict<string, Document>;
  readonly fetch?: {
    readonly rewrite?: (url: string, method: string, headers: Headers, timeout: number, body: FormData | null, memory?: Document) => XMLHttpRequest | undefined;
    readonly headers?: Headers;
    readonly timeout?: number;
    readonly wait?: number;
  };
  readonly update?: {
    readonly rewrite?: (url: string, document: Document, area: string, memory?: Document) => void;
    readonly head?: string;
    readonly css?: boolean;
    readonly script?: boolean;
    readonly ignore?: string;
    readonly reload?: string;
    readonly logger?: string;
  };
  readonly fallback?: (target: HTMLAnchorElement | HTMLAreaElement | HTMLFormElement | Window, reason: unknown) => void;
  readonly sequence?: Sequence<any, any, any, any>;
  readonly scope?: Record<string, Config | undefined>;
  readonly isolation?: boolean;
}

export interface Sequence<a, b, c, d> {
  readonly fetch: (result: void, request: { path: string; method: string; headers: Headers; body: FormData | null; }) => PromiseLike<a>;
  readonly unload: (result: a, response: { url: string; header: (name: string) => string | null; document: Document; }) => PromiseLike<b>;
  readonly content: (result: b, areas: HTMLElement[]) => PromiseLike<c>;
  readonly ready: (result: c) => PromiseLike<d>;
  readonly load: (result: d, events: Event[]) => PromiseLike<void>;
}

declare global {
  interface WindowEventMap {
    'pjax:fetch': Event;
    'pjax:unload': Event;
    'pjax:load': Event;
  }

  interface DocumentEventMap {
    'pjax:content': Event;
    'pjax:ready': Event;
  }

}

export class FakeXMLHttpRequest extends XMLHttpRequest {
  public static create(url: string, response: Document | PromiseLike<Document>): FakeXMLHttpRequest;
}
