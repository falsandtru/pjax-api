import { Either, Left, HNil } from 'spica';
import { RouterEntity } from '../../model/eav/entity';
import { FetchResult } from '../../model/eav/value/fetch';
import { UpdateSource } from '../../model/eav/value/update';
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

export async function update(
  {
    event,
    config,
    state
  }: RouterEntity,
  {
    response
  }: FetchResult,
  seq: Seq,
  io: {
    document: Document;
    scroll: (x?: number, y?: number) => void;
    position: () => { top: number; left: number; };
  }
): Promise<Either<Error, HTMLScriptElement[]>> {
  const {cancelable} = state;
  const {documents} = new UpdateSource({
    src: response.document,
    dst: io.document
  });
  return new HNil()
    .push(cancelable.either(seq))
    // fetch -> unload
    .modify(m => m
      .fmap(seq =>
        separate(documents, config.areas)
          .fmap(([area]) =>
            void config.rewrite(documents.src, area, ''))
          .extract<Promise<Either<Error, Seq>>>(
            async () =>
              Left(new DomainError(`Failed to separate areas.`)),
            async () => (
              void window.dispatchEvent(new Event('pjax:unload')),
              cancelable.either(await config.sequence.unload(seq, { ...response }))))))
    // unload -> ready
    .modify(m => m.fmap(async p => (await p)
      .fmap(seq =>
        new HNil()
          .push(void 0)
          .modify(async () => (
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
              .fmap<[HTMLElement[], Promise<Event[]>]>(([as, ps]) => [
                as,
                Promise.all(ps),
              ])
              .fmap(cancelable.either)
              .extract(() =>
                Left(new DomainError(`Failed to update areas.`)))))
          .extend(async p => (await p).fmap(([areas]) => Promise.all(
            new HNil()
              .push(void 0)
              .modify(async () => (
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
                  ? await script(documents, state.scripts, config.update, cancelable)
                  : await cancelable.either<HTMLScriptElement[]>([])))
              .extend(async () => (
                void io.document.dispatchEvent(new Event('pjax:ready')),
                cancelable.either(await config.sequence.ready(seq, areas))))
              .reverse()
              .tuple())
            .then(([m1, m2]) =>
              m1.bind(ss => m2.fmap<[HTMLScriptElement[], Seq]>(seq => [ss, seq]))))
            .extract<Left<Error>>(Left))
          .reverse()
          .tuple())))
    // ready -> load
    .modify(m => m.fmap(async p => (await p)
      .fmap(([p1, p2]) =>
        p2.then(m2 => (
          void p1.then(m1 => m1
            .bind(([, p]) => m2
              .fmap(async ([, seq]) =>
                cancelable.maybe(await p)
                  .fmap(events => (
                    void window.dispatchEvent(new Event('pjax:load')),
                    void config.sequence.load(seq, events)))
                  .extract(() => void 0)))
            .extract(() => void 0)),
          m2.fmap(([ss]) => ss))))
      .extract<Left<Error>>(Left)))
    .head()
    .extract<Left<Error>>(Left);
}
