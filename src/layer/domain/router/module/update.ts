import { RouterEntity } from '../model/eav/entity';
import { RouterEventType, RouterEventLocation } from '../../event/router';
import { Response } from '../model/eav/value/fetch';
import { blur } from '../module/update/blur';
import { url } from '../module/update/url';
import { title } from '../module/update/title';
import { head } from '../module/update/head';
import { content, separate } from '../module/update/content';
import { css } from '../module/update/css';
import { script } from '../module/update/script';
import { focus } from '../module/update/focus';
import { scroll } from '../module/update/scroll';
import { saveTitle, savePosition, savePjax } from '../../store/path';
import { AtomicPromise } from 'spica/promise';
import { Either, Left } from 'spica/either';
import { HList } from 'spica/hlist';

export function update(
  {
    event,
    config,
    state,
  }: RouterEntity,
  response: Response,
  seq: 'seq:fetch',
  io: {
    document: Document;
    position: () => { top: number; left: number; };
  }
): AtomicPromise<Either<Error, readonly [HTMLScriptElement[], Promise<HTMLScriptElement[]>]>> {
  const { process } = state;
  const documents = {
    src: response.document,
    dst: io.document,
  };
  return AtomicPromise.resolve(seq)
    .then(process.either)
    .then(m => m
      .bind(() =>
        separate(documents, config.areas)
          .extract(
            () => Left(new Error(`Failed to separate the areas`)),
            () => m)))
    .then(m => m
      .bind(seqA =>
        separate(documents, config.areas)
          .fmap(([area]) =>
            [seqA, area] as const)
          .extract(
            () => Left(new Error(`Failed to separate the areas`)),
            process.either))
      .fmap(([seqB, area]) => {
        const memory = event.type === RouterEventType.Popstate
          ? config.memory?.get(event.location.dest.path)
          : undefined;
        config.update.rewrite(
          event.location.dest.path,
          documents.src,
          area,
          memory && separate({ src: memory, dst: documents.dst }, [area]).extract(() => false)
            ? memory
            : undefined);
        return seqB;
      })
      .bind(seqB =>
        separate(documents, config.areas)
          .fmap(([, areas]) =>
            [seqB, areas] as const)
          .extract(
            () => Left(new Error(`Failed to separate the areas`)),
            process.either)))
    // fetch -> unload
    .then(m => m
      .bind(() =>
        separate(documents, config.areas)
          .extract(
            () => Left(new Error(`Failed to separate the areas`)),
            () => m))
      .fmap(async ([seqA, areas]) => {
        const seqB = await config.sequence.unload(seqA, { ...response, url: response.url.href });
        window.dispatchEvent(new Event('pjax:unload'));
        return [seqB, areas] as const;
      }))
    .then(m => Either.sequence(m))
    .then(process.promise)
    // unload -> ready
    .then(m => m
      .fmap(([seqB, areas]) =>
        HList()
          .add((
            blur(documents.dst),
            savePjax(),
            url(
              new RouterEventLocation(event.location.orig, response.url),
              documents.src.title,
              event.type,
              event.source,
              config.replace),
            savePjax(),
            title(documents),
            saveTitle(),
            head(documents, config.update.head, config.update.ignore),
            process.either(content(documents, areas))
              .fmap(([as, ps]) =>
                [as, AtomicPromise.all(ps)] as const)))
          .unfold(async p => (await p)
            .fmap(async ([areas]) => {
              config.update.css && css(documents, config.update.ignore);
              const seqC = await config.sequence.content(seqB, areas);
              io.document.dispatchEvent(new Event('pjax:content'));
              const [p] = config.update.script
                ? await script(documents, state.scripts, config.update, config.fetch.timeout * 10, process)
                : [AtomicPromise.resolve(process.either<[HTMLScriptElement[], AtomicPromise<Either<Error, HTMLScriptElement[]>>]>([[], AtomicPromise.resolve(process.either([]))]))] as const;
              focus(event.type, documents.dst);
              scroll(event.type, documents.dst, {
                hash: event.location.dest.fragment,
                position: io.position,
              });
              savePosition();
              return p.then(async ssm => [
                ssm.fmap(([ss, ap]) =>
                  [ss, ap.then(m => m.extract())] as const),
                await config.sequence.ready(seqC),
                io.document.dispatchEvent(new Event('pjax:ready')),
              ] as const);
            })
            .fmap(p =>
              p.then(([m, seqD]) =>
                m.fmap(sst =>
                  [sst, seqD] as const)))
            .extract(err => AtomicPromise.resolve(Left(err))))
          .reverse()))
    .then(process.promise)
    // ready -> load
    .then(m => m
      .fmap(([p1, p2]) => {
        // Asynchronously wait for load completion of elements and scripts.
        void AtomicPromise.all([p1, p2])
          .then<void>(([m1, m2]) =>
            m1.bind(([, cp]) =>
              m2.fmap(([[, sp], seqD]) =>
                AtomicPromise.all([cp, sp])
                  .then(process.either)
                  .then(m => m
                    .fmap(async ([events]) => (
                      await config.sequence.load(seqD, events),
                      void window.dispatchEvent(new Event('pjax:load'))))
                    .extract(() => undefined))))
              .extract(() => undefined));
        return p2;
      }))
    .then(m => Either.sequence(m).then(m => m.join()))
    .then(m => m.fmap(([sst]) => sst));
}
