import { Cancelable, Just, Left } from 'spica';
import { Config } from '../domain/data/config';
import { CanonicalUrl } from '../data/model/canonicalization/url';
import { scope } from './config/scope';
import { route as route_, RouterEntity, RouterResult } from '../domain/router/api';
import { ApplicationError } from './data/error';

export * from './store/path';
export { Config };

export async function route(
  config: Config,
  event: Event,
  state: {
    scripts: Set<CanonicalUrl>;
    cancelable: Cancelable<Error>
  },
  io: {
    document: Document;
  }
): Promise<RouterResult> {
  return Just(new RouterEntity.Event(event).location)
    .bind(({ orig, dest }) =>
      scope(config, {
        orig: orig.pathname,
        dest: dest.pathname,
      }))
    .fmap(config =>
      new RouterEntity(
        config,
        new RouterEntity.Event(event),
        new RouterEntity.State(state.scripts, state.cancelable)))
    .fmap(entity =>
      route_(entity, io))
    .extract(() =>
      Left(new ApplicationError(`Disabled by config.`)));
}
