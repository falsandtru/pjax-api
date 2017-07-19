import { Maybe, Just, Nothing } from 'spica/maybe';
import { RouterEventType } from '../../../event/router';
import { Url } from '../../../../../lib/url';
import { StandardUrl } from '../../../../data/model/domain/url';
import { find } from '../../../../../lib/dom';

export function scroll(
  type: RouterEventType,
  document: Document,
  target: {
    hash: Url.Fragment<StandardUrl>;
    top: number;
    left: number;
  },
  io = {
    hash,
    scroll: <(x?: number, y?: number) => void>window.scrollTo,
    position: () => ({
      top: 0,
      left: 0
    })
  }
): void {
  switch (type) {
    case RouterEventType.click:
      return void (io.hash(document, target.hash, io) || scroll(target));
    case RouterEventType.submit:
      return void scroll(target);
    case RouterEventType.popstate:
      return void scroll(io.position());
    default:
      throw new TypeError(type);
  }

  function scroll({top, left}: { top: number | undefined; left: number | undefined; }): void {
    left = left === void 0 || left >= 0 ? left : window.pageXOffset;
    top = top === void 0 || top >= 0 ? top : window.pageYOffset;
    void io.scroll.call(window, left, top);
  }
}

export function hash(
  document: Document,
  hash: Url.Fragment<StandardUrl>,
  io = {
    scroll: <(x?: number, y?: number) => void>window.scrollTo,
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
