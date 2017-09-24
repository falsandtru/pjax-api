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
    scroll: window.scrollTo as (x?: number, y?: number) => void,
    hash,
  }
): void {
  switch (type) {
    case RouterEventType.click:
      if (io.hash(document, env.hash, io)) return;
      return void scroll({ top: 0, left: 0 });
    case RouterEventType.submit:
      return void scroll({ top: 0, left: 0 });
    case RouterEventType.popstate:
      return void scroll(env.position());
    default:
      throw new TypeError(type);
  }

  function scroll({ top, left }: { top: number; left: number; }): void {
    void io.scroll.call(window, left, top);
  }
}

function hash(
  document: Document,
  hash: URL.Fragment<StandardUrl>,
  io = {
    scroll: window.scrollTo as (x?: number, y?: number) => void,
  }
): boolean {
  const index = hash.slice(1);
  if (index.length === 0) return false;
  const el = document.getElementById(index) || document.getElementsByName(index)[0];
  if (!el) return false;
  void io.scroll.call(
    window,
    window.pageXOffset,
    window.pageYOffset + el.getBoundingClientRect().top | 0);
  return true;
}
export { hash as _hash }
