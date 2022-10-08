import { RouterEntity } from './model/eav/entity';
import { fetch } from './module/fetch';
import { update } from './module/update';
import { separate } from './module/update/content';
import { loadPosition } from '../store/path';
import { Either, Left, Right } from 'spica/either';

export { RouterEntity, RouterEntityState } from './model/eav/entity';
export type RouterResult = Either<Error, readonly [HTMLScriptElement[], Promise<HTMLScriptElement[]>]>;

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
        : Left(new Error(`Failed to match areas.`)))
    .fmap(() =>
      fetch(entity.event, entity.config, entity.state.process, io))
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
