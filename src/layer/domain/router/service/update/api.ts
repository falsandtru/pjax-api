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
import { saveTitle, savePosition } from '../../../store/path';
import { DomainError } from '../../../data/error';

type Seq = void;

export function update(
  {
    event,
    config,
    state
  }: RouterEntity,
  {
    response
  }: FetchValue,
  seq: Seq,
  io: {
    document: Document;
    scroll: (x?: number, y?: number) => void;
    position: () => { top: number; left: number; };
  }
): Promise<Either<Error, HTMLScriptElement[]>> {
  const {cancelable} = state;
  const {documents} = new UpdateValue({
    src: response.document,
    dst: io.document
  });
  return new HNil()
    .push(Promise.resolve(cancelable.either(seq)))
    // fetch -> unload
    .modify(p => p.then(m => m
      .bind(cancelable.either)
      .fmap<Promise<Either<Error, Seq>>>(seq =>
        separate(documents, config.areas)
          .fmap(([area]) =>
            void config.rewrite(documents.src, area, ''))
          .extract(
            () =>
              Promise.resolve(Left(new DomainError(`Failed to separate areas.`))),
            () => (
              void window.dispatchEvent(new Event('pjax:unload')),
              config.sequence.unload(seq, { ...response })
                .then(
                cancelable.either,
                e => Left<Error>(e instanceof Error ? e : new Error(e))))))
      .extract()))
    // unload -> ready
    .modify(p => p.then(m => m
      .bind(cancelable.either)
      .fmap(seq =>
        new HNil()
          .push((
            void blur(documents.dst),
            void url(
              new RouterEntity.Event.Location(response.url || event.location.dest.href),
              documents.src.title,
              event.type,
              event.source,
              config.replace),
            void title(documents),
            void saveTitle(),
            void head(
              {
                src: documents.src.head,
                dst: documents.dst.head
              },
              config.update.head,
              config.update.ignore),
            content(documents, config.areas)
              .extract<Promise<Either<Error, [{ src: Document; dst: Document; }, Event[]]>>>(
                () => Promise.resolve(Left(new DomainError(`Failed to update areas.`))),
                p => p
                  .then(
                    cancelable.either,
                    e => Left<Error>(e instanceof Error ? e : new Error(e))))))
          .extend(() => (
            config.update.css
              ? void css(
                  {
                    src: documents.src.head,
                    dst: documents.dst.head
                  },
                  config.update.ignore)
              : void 0,
            config.update.css
              ? void css(
                  {
                    src: <HTMLBodyElement>documents.src.body,
                    dst: <HTMLBodyElement>documents.dst.body
                  },
                  config.update.ignore)
              : void 0,
            void focus(documents.dst),
            void scroll(event.type, documents.dst,
              {
                hash: event.location.dest.fragment,
                top: 0,
                left: 0
              },
              {
                hash: hash,
                scroll: io.scroll,
                position: io.position
              }),
            void savePosition(),
            config.update.script
              ? script(documents, state.scripts, config.update, cancelable)
              : Promise.resolve<Either<Error, HTMLScriptElement[]>>(cancelable.either([]))))
          .extend(() => (
            void io.document.dispatchEvent(new Event('pjax:ready')),
            config.sequence.ready(seq)
              .then(cancelable.either, Left)))
          .reverse()
          .tuple())))
    // ready -> load
    .modify(p => p.then(m => m
      .bind(cancelable.either)
      .fmap(ps =>
        ps[0].then(m1 => ps[1].then(m2 => ps[2].then(m3 =>
          cancelable.either(void 0)
            .bind(() => m1.bind(() => m2).bind(() => m3))
            .fmap(seq => (
              void window.dispatchEvent(new Event('pjax:load')),
              void config.sequence.load(seq)))
            .bind(() => m2)))))
      .extract()))
    .head();
}
