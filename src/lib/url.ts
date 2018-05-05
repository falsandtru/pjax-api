const IDENTITY = Symbol();

export class URL<T extends string> {
  private readonly [IDENTITY]: never;
  constructor(url: PartialUrl<string> & T)
  constructor(url: T)
  constructor(url: T) {
    this[IDENTITY];
    this.parser.href = url || location.href;
    assert(this.parser.href.startsWith(this.parser.protocol));
    Object.freeze(this);
  }
  private readonly parser = document.createElement('a');
  public get href(): URL.Absolute<T> {
    return this.parser.href as any;
  }
  public get origin(): URL.Origin<T> {
    return `${this.protocol}//${this.host}` as any;
  }
  public get domain(): URL.Domain<T> {
    return `${this.protocol}//${this.hostname}` as any;
  }
  public get scheme(): URL.Scheme<T> {
    return this.parser.protocol.slice(0, -1) as any;
  }
  public get protocol(): URL.Protocol<T> {
    return this.parser.protocol as any;
  }
  public get userinfo(): URL.Userinfo<T> {
    return this.parser.href.match(/[^:/?#]+:\/\/([^/?#]*)@|$/)!.pop() || '' as any;
  }
  public get host(): URL.Host<T> {
    return this.parser.host as any;
  }
  public get hostname(): URL.Hostname<T> {
    return this.parser.hostname as any;
  }
  public get port(): URL.Port<T> {
    return this.parser.port as any;
  }
  public get path(): URL.Path<T> {
    return `${this.pathname}${this.query}` as any;
  }
  public get pathname(): URL.Pathname<T> {
    return this.parser.pathname as any;
  }
  public get query(): URL.Query<T> {
    return this.parser.search as any;
  }
  public get fragment(): URL.Fragment<T> {
    return this.parser.href.replace(/^[^#]+/, '') as any;
  }
}
export namespace URL {
  export type Absolute<T extends string> = PartialUrl<'absolute'> & T;
  export type Origin<T extends string> = PartialUrl<'origin'> & T;
  export type Domain<T extends string> = PartialUrl<'domain'> & T;
  export type Scheme<T extends string> = PartialUrl<'scheme'> & T;
  export type Protocol<T extends string> = PartialUrl<'protocol'> & T;
  export type Userinfo<T extends string> = PartialUrl<'userinfo'> & T;
  export type Host<T extends string> = PartialUrl<'host'> & T;
  export type Hostname<T extends string> = PartialUrl<'hostname'> & T;
  export type Port<T extends string> = PartialUrl<'port'> & T;
  export type Path<T extends string> = PartialUrl<'path'> & T;
  export type Pathname<T extends string> = PartialUrl<'pathname'> & T;
  export type Query<T extends string> = PartialUrl<'query'> & T;
  export type Fragment<T extends string> = PartialUrl<'fragment'> & T;
}

declare class PartialUrl<T extends string> {
  private readonly URL: T;
}
