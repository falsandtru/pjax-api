import { RouterEntity } from '../../model/eav/entity';

export function url(
  location: RouterEntity.Event.Location,
  title: string,
  type: RouterEntity.Event.Type,
  source: RouterEntity.Event.Source,
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
  type: RouterEntity.Event.Type,
  location: RouterEntity.Event.Location
): boolean {
  if (location.orig.href === location.dest.href) return false;
  switch (type) {
    case RouterEntity.Event.Type.click:
    case RouterEntity.Event.Type.submit:
      return true;
    case RouterEntity.Event.Type.popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isRegisterable as _isRegisterable }

function isReplaceable(
  type: RouterEntity.Event.Type,
  source: RouterEntity.Event.Source,
  selector: string
): boolean {
  switch (type) {
    case RouterEntity.Event.Type.click:
    case RouterEntity.Event.Type.submit:
      return (<RouterEntity.Event.Source.Form>source).matches(selector.trim() || '_');
    case RouterEntity.Event.Type.popstate:
      return false;
    default:
      throw new TypeError(type);
  }
}
export { isReplaceable as _isReplaceable }
