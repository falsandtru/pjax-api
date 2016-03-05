import { Either, Left, Just, Nothing } from 'spica';
import { RouterEntity } from '../model/eav/entity';
import { fetch } from './fetch/api';
import { update } from './update/api';
import { match } from '../module/update/content';
import { saveTitle, loadPosition } from '../../store/path';
import { DomainError } from '../../data/error';

export { RouterEntity }
export type RouterResult = Promise<RouterResultData>;
export type RouterResultData = Either<Error, HTMLScriptElement[]>;

export function route(
  entity: RouterEntity,
  io: {
    document: Document;
  }
): RouterResult {
  return Just(0)
    .bind(() =>
      match(window.document, entity.config.areas).take(1).read().length > 0
        ? Just(0)
        : Nothing)
    .fmap<RouterResult>(() => (
      void saveTitle(entity.event.location.orig.path, io.document.title),
      fetch(entity.event.request, entity.config.fetch, entity.state.cancelable)
        .then(m =>
          m
            .fmap(res =>
              update(
                entity,
                res,
                {
                  document: io.document,
                  scroll: window.scrollTo,
                  position: loadPosition
                })))
        .then(m =>
          m
            .fmap(hl =>
              hl.head()
                .extract(() =>
                  Promise.resolve<RouterResultData>(Left(new DomainError(`Routing is failed.`))))))
        .then(m =>
          m
            .fmap(p => (
              void saveTitle(entity.event.location.dest.path, io.document.title),
              p))
            .extract(err =>
              Promise.resolve<RouterResultData>(Left(err))))))
    .extract<RouterResult>(() =>
      Promise.resolve<RouterResultData>(Left(new DomainError(`Routing is failed.`))));
}
