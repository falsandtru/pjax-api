import { URL } from '../../../lib/url';
import { StandardUrl, standardizeUrl } from '../../data/model/domain/url';
import { serialize } from '../../../lib/dom';
import { currentTargets } from 'typed-dom';

export class RouterEvent {
  constructor(
    public readonly original: Event
  ) {
    assert(['click', 'submit', 'popstate'].some(type => this.original.type === type));
    assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => this.source instanceof Class));
    void Object.freeze(this);
  }
  public readonly type: RouterEventType = this.original.type.toLowerCase() as RouterEventType;
  public readonly source: RouterEventSource = currentTargets.get(this.original) as RouterEventSource;
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
  = typeof RouterEventType.click
  | typeof RouterEventType.submit
  | typeof RouterEventType.popstate;
export namespace RouterEventType {
  export const click = 'click';
  export const submit = 'submit';
  export const popstate = 'popstate';
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
    private readonly source: RouterEventSource
  ) {
    void Object.freeze(this);
  }
  public readonly method: RouterEventMethod = (() => {
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
  public readonly url: StandardUrl = (() => {
    if (this.source instanceof RouterEventSource.Anchor) {
      return standardizeUrl(this.source.href);
    }
    if (this.source instanceof RouterEventSource.Form) {
      return this.source.method.toUpperCase() === RouterEventMethod.GET
        ? standardizeUrl(this.source.action.split(/[?#]/)[0] + `?${serialize(this.source)}`)
        : standardizeUrl(this.source.action.split(/[?#]/)[0]);
    }
    if (this.source instanceof RouterEventSource.Window) {
      return standardizeUrl(window.location.href);
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
    private readonly target: StandardUrl
  ) {
    void Object.freeze(this);
  }
  public readonly orig: URL<StandardUrl> = new URL(standardizeUrl(window.location.href));
  public readonly dest: URL<StandardUrl> = new URL(this.target);
}
