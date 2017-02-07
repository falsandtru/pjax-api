import { Maybe, Just, Nothing } from 'spica';
import { RouterEntity } from '../../model/eav/entity';
import { Url } from '../../../../../lib/url';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';
import { find } from '../../../../../lib/dom';

export function scroll(
  type: RouterEntity.Event.Type,
  document: Document,
  target: {
    hash: Url.Hash<CanonicalUrl>;
    top: number;
    left: number;
  },
  io = {
    hash,
    scroll: window.scrollTo,
    position: () => ({
      top: 0,
      left: 0
    })
  }
): void {
  switch (type) {
    case RouterEntity.Event.Type.click:
      return void (io.hash(document, target.hash, io) || scroll(target));
    case RouterEntity.Event.Type.submit:
      return void scroll(target);
    case RouterEntity.Event.Type.popstate:
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
  hash: Url.Hash<CanonicalUrl>,
  io = {
    scroll: window.scrollTo
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
