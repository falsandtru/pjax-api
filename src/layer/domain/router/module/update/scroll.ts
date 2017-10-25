import { RouterEventType } from '../../../event/router';
import { URL } from '../../../../../lib/url';
import { StandardUrl } from '../../../../data/model/domain/url';

export function scroll(
  type: RouterEventType,
  document: Document,
  env: {
    hash: URL.Fragment<StandardUrl>,
    position: () => {
      top: number;
      left: number;
    },
  },
  io = {
    scrollToElement: (el: HTMLElement): void => void el.scrollIntoView(),
    scrollToPosition: ({ top, left }: { top: number; left: number; }): void => void window.scrollTo(left, top),
    hash,
  }
): void {
  switch (type) {
    case RouterEventType.click:
      if (io.hash(document, env.hash, io)) return;
      return void io.scrollToPosition({ top: 0, left: 0 });
    case RouterEventType.submit:
      return void io.scrollToPosition({ top: 0, left: 0 });
    case RouterEventType.popstate:
      return void io.scrollToPosition(env.position());
    default:
      throw new TypeError(type);
  }
}

function hash(
  document: Document,
  hash: URL.Fragment<StandardUrl>,
  io = {
    scrollToElement: (el: HTMLElement): void => void el.scrollIntoView(),
  }
): boolean {
  const index = hash.slice(1);
  if (index.length === 0) return false;
  const el = document.getElementById(index) || document.getElementsByName(index)[0];
  if (!el) return false;
  void io.scrollToElement(el);
  return true;
}
export { hash as _hash }
