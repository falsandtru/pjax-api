const IDENTITY = Symbol();

export class URL<T extends string> {
  private readonly [IDENTITY]: never;
  constructor(url: PartialURL<string> & T)
  constructor(url: T)
  constructor(url: T) {
    this[IDENTITY];
    this.url = new window.URL(url, window.location.href);
    assert(this.url.href.startsWith(this.url.protocol));
    Object.freeze(this);
  }
  private readonly url: InstanceType<typeof window.URL>;
  public get href(): URL.Absolute<T> {
    return this.url.href as any;
  }
  public get origin(): URL.Origin<T> {
    return `${this.protocol}//${this.host}` as any;
  }
  public get domain(): URL.Domain<T> {
    return `${this.protocol}//${this.hostname}` as any;
  }
  public get scheme(): URL.Scheme<T> {
    return this.url.protocol.slice(0, -1) as any;
  }
  public get protocol(): URL.Protocol<T> {
    return this.url.protocol as any;
  }
  public get userinfo(): URL.Userinfo<T> {
    return this.url.href.match(/[^:/?#]+:\/\/([^/?#]*)@|$/)!.pop() || '' as any;
  }
  public get host(): URL.Host<T> {
    return this.url.host as any;
  }
  public get hostname(): URL.Hostname<T> {
    return this.url.hostname as any;
  }
  public get port(): URL.Port<T> {
    return this.url.port as any;
  }
  public get path(): URL.Path<T> {
    return `${this.pathname}${this.query}` as any;
  }
  public get pathname(): URL.Pathname<T> {
    return this.url.pathname as any;
  }
  public get query(): URL.Query<T> {
    return this.url.search as any;
  }
  public get fragment(): URL.Fragment<T> {
    return this.url.href.replace(/^[^#]+/, '') as any;
  }
}
export namespace URL {
  export type Absolute<T extends string> = PartialURL<'absolute'> & T;
  export type Origin<T extends string> = PartialURL<'origin'> & T;
  export type Domain<T extends string> = PartialURL<'domain'> & T;
  export type Scheme<T extends string> = PartialURL<'scheme'> & T;
  export type Protocol<T extends string> = PartialURL<'protocol'> & T;
  export type Userinfo<T extends string> = PartialURL<'userinfo'> & T;
  export type Host<T extends string> = PartialURL<'host'> & T;
  export type Hostname<T extends string> = PartialURL<'hostname'> & T;
  export type Port<T extends string> = PartialURL<'port'> & T;
  export type Path<T extends string> = PartialURL<'path'> & T;
  export type Pathname<T extends string> = PartialURL<'pathname'> & T;
  export type Query<T extends string> = PartialURL<'query'> & T;
  export type Fragment<T extends string> = PartialURL<'fragment'> & T;
}

declare class PartialURL<T extends string> {
  private readonly URL: T;
}
