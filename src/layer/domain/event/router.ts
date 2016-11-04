import { Url } from '../../../lib/url';
import { canonicalizeUrl, CanonicalUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import { serialize } from '../../../lib/dom';

export class RouterEvent {
  constructor(
    public readonly original: Event
  ) {
    void Object.freeze(this);
  }
  public readonly source: RouterEvent.Source = <HTMLAnchorElement>this.original._currentTarget;
  public readonly type: RouterEvent.Type = <RouterEvent.Type>this.original.type.toLowerCase();
  public readonly request: RouterEvent.Request = new RouterEvent.Request(this.source, this.type);
  public readonly location: RouterEvent.Location = new RouterEvent.Location(this.request.url);
}
export namespace RouterEvent {
  export type Source
    = Source.Anchor
    | Source.Form
    | Source.Window;
  export namespace Source {
    export type Anchor = HTMLAnchorElement;
    export type Form = HTMLFormElement;
    export type Window = typeof window;
  }

  export type Type
    = Type.click
    | Type.submit
    | Type.popstate;
  export namespace Type {
    export type click = 'click';
    export const click: click = 'click';
    export type submit = 'submit';
    export const submit: submit = 'submit';
    export type popstate = 'popstate';
    export const popstate: popstate = 'popstate';
  }

  export type Method
    = Method.GET
    | Method.POST;
  export namespace Method {
    export type GET = 'GET';
    export const GET: GET = 'GET';
    export type POST = 'POST';
    export const POST: POST = 'POST';
  }

  export class Request {
    constructor(
      private readonly source: Source,
      private readonly eventType: Type
    ) {
      void Object.freeze(this);
    }
    public method: Method = (() => {
      switch (this.eventType) {
        case Type.click:
          return Method.GET;
        case Type.submit:
          return (<Source.Form>this.source).method.toUpperCase() === Method.POST
            ? Method.POST
            : Method.GET;
        case Type.popstate:
          return Method.GET;
        default:
          throw new TypeError();
      }
    })();
    public url: CanonicalUrl = (() => {
      switch (this.eventType) {
        case Type.click:
          return canonicalizeUrl(validateUrl((<Source.Anchor>this.source).href));
        case Type.submit:
          return canonicalizeUrl(validateUrl(
            (<Source.Form>this.source).method.toUpperCase() === Method.POST
              ? (<Source.Form>this.source).action.split(/[?#]/).shift() !
              : (<Source.Form>this.source).action.split(/[?#]/).shift() !
                .concat(`?${serialize(<Source.Form>this.source)}`)));
        case Type.popstate:
          return canonicalizeUrl(validateUrl(window.location.href));
        default:
          throw new TypeError();
      }
    })();
    public readonly data: FormData | null = this.method === Method.POST
      ? new FormData(<Source.Form>this.source)
      : null;
  }

  export class Location {
    constructor(
      private readonly target: CanonicalUrl
    ) {
      void Object.freeze(this);
    }
    public readonly orig: Url<CanonicalUrl> = new Url(canonicalizeUrl(validateUrl(window.location.href)));
    public readonly dest: Url<CanonicalUrl> = new Url(this.target);
  }

}
