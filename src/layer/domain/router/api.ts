import { Either, Left, Right } from 'spica/either';
import { RouterEntity } from './model/eav/entity';
import { fetch } from './module/fetch';
import { update } from './module/update';
import { separate } from './module/update/content';
import { loadPosition } from '../store/path';
import { DomainError } from '../data/error';

export { RouterEntity, RouterEntityState } from './model/eav/entity';
export type RouterResult = Either<Error, [HTMLScriptElement[], Promise<HTMLScriptElement[]>]>;

export async function route(
  entity: RouterEntity,
  io: {
    document: Document;
  }
): Promise<RouterResult> {
  return Right<Error, void>(undefined)
    .bind(entity.state.process.either)
    .bind(() =>
      match(io.document, entity.config.areas)
        ? Right(undefined)
        : Left(new DomainError(`Failed to match areas.`)))
    .fmap(() =>
      fetch(entity.event.request, entity.config, entity.state.process))
    .fmap(async p => (await p)
      .fmap(([res, seq]) =>
        update(entity, res, seq, {
          document: io.document,
          position: loadPosition
        }))
      .extract<Left<Error>>(Left))
    .extract<Left<Error>>(Left);

  function match(
    document: Document,
    areas: string[]
  ): boolean {
    return separate({ src: document, dst: document }, areas)
      .extract(
        () => false,
        () => true);
  }
}
