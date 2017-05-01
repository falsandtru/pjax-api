import { Url } from '../../../lib/url';
import { canonicalizeUrl, CanonicalUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import { serialize } from '../../../lib/dom';
import { DomainError } from '../data/error';

export class RouterEvent {
  constructor(
    public readonly original: Event
  ) {
    assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => this.source instanceof Class));
    assert(['click', 'submit', 'popstate'].some(type => this.original.type === type));
    void Object.freeze(this);
  }
  public readonly source: RouterEventSource = <HTMLAnchorElement>this.original._currentTarget;
  public readonly type: RouterEventType = <RouterEventType>this.original.type.toLowerCase();
  public readonly request: RouterEventRequest = new RouterEventRequest(this.source, this.type);
  public readonly location: RouterEventLocation = new RouterEventLocation(this.request.url);
}

export type RouterEventSource
  = RouterEventSource.Anchor
  | RouterEventSource.Form
  | RouterEventSource.Window;
export namespace RouterEventSource {
  export type Anchor = HTMLAnchorElement;
  export type Form = HTMLFormElement;
  export type Window = typeof window;
}

export type RouterEventType
  = RouterEventType.click
  | RouterEventType.submit
  | RouterEventType.popstate;
export namespace RouterEventType {
  export const click = 'click';
  export type click = typeof click;
  export const submit = 'submit';
  export type submit = typeof submit;
  export const popstate = 'popstate';
  export type popstate = typeof popstate;
}

export type RouterEventMethod
  = RouterEventMethod.GET
  | RouterEventMethod.POST;
export namespace RouterEventMethod {
  export const GET = 'GET';
  export type GET = typeof GET;
  export const POST = 'POST';
  export type POST = typeof POST;
}

export class RouterEventRequest {
  constructor(
    private readonly source: RouterEventSource,
    private readonly eventType: RouterEventType
  ) {
    void Object.freeze(this);
  }
  public method: RouterEventMethod = (() => {
    switch (this.eventType) {
      case RouterEventType.click:
        return RouterEventMethod.GET;
      case RouterEventType.submit:
        return (<RouterEventSource.Form>this.source).method.toUpperCase() === RouterEventMethod.POST
          ? RouterEventMethod.POST
          : RouterEventMethod.GET;
      case RouterEventType.popstate:
        return RouterEventMethod.GET;
      default:
        throw new TypeError();
    }
  })();
  public url: CanonicalUrl = (() => {
    switch (this.eventType) {
      case RouterEventType.click:
        return canonicalizeUrl(validateUrl((<RouterEventSource.Anchor>this.source).href));
      case RouterEventType.submit:
        return canonicalizeUrl(validateUrl(
          (<RouterEventSource.Form>this.source).method.toUpperCase() === RouterEventMethod.POST
            ? (<RouterEventSource.Form>this.source).action.split(/[?#]/).shift() !
            : (<RouterEventSource.Form>this.source).action.split(/[?#]/).shift() !
              .concat(`?${serialize(<RouterEventSource.Form>this.source)}`)));
      case RouterEventType.popstate:
        return canonicalizeUrl(validateUrl(window.location.href));
      default:
        throw new TypeError();
    }
  })();
  public readonly data: FormData | null = this.method === RouterEventMethod.POST
    ? new FormData(<RouterEventSource.Form>this.source)
    : null;
}

export class RouterEventLocation {
  constructor(
    private readonly target: CanonicalUrl
  ) {
    if (this.orig.domain !== this.dest.domain) throw new DomainError(`Cannot go to the different domain url ${this.dest.href}`);
    void Object.freeze(this);
  }
  public readonly orig: Url<CanonicalUrl> = new Url(canonicalizeUrl(validateUrl(window.location.href)));
  public readonly dest: Url<CanonicalUrl> = new Url(this.target);
}
