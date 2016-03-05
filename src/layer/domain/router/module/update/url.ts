import { RouterEvent } from '../../../event/router';

export function url(
  location: RouterEvent.Location,
  title: string,
  type: RouterEvent.Type,
  source: RouterEvent.Source,
  replaceable: string
): undefined {
  switch (true) {
    case isReplaceable(type, source, replaceable):
      return void window.history.replaceState(
        null,
        title,
        location.dest.href + '');
    case isRegisterable(type, location):
      return void window.history.pushState(
        null,
        title,
        location.dest.href + '');
    default:
      return;
  }
}

function isRegisterable(
  type: RouterEvent.Type,
  location: RouterEvent.Location
): boolean {
  if (location.orig.href === location.dest.href) return false;
  switch (type) {
    case RouterEvent.Type.click:
    case RouterEvent.Type.submit:
      return true;
    case RouterEvent.Type.popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isRegisterable as _isRegisterable }

function isReplaceable(
  type: RouterEvent.Type,
  source: RouterEvent.Source,
  selector: string
): boolean {
  switch (type) {
    case RouterEvent.Type.click:
    case RouterEvent.Type.submit:
      return (<RouterEvent.Source.Form>source).matches(selector.trim() || '_');
    case RouterEvent.Type.popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isReplaceable as _isReplaceable }
