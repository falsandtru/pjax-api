import { Maybe, Just, Nothing } from 'spica';
import { RouterEvent } from '../../../event/router';
import { Url } from '../../../../../lib/url';
import { canonicalizeUrl, CanonicalUrl } from '../../../../data/model/canonicalization/url';
import { validateUrl } from '../../../../data/model/validation/url';
import { find } from '../../../../../lib/dom';

export function scroll(
  type: RouterEvent.Type,
  document: Document,
  target: {
    hash: Url.Hash<CanonicalUrl>;
    top: number;
    left: number;
  },
  io = {
    hash,
    scroll: window.scrollTo,
    position: (_path: Url.Path<CanonicalUrl>) => ({
      top: <number | undefined>0,
      left: <number | undefined>0
    })
  }
): void {
  switch (type) {
    case RouterEvent.Type.click:
      return void (io.hash(document, target.hash, io) || scroll(target));
    case RouterEvent.Type.submit:
      return void scroll(target);
    case RouterEvent.Type.popstate:
      return void scroll(io.position(new Url(canonicalizeUrl(validateUrl(window.location.href))).path));
    default:
      throw new TypeError(type);
  }

  function scroll({top, left}: { top: number | undefined; left: number | undefined; }): void {
    left = left >= 0 ? left : window.pageXOffset;
    top = top >= 0 ? top : window.pageYOffset;
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
    .bind<string>(hash => hash.length > 0 ? Just(hash) : Nothing)
    .bind<HTMLElement>(hash =>
      find(document, `#${hash}, [name="${hash}"]`)
        .reduce<Maybe<HTMLElement>>((m, el) =>
          m.maybe(() => Just(el), Just)
        , Nothing))
    .fmap(el =>
      void io.scroll.call(
        window,
        window.pageXOffset,
        window.pageYOffset + el.getBoundingClientRect().top | 0))
    .maybe(
      () => false,
      () => true);
}
