import { RouterEventSource, RouterEventType, RouterEventLocation } from '../../../event/router';
import { bind } from 'typed-dom';

// A part of the workaround to record the correct browser history.
void bind(document, 'pjax:ready', () =>
  void window.history.replaceState(
    window.history.state,
    window.document.title));

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
        {},
        title,
        location.dest.href);
    case isRegisterable(type, location):
      assert(location.dest.href !== location.orig.href);
      return void window.history.pushState(
        {},
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
  if (location.dest.href === location.orig.href) return false;
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
