import { Cancellatee, Just, Left } from 'spica';
import { Config } from '../domain/data/config';
import { CanonicalUrl } from '../data/model/canonicalization/url';
import { scope } from './config/scope';
import { route as route_, RouterEntity, RouterEntityState, RouterResult } from '../domain/router/api';
import { RouterEvent } from '../domain/event/router';
import { ApplicationError } from './data/error';

export * from './store/path';
export { Config };

export async function route(
  config: Config,
  event: Event,
  state: {
    scripts: ReadonlySet<CanonicalUrl>;
    cancellation: Cancellatee<Error>
  },
  io: {
    document: Document;
  }
): Promise<RouterResult> {
  return Just(new RouterEvent(event).location)
    .bind(({ orig, dest }) =>
      scope(config, {
        orig: orig.pathname,
        dest: dest.pathname,
      }))
    .fmap(config =>
      new RouterEntity(
        config,
        new RouterEvent(event),
        new RouterEntityState(state.scripts, state.cancellation)))
    .fmap(entity =>
      route_(entity, io))
    .extract(() =>
      Left(new ApplicationError(`Disabled by config.`)));
}
