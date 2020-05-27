import { RouterEventType } from '../../../event/router';

export function focus(
  type: RouterEventType,
  document: Document,
): undefined {
  switch (type) {
    case RouterEventType.click:
    case RouterEventType.submit:
      return void [...document.querySelectorAll<HTMLElement>('[autofocus]')]
        .slice(-1)
        .filter(el =>
          el.closest('html') === window.document.documentElement &&
          el !== document.activeElement)
        .forEach(el =>
          void el.focus());
    case RouterEventType.popstate:
      return;
    default:
      throw new TypeError(type);
  }
}
