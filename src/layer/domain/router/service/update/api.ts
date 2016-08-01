import { Either, Right, Maybe, Just, HList, HNil } from 'spica';
import { RouterEntity } from '../../model/eav/entity';
import { FetchValue } from '../../model/eav/value/fetch';
import { UpdateValue } from '../../model/eav/value/update';
import { blur } from '../../module/update/blur';
import { url } from '../../module/update/url';
import { title } from '../../module/update/title';
import { head } from '../../module/update/head';
import { content, separate } from '../../module/update/content';
import { css } from '../../module/update/css';
import { script } from '../../module/update/script';
import { focus } from '../../module/update/focus';
import { scroll, hash } from '../../module/update/scroll';
import { Url } from '../../../../../lib/url';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';

export function update(
  {
    event,
    config,
    state
  }: RouterEntity,
  {response}: FetchValue,
  io: {
    document: Document;
    scroll: (x?: number, y?: number) => void;
    position: (path: Url.Path<CanonicalUrl>) => { top: number | undefined; left: number | undefined; };
  }
):
  HList<Maybe<Promise<Either<Error, HTMLScriptElement[]>>>,
  HList<Maybe<Promise<[{ src: Document; dst: Document; }, Event[]]>>,
  HNil>> {
  const {document} = new UpdateValue({
    src: response.document,
    dst: io.document
  });
  const loads: Promise<any>[] = [];
  return new HNil()
    .push(Just(0))
    .modify(m => m.bind(() =>
      separate(document, config.areas)
        .fmap(([area]) =>
          void config.rewrite(document.src, area, ''))))
    .modify(m => m.fmap(() =>
      void window.dispatchEvent(new Event('pjax:unload'))))
    .modify(m => m.fmap(() =>
      void blur(document.dst)))
    .modify(m => m.fmap(() =>
      void url(
        event.location,
        document.src.title,
        event.type,
        event.source,
        config.replace)))
    .modify(m => m.fmap(() =>
      void title(document)))
    .modify(m => m.fmap(() =>
      void head(
        {
          src: document.src.head,
          dst: document.dst.head
        },
        config.load.head,
        config.load.ignore)))
    .modify(m => m.bind(() =>
      content(
        document,
        config.areas)))
    .extend(m => m.fmap(p =>
      void loads.push(p)))
    .modify(m => m.fmap(() =>
      config.load.css
        ? void css(
          {
            src: document.src.head,
            dst: document.dst.head
          },
          config.load.ignore)
        : void 0))
    .modify(m => m.fmap(() =>
      config.load.css
        ? void css(
          {
            src: <HTMLBodyElement>document.src.body,
            dst: <HTMLBodyElement>document.dst.body
          },
          config.load.ignore)
        : void 0))
    .modify(m => m.fmap(() =>
      void focus(document.dst)))
    .modify(m => m.fmap(() =>
      void scroll(
        event.type,
        document.dst,
        {
          hash: event.location.dest.hash,
          top: 0,
          left: 0
        },
        {
          hash: hash,
          scroll: io.scroll,
          position: io.position
        })))
    .modify(m => m.fmap(() =>
      config.load.script
        ? script(
          document,
          state.script,
          config.load,
          state.cancelable)
        : Promise.resolve<Either<Error, HTMLScriptElement[]>>(Right([]))))
    .modify(m => m.fmap(p =>
      p.then(m => m.fmap(scripts => (
        void io.document.dispatchEvent(new Event('pjax:ready')),
        void loads.push(p),
        void Promise.all(loads)
          .then(() =>
            void window.dispatchEvent(new Event('pjax:load'))),
        scripts)))));
}
