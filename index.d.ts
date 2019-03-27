export default Pjax;

export class Pjax {
  static assign(url: string, config: Config): boolean;
  static replace(url: string, config: Config): boolean;
  constructor(
    config: Config,
    io?: {
      document: Document;
    });
  assign(url: string): boolean;
  replace(url: string): boolean;
}

export interface Config {
  readonly areas?: string[];
  readonly link?: string;
  readonly filter?: (el: HTMLAnchorElement) => boolean;
  readonly form?: string;
  readonly replace?: string;
  readonly fetch?: {
    readonly rewrite?: (path: string) => string;
    readonly cache?: (path: string, headers: Headers) => string;
    readonly headers?: Headers;
    readonly timeout?: number;
    readonly wait?: number;
  };
  readonly update?: {
    readonly rewrite?: (doc: Document, area: string) => void;
    readonly head?: string;
    readonly css?: boolean;
    readonly script?: boolean;
    readonly ignore?: string;
    readonly reload?: string;
    readonly logger?: string;
  };
  readonly fallback?: (target: HTMLAnchorElement | HTMLFormElement | Window, reason: any) => void;
  readonly sequence?: Sequence<any, any, any, any>;
  readonly scope?: Record<string, Config | undefined>;
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

export function router<T>(config: Record<string, (path: string) => T>): (url: string) => T;
