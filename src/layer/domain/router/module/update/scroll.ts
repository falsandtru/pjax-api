import { Maybe, Just, Nothing } from 'spica/maybe';
import { RouterEventType } from '../../../event/router';
import { URL } from '../../../../../lib/url';
import { StandardUrl } from '../../../../data/model/domain/url';
import { find } from '../../../../../lib/dom';

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

  function scroll({ top, left }: { top: number | undefined; left: number | undefined; }): void {
    left = left === void 0 || left >= 0 ? left : window.pageXOffset;
    top = top === void 0 || top >= 0 ? top : window.pageYOffset;
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
  return Just(hash.split('#').pop() || '')
    .bind(hash => hash.length > 0 ? Just(hash) : Nothing)
    .bind(hash =>
      find(document, `#${hash}, [name="${hash}"]`)
        .reduce<Maybe<HTMLElement>>((m, el) =>
          m.extract(() => Just(el), Just)
        , Nothing))
    .fmap(el =>
      void io.scroll.call(
        window,
        window.pageXOffset,
        window.pageYOffset + el.getBoundingClientRect().top | 0))
    .extract(
      () => false,
      () => true);
}
export { hash as _hash }
