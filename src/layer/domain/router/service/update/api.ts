import { Either, Left, HNil } from 'spica';
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
import { saveTitle } from '../../../store/path';
import { Url } from '../../../../../lib/url';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';
import { DomainError } from '../../../data/error';

type Seq = void;

export function update(
  {
    event,
    config,
    state
  }: RouterEntity,
  {response: {headers, document}}: FetchValue,
  seq: Seq,
  io: {
    document: Document;
    scroll: (x?: number, y?: number) => void;
    position: (path: Url.Path<CanonicalUrl>) => { top: number | undefined; left: number | undefined; };
  }
): Promise<Either<Error, HTMLScriptElement[]>> {
  const {cancelable} = state;
  const {document: doc} = new UpdateValue({
    src: document,
    dst: io.document
  });
  return new HNil()
    .push(Promise.resolve(cancelable.either(seq)))
    // fetch -> unload
    .modify(p => p.then(m => m
      .bind(cancelable.either)
      .fmap<Promise<Either<Error, Seq>>>(seq =>
        separate(doc, config.areas)
          .fmap(([area]) =>
            void config.rewrite(doc.src, area, ''))
          .maybe(
            () =>
              Promise.resolve(Left(new DomainError(`Failed to separate areas.`))),
            () => (
              void window.dispatchEvent(new Event('pjax:unload')),
              config.sequence.unload(seq, { headers, document })
                .then<Either<Error, Seq>>(
                cancelable.either,
                e => Left<Error>(e instanceof Error ? e : new Error(e))))))
      .extract()))
    // unload -> ready
    .modify(p => p.then(m => m
      .bind(cancelable.either)
      .fmap<[Promise<Either<Error, [{ src: Document; dst: Document; }, Event[]]>>, Promise<Either<Error, HTMLScriptElement[]>>, Promise<Either<Error, Seq>>]>(seq => {
        const ps: [Promise<Either<Error, [{ src: Document; dst: Document; }, Event[]]>>, Promise<Either<Error, HTMLScriptElement[]>>, Promise<Either<Error, Seq>>] = <any>[];
        void new HNil().push(void 0)
          .modify(() =>
            void blur(doc.dst))
          .modify(() =>
            void url(event.location, doc.src.title, event.type, event.source, config.replace))
          .modify(() => (
            void saveTitle(event.location.orig.path, doc.src.title),
            void saveTitle(event.location.dest.path, doc.dst.title),
            void title(doc)))
          .modify(() =>
            void head(
              {
                src: doc.src.head,
                dst: doc.dst.head
              },
              config.load.head,
              config.load.ignore))
          .modify(() =>
            content(doc, config.areas)
              .maybe<Promise<Either<Error, [{ src: Document; dst: Document; }, Event[]]>>>(
                () => Promise.resolve(Left(new DomainError(`Failed to update areas.`))),
                p => p
                  .then(
                    cancelable.either,
                    e => Left<Error>(e instanceof Error ? e : new Error(e)))))
          .extend(() =>
            config.load.css
              ? void css(
                {
                  src: doc.src.head,
                  dst: doc.dst.head
                },
                config.load.ignore)
              : void 0)
          .modify(() =>
            config.load.css
              ? void css(
                {
                  src: <HTMLBodyElement>doc.src.body,
                  dst: <HTMLBodyElement>doc.dst.body
                },
                config.load.ignore)
              : void 0)
          .modify(() =>
            void focus(doc.dst))
          .modify(() =>
            void scroll(event.type, doc.dst,
              {
                hash: event.location.dest.hash,
                top: 0,
                left: 0
              },
              {
                hash: hash,
                scroll: io.scroll,
                position: io.position
              }))
          .modify(() =>
            config.load.script
              ? script(doc, state.script, config.load, cancelable)
              : Promise.resolve<Either<Error, HTMLScriptElement[]>>(cancelable.either([])))
          .extend(() => (
            void io.document.dispatchEvent(new Event('pjax:ready')),
            config.sequence.ready(seq)
              .then<Either<Error, Seq>>(cancelable.either, Left)))
          .walk(p => ps[2] = p)
          .walk(p => ps[1] = p)
          .walk(p => ps[0] = p);
        return ps;
      })))
    // ready -> load
    .modify(p => p.then(m => m
      .bind(cancelable.either)
      .fmap(([p1, p2, p3]) =>
          Promise.all([p1, p2, p3])
            .then(([m1, m2, m3]) => (
              void m1.bind(() => m2).bind(() => m3)
                .fmap(seq => (
                  void window.dispatchEvent(new Event('pjax:load')),
                  void config.sequence.load(seq)))
                .extract(e => e),
              m3.bind(() => m2))))
      .extract()))
    .head();
}
