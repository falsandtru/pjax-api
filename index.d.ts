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
  readonly fetch?: {
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
  readonly sequence?: Sequence<any, any, any>;
  readonly scope?: Record<string, Config | undefined>;
}

export interface Sequence<a, b, c> {
  readonly fetch: (result: void, request: { path: string; method: string; data: FormData | null; }) => Promise<a>;
  readonly unload: (result: a, response: { url: string; header: (name: string) => string | null; document: Document; }) => Promise<b>;
  readonly ready: (result: b, areas: HTMLElement[]) => Promise<c>;
  readonly load: (result: c, events: Event[]) => void;
}

declare global {
  interface WindowEventMap {
    'pjax:fetch': Event;
    'pjax:unload': Event;
    'pjax:load': Event;
  }

  interface DocumentEventMap {
    'pjax:ready': Event;
  }

}

export function router<T>(config: { [pattern: string]: (path: string) => T; }): (url: string) => T;
