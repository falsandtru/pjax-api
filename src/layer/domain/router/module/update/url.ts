import { RouterEventSource, RouterEventType, RouterEventLocation } from '../../../event/router';

export function url(
  location: RouterEventLocation,
  title: string,
  type: RouterEventType,
  source: RouterEventSource,
  replaceable: string
): undefined {
  switch (true) {
    case isReplaceable(type, source, replaceable):
      return void window.history.replaceState(
        null,
        title,
        location.dest.href);
    case isRegisterable(type, location):
      return void window.history.pushState(
        null,
        title,
        location.dest.href);
    default:
      return;
  }
}

function isRegisterable(
  type: RouterEventType,
  location: RouterEventLocation
): boolean {
  if (location.orig.href === location.dest.href) return false;
  switch (type) {
    case RouterEventType.click:
    case RouterEventType.submit:
      return true;
    case RouterEventType.popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isRegisterable as _isRegisterable }

function isReplaceable(
  type: RouterEventType,
  source: RouterEventSource,
  selector: string
): boolean {
  switch (type) {
    case RouterEventType.click:
    case RouterEventType.submit:
      return (source as RouterEventSource.Form).matches(selector.trim() || '_');
    case RouterEventType.popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isReplaceable as _isReplaceable }
