import { Either, Left } from 'spica';
import { RouterEntity } from '../model/eav/entity';
import { FetchValue } from '../model/eav/value/fetch';
import { fetch } from './fetch/api';
import { update } from './update/api';
import { match } from '../module/update/content';
import { loadPosition } from '../../store/path';
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
  return entity.state.cancelable.promise(void 0)
    .then<Either<Error, void>>(() =>
      match(window.document, entity.config.areas).take(1).read().length > 0
        ? entity.state.cancelable.either(void 0)
        : Left(new DomainError(`Routing is failed.`)))
    .then<Either<Error, [FetchValue, void]>>(m => m
      .bind(entity.state.cancelable.either)
      .fmap(() =>
        fetch(entity.event.request, entity.config.fetch, entity.config.sequence, entity.state.cancelable))
      .extract(Left))
    .then(m => m
      .bind(entity.state.cancelable.either)
      .fmap(([res, seq]) =>
        update(entity, res, seq, {
          document: io.document,
          scroll: window.scrollTo,
          position: loadPosition
        }))
      .extract<RouterResult>(e =>
        Promise.resolve(Left(e))));
}
