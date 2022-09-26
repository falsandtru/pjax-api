import { RouterEventSource, RouterEventType, RouterEventLocation } from '../../../event/router';
import { bind } from 'typed-dom/listener';

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
  switch (type) {
    case RouterEventType.Click:
    case RouterEventType.Submit:
      return location.dest.href !== location.orig.href;
    case RouterEventType.Popstate:
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
    case RouterEventType.Click:
    case RouterEventType.Submit:
      return (source as RouterEventSource.Form).matches(selector.trim() || '_');
    case RouterEventType.Popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isReplaceable as _isReplaceable }
