import { Either, Left } from 'spica/either';
import { HNil } from 'spica/hlist';
import { tuple } from 'spica/tuple';
import { RouterEntity } from '../model/eav/entity';
import { RouterEventLocation } from '../../event/router';
import { FetchResult } from '../model/eav/value/fetch';
import { UpdateSource } from '../model/eav/value/update';
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
  {
    response,
  }: FetchResult,
  seq: 'fetch',
  io: {
    document: Document;
    position: () => { top: number; left: number; };
  }
): Promise<Either<Error, [HTMLScriptElement[], Promise<HTMLScriptElement[]>]>> {
  const { process } = state;
  const { documents } = new UpdateSource({
    src: response.document,
    dst: io.document,
  });
  return new HNil()
    .push(process.either(seq))
    // fetch -> unload
    .modify(m => m
      .fmap(seqA =>
        separate(documents, config.areas)
          .bind(([area]) => (
            void config.rewrite(documents.src, area),
            separate(documents, config.areas)))
          .extract(
            async () =>
              Left(new DomainError(`Failed to separate areas.`)),
            async ([, areas]) => (
              void window.dispatchEvent(new Event('pjax:unload')),
              process.either(tuple([await config.sequence.unload(seqA, response), areas]))))))
    // unload -> ready
    .modify(m => m.fmap(async p => (await p)
      .bind(process.either)
      .fmap(([seqB, areas]) =>
        new HNil()
          .extend(async () => (
            void blur(documents.dst),
            void url(
              new RouterEventLocation(response.url || event.location.dest.href),
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
          .extend(async p => (await p).fmap(async ([areas]) => {
            config.update.css
              ? void css(
                {
                  src: documents.src.head,
                  dst: documents.dst.head,
                },
                config.update.ignore)
              : undefined;
            config.update.css
              ? void css(
                {
                  src: documents.src.body as HTMLBodyElement,
                  dst: documents.dst.body as HTMLBodyElement,
                },
                config.update.ignore)
              : undefined;
            void io.document.dispatchEvent(new Event('pjax:content'));
            const seqC = await config.sequence.content(seqB, areas);
            void focus(documents.dst);
            void scroll(event.type, documents.dst, {
              hash: event.location.dest.fragment,
              position: io.position,
            });
            void savePosition();
            return tuple([
              config.update.script
                ? await script(documents, state.scripts, config.update, Math.max(config.fetch.timeout * 10, 10 * 1e3), process)
                : await process.either(tuple([[], Promise.resolve([])])),
              void io.document.dispatchEvent(new Event('pjax:ready')) ||
              await config.sequence.ready(seqC),
            ]);
          })
            .fmap(p =>
              p.then(([m, seqD]) =>
                m.fmap(ss =>
                  tuple([ss, seqD]))))
            .extract(async e => Left(e)))
          .reverse()
          .tuple())))
    // ready -> load
    .modify(m => m.fmap(async p => (await p)
      .bind(process.either)
      .fmap(([p1, p2]) =>
        p2.then(m2 => (
          void p1.then(m1 => m1
            .bind(([, cp]) => m2
              .bind(process.either)
              .fmap(async ([[, sp], seqD]) => {
                await sp;
                const events = await cp;
                if (process.canceled) return;
                void window.dispatchEvent(new Event('pjax:load'));
                void config.sequence.load(seqD, events);
              }))
            .extract(() => undefined)),
          m2.fmap(([[ss, p]]) => tuple([ss, p])))))
      .extract<Left<Error>>(Left)))
    .head
    .extract<Left<Error>>(Left);
}
