export default Pjax;

export class Pjax {
  static assign(url: string, config: Config): undefined;
  static replace(url: string, config: Config): undefined;
  constructor(
    config: Config,
    io?: {
      document: Document;
    });
  assign(url: string): undefined;
  replace(url: string): undefined;
}

export interface Config {
  readonly areas?: string[];
  readonly link?: string;
  readonly filter?: (el: HTMLAnchorElement) => boolean;
  readonly form?: string;
  readonly replace?: string;
  readonly redirect?: (path: string) => string;
  readonly fetch?: {
    readonly headers?: Headers;
    readonly timeout?: number;
    readonly wait?: number;
  };
  readonly rewrite?: (doc: Document, area: string) => void;
  readonly update?: {
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
  readonly fetch: (result: void, request: { path: string; method: string; headers: Headers; body: FormData | null; }) => Promise<a>;
  readonly unload: (result: a, response: { url: string; header: (name: string) => string | null; document: Document; }) => Promise<b>;
  readonly content: (result: b, areas: HTMLElement[]) => Promise<c>;
  readonly ready: (result: c) => Promise<d>;
  readonly load: (result: d, events: Event[]) => Promise<void>;
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
