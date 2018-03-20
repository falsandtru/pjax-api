import { Either, Left } from 'spica/either';
import { HNil } from 'spica/hlist';
import { tuple } from 'spica/tuple';
import { RouterEntity } from '../model/eav/entity';
import { RouterEventLocation } from '../../event/router';
import { FetchResponse } from '../model/eav/value/fetch';
import { blur } from '../module/update/blur';
import { url } from '../module/update/url';
import { title } from '../module/update/title';
import { head } from '../module/update/head';
import { content, separate } from '../module/update/content';
import { css } from '../module/update/css';
import { script } from '../module/update/script';
import { focus } from '../module/update/focus';
import { scroll } from '../module/update/scroll';
import { saveTitle, savePosition } from '../../store/path';
import { DomainError } from '../../data/error';

export async function update(
  {
    event,
    config,
    state,
  }: RouterEntity,
  response: FetchResponse,
  seq: 'fetch',
  io: {
    document: Document;
    position: () => { top: number; left: number; };
  }
): Promise<Either<Error, [HTMLScriptElement[], Promise<HTMLScriptElement[]>]>> {
  const { process } = state;
  const documents = {
    src: response.document,
    dst: io.document,
  };
  return new HNil()
    .push(process.either(seq))
    // fetch -> unload
    .modify(m => m
      .bind(() =>
        separate(documents, config.areas)
          .extract(
            () => Left(new DomainError(`Failed to separate the areas.`)),
            () => m))
      .fmap(async seqA => (
        void window.dispatchEvent(new Event('pjax:unload')),
        process.either(await config.sequence.unload(seqA, response))))
      .fmap(async p => (await p)
        .bind(seqB =>
          separate(documents, config.areas)
            .fmap(([area]) =>
              [seqB, area])
            .extract(
              () => Left(new DomainError(`Failed to separate the areas.`)),
              process.either)))
      .fmap(async p => (await p)
        .bind(([seqB, area]) => (
          void config.rewrite(documents.src, area),
          separate(documents, config.areas)
            .fmap(([, areas]) =>
              [seqB, areas])
            .extract(
              () => Left(new DomainError(`Failed to separate the areas.`)),
              process.either)))))
    // unload -> ready
    .modify(m => m.fmap(async p => (await p)
      .bind(process.either)
      .fmap(([seqB, areas]) =>
        new HNil()
          .extend(async () => (
            void blur(documents.dst),
            void url(
              new RouterEventLocation(response.url),
              documents.src.title,
              event.type,
              event.source,
              config.replace),
            void title(documents),
            void saveTitle(),
            void head(
              {
                src: documents.src.head,
                dst: documents.dst.head,
              },
              config.update.head,
              config.update.ignore),
            process.either(content(documents, areas))
              .fmap(([as, ps]) =>
                [
                  as,
                  Promise.all(ps),
                ])))
          .extend(async p => (await p).fmap(([areas]) => Promise.all(
            new HNil()
              .extend(async () => (
                config.update.css
                  ? void css(
                      {
                        src: documents.src.head,
                        dst: documents.dst.head,
                      },
                      config.update.ignore)
                  : undefined,
                config.update.css
                  ? void css(
                      {
                        src: documents.src.body as HTMLBodyElement,
                        dst: documents.dst.body as HTMLBodyElement,
                      },
                      config.update.ignore)
                  : undefined,
                config.update.script
                  ? await script(documents, state.scripts, config.update, Math.max(config.fetch.timeout * 10, 10 * 1e3), config.update.fallback, process)
                  : await process.either(tuple([[], Promise.resolve([])]))))
              .extend(async () => {
                void io.document.dispatchEvent(new Event('pjax:content'));
                const seqC = await config.sequence.content(seqB, areas);
                void focus(event.type, documents.dst);
                void scroll(event.type, documents.dst, {
                  hash: event.location.dest.fragment,
                  position: io.position,
                });
                void savePosition();
                void io.document.dispatchEvent(new Event('pjax:ready'));
                return await config.sequence.ready(seqC);
              })
              .reverse()
              .tuple()))
            .fmap(p =>
              p.then(([m, seqD]) =>
                m.fmap(sst =>
                  [sst, seqD])))
            .extract(async e => Left(e)))
          .reverse()
          .tuple())))
    // ready -> load
    .modify(m => m.fmap(async p => (await p)
      .bind(process.either)
      .fmap(async ([p1, p2]) => (
        void process.either(await Promise.all([p1, p2]))
          .bind<void>(([m1, m2]) =>
            m1.bind(([, cp]) =>
              m2.fmap(([[, sp], seqD]) =>
                // Asynchronously wait for load completion of elements and scripts.
                void Promise.all([cp, sp])
                  .then(process.either)
                  .then(m => m
                    .fmap(([events]) => (
                      void window.dispatchEvent(new Event('pjax:load')),
                      void config.sequence.load(seqD, events)))
                    .extract(() => undefined)))))
          .extract(() => undefined),
        p2))
      .fmap(async p => (await p)
        .fmap(([sst]) => sst))
      .extract<Left<Error>>(Left)))
    .head
    .extract<Left<Error>>(Left);
}
