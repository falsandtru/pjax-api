import { RouterEventType } from '../../../event/router';

export function focus(
  type: RouterEventType,
  document: Document,
): void {
  switch (type) {
    case RouterEventType.Click:
    case RouterEventType.Submit:
      return void [...document.querySelectorAll<HTMLElement>('[autofocus]')]
        .slice(-1)
        .filter(el =>
          el.closest('html') === window.document.documentElement &&
          el !== document.activeElement)
        .forEach(el =>
          void el.focus());
    case RouterEventType.Popstate:
      return;
    default:
      throw new TypeError(type);
  }
}
