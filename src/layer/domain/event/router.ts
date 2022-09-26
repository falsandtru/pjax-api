import { Object } from 'spica/global';
import { serialize } from '../../../lib/dom';
import { URL, StandardURL, standardize } from 'spica/url';
import { currentTarget } from 'typed-dom/listener';

export class RouterEvent {
  constructor(
    public readonly original: Event,
    private readonly base: URL<StandardURL>
  ) {
    assert(['click', 'submit', 'popstate'].includes(this.original.type));
    assert([HTMLAnchorElement, HTMLAreaElement, HTMLFormElement, Window].some(Class => this.source instanceof Class));
    void Object.freeze(this);
  }
  public readonly type: RouterEventType = this.original.type.toLowerCase() as RouterEventType;
  public readonly source: RouterEventSource = this.original[currentTarget] as RouterEventSource;
  public readonly request = new RouterEventRequest(this.source, this.base);
  public readonly location = new RouterEventLocation(this.base, this.request.url);
}

export type RouterEventSource
  = RouterEventSource.Link
  | RouterEventSource.Form
  | RouterEventSource.Window;
export namespace RouterEventSource {
  export type Link = HTMLAnchorElement | HTMLAreaElement;
  export const Anchor = HTMLAnchorElement;
  export const Area = HTMLAreaElement;
  export type Form = HTMLFormElement;
  export const Form = HTMLFormElement;
  export type Window = typeof window;
  export const Window = window.Window;
}

export type RouterEventType
  = typeof RouterEventType.Click
  | typeof RouterEventType.Submit
  | typeof RouterEventType.Popstate;
export namespace RouterEventType {
  export const Click = 'click';
  export const Submit = 'submit';
  export const Popstate = 'popstate';
}

export type RouterEventMethod
  = typeof RouterEventMethod.GET
  | typeof RouterEventMethod.POST;
export namespace RouterEventMethod {
  export const GET = 'GET';
  export const POST = 'POST';
}

export class RouterEventRequest {
  constructor(
    private readonly source: RouterEventSource,
    private readonly base: URL<StandardURL>,
  ) {
    void Object.freeze(this);
  }
  public readonly method: RouterEventMethod = (() => {
    if (this.source instanceof RouterEventSource.Anchor || this.source instanceof RouterEventSource.Area) {
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
  public readonly url: URL<StandardURL> = (() => {
    if (this.source instanceof RouterEventSource.Anchor || this.source instanceof RouterEventSource.Area) {
      return new URL(standardize(this.source.href, this.base.href));
    }
    if (this.source instanceof RouterEventSource.Form) {
      return this.source.method.toUpperCase() === RouterEventMethod.GET
        ? new URL(standardize(this.source.action.split(/[?#]/)[0] + `?${serialize(this.source)}`, this.base.href))
        : new URL(standardize(this.source.action.split(/[?#]/)[0], this.base.href));
    }
    if (this.source instanceof RouterEventSource.Window) {
      return new URL(standardize(window.location.href));
    }
    throw new TypeError();
  })();
  public readonly body: FormData | null = (() =>
    this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST
      ? new FormData(this.source)
      : null)();
}

export class RouterEventLocation {
  constructor(
    public readonly orig: URL<StandardURL>,
    public readonly dest: URL<StandardURL>
  ) {
    void Object.freeze(this);
  }
}
