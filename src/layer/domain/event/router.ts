import { Url } from '../../../lib/url';
import { StandardUrl, standardizeUrl } from '../../data/model/domain/url';
import { serialize } from '../../../lib/dom';
import { DomainError } from '../data/error';
import { currentTargets } from 'typed-dom';

export class RouterEvent {
  constructor(
    public readonly original: Event
  ) {
    assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => this.source instanceof Class));
    assert(['click', 'submit', 'popstate'].some(type => this.original.type === type));
    void Object.freeze(this);
  }
  public readonly source: RouterEventSource = <RouterEventSource>currentTargets.get(this.original);
  public readonly type: RouterEventType = <RouterEventType>this.original.type.toLowerCase();
  public readonly request: RouterEventRequest = new RouterEventRequest(this.source);
  public readonly location: RouterEventLocation = new RouterEventLocation(this.request.url);
}

export type RouterEventSource
  = RouterEventSource.Anchor
  | RouterEventSource.Form
  | RouterEventSource.Window;
export namespace RouterEventSource {
  export type Anchor = HTMLAnchorElement;
  export const Anchor = HTMLAnchorElement;
  export type Form = HTMLFormElement;
  export const Form = HTMLFormElement;
  export type Window = typeof window;
  export const Window = window.Window;
}

export type RouterEventType
  = RouterEventType.click
  | RouterEventType.submit
  | RouterEventType.popstate;
export namespace RouterEventType {
  export type click = typeof click;
  export const click = 'click';
  export type submit = typeof submit;
  export const submit = 'submit';
  export type popstate = typeof popstate;
  export const popstate = 'popstate';
}

export type RouterEventMethod
  = RouterEventMethod.GET
  | RouterEventMethod.POST;
export namespace RouterEventMethod {
  export type GET = typeof GET;
  export const GET = 'GET';
  export type POST = typeof POST;
  export const POST = 'POST';
}

export class RouterEventRequest {
  constructor(
    private readonly source: RouterEventSource
  ) {
    void Object.freeze(this);
  }
  public method: RouterEventMethod = (() => {
    if (this.source instanceof RouterEventSource.Anchor) {
      return RouterEventMethod.GET;
    }
    if (this.source instanceof RouterEventSource.Form) {
      return this.source.method.toUpperCase() === RouterEventMethod.POST
        ? RouterEventMethod.POST
        : RouterEventMethod.GET;
    }
    if (this.source instanceof RouterEventSource.Window) {
      return RouterEventMethod.GET;
    }
    throw new TypeError();
  })();
  public url: StandardUrl = (() => {
    if (this.source instanceof RouterEventSource.Anchor) {
      return standardizeUrl(this.source.href);
    }
    if (this.source instanceof RouterEventSource.Form) {
      return this.source.method.toUpperCase() === RouterEventMethod.GET
        ? standardizeUrl(this.source.action.split(/[?#]/).shift()!.concat(`?${serialize(this.source)}`))
        : standardizeUrl(this.source.action.split(/[?#]/).shift()!);
    }
    if (this.source instanceof RouterEventSource.Window) {
      return standardizeUrl(window.location.href);
    }
    throw new TypeError();
  })();
  public readonly data: FormData | null = (() =>
    this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST
      ? new FormData(this.source)
      : null)();
}

export class RouterEventLocation {
  constructor(
    private readonly target: StandardUrl
  ) {
    if (this.orig.domain !== this.dest.domain) throw new DomainError(`Cannot go to the different domain url ${this.dest.href}`);
    void Object.freeze(this);
  }
  public readonly orig: Url<StandardUrl> = new Url(standardizeUrl(window.location.href));
  public readonly dest: Url<StandardUrl> = new Url(this.target);
}
