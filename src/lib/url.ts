export class Url<T extends string> {
  private readonly URL: T;
  constructor(url: PartialUrl<string> & T)
  constructor(url: T)
  constructor(url: T) {
    this.URL;
    this.parser.href = url || location.href;
    this.parser.setAttribute('href', url || location.href);
    Object.freeze(this);
  }
  private readonly parser = document.createElement('a');
  public get href(): T {
    return this.parser.href as any;
  }
  public get domain(): Url.Domain<T> {
    return `${this.protocol}//${this.host}` as any;
  }
  public get scheme(): Url.Scheme<T> {
    return this.parser.protocol.slice(0, -1) as any;
  }
  public get protocol(): Url.Protocol<T> {
    return this.parser.protocol as any;
  }
  public get userinfo(): Url.Userinfo<T> {
    return this.parser.href.match(/[^:/?#]+:\/\/([^/?#]*)@|$/)!.pop() || '' as any;
  }
  public get host(): Url.Host<T> {
    return this.parser.host as any;
  }
  public get hostname(): Url.Hostname<T> {
    return this.parser.hostname as any;
  }
  public get port(): Url.Port<T> {
    return this.parser.port as any;
  }
  public get path(): Url.Path<T> {
    return `${this.pathname}${this.query}` as any;
  }
  public get pathname(): Url.Pathname<T> {
    return this.parser.pathname as any;
  }
  public get query(): Url.Query<T> {
    return this.parser.search as any;
  }
  public get fragment(): Url.Fragment<T> {
    return this.parser.hash as any;
  }
}
export namespace Url {
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
