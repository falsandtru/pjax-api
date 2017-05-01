import { Either, Left, Right } from 'spica';
import { RouterEntity } from './model/eav/entity';
import { fetch } from './module/fetch';
import { update } from './module/update';
import { match } from './module/update/content';
import { loadPosition } from '../store/path';
import { DomainError } from '../data/error';

export { RouterEntity, RouterEntityState } from './model/eav/entity';
export type RouterResult = Either<Error, HTMLScriptElement[]>;

export async function route(
  entity: RouterEntity,
  io: {
    document: Document;
  }
): Promise<RouterResult> {
  return Right<Error, void>(void 0)
    .bind(entity.state.cancelable.either)
    .bind(() =>
      match(io.document, entity.config.areas)
        ? Right(void 0)
        : Left(new DomainError(`Failed to match areas.`)))
    .fmap(() =>
      fetch(entity.event.request, entity.config, entity.state.cancelable))
    .fmap(async p => (await p)
      .fmap(([res, seq]) =>
        update(entity, res, seq, {
          document: io.document,
          scroll: window.scrollTo,
          position: loadPosition
        }))
      .extract<Left<Error>>(Left))
    .extract<Left<Error>>(Left);
}
