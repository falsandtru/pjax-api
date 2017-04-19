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
    return <any>this.parser.href;
  }
  public get domain(): Url.Domain<T> {
    return <any>`${this.protocol}//${this.host}`;
  }
  public get scheme(): Url.Scheme<T> {
    return <any>this.parser.protocol.slice(0, -1);
  }
  public get protocol(): Url.Protocol<T> {
    return <any>this.parser.protocol;
  }
  public get userinfo(): Url.Userinfo<T> {
    return <any>this.parser.href.match(/[^:/?#]+:\/\/([^/?#]*)@|$/)!.pop() || '';
  }
  public get host(): Url.Host<T> {
    return <any>this.parser.host;
  }
  public get hostname(): Url.Hostname<T> {
    return <any>this.parser.hostname;
  }
  public get port(): Url.Port<T> {
    return <any>this.parser.port;
  }
  public get path(): Url.Path<T> {
    return <any>`${this.pathname}${this.query}`;
  }
  public get pathname(): Url.Pathname<T> {
    return <any>this.parser.pathname;
  }
  public get query(): Url.Query<T> {
    return <any>this.parser.search;
  }
  public get fragment(): Url.Fragment<T> {
    return <any>this.parser.hash;
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
