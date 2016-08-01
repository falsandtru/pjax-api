declare module 'pjax-api' {
  export default Pjax;

  export class Pjax {
    static assign(url: string, config: Config): undefined;
    static replace(url: string, config: Config): undefined;
    constructor(
      config: Config,
      io?: {
        document: Document;
      })
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
    readonly rewrite?: (doc: Document, area: string, host: string) => void;
    readonly load?: {
      readonly head?: string;
      readonly css?: boolean;
      readonly script?: boolean;
      readonly ignore?: string;
      readonly reload?: string;
      readonly logger?: string;
    };
    readonly fallback?: (target: HTMLAnchorElement | HTMLFormElement | Window, reason: any) => void;
    readonly balance?: {
      readonly bounds?: string[];
      readonly weight?: number;
      readonly random?: number;
      readonly client?: {
        readonly hosts?: string[];
        readonly support?: {
          readonly balance?: RegExp;
          readonly redirect?: RegExp;
        };
        readonly cookie?: {
          readonly balance?: string;
          readonly redirect?: string;
        };
      };
      readonly server?: {
        readonly header?: string;
        readonly respite?: number;
        readonly expires?: number;
      };
    };
    readonly store?: {
      readonly expiry?: number;
    };
    readonly scope?: { [path: string]: Config | undefined; };
  }

}
