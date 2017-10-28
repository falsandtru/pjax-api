import { Cancellee } from 'spica/cancellation';
import { Just } from 'spica/maybe';
import { Left } from 'spica/either';
import { Config, scope } from '../domain/data/config';
import { StandardUrl } from '../data/model/domain/url';
import { URL } from '../../lib/url';
import { route as route_, RouterEntity, RouterEntityState, RouterResult } from '../domain/router/api';
import { RouterEvent } from '../domain/event/router';
import { ApplicationError } from './data/error';

export * from './store/path';
export { Config } from '../domain/data/config';

export async function route(
  config: Config,
  event: Event,
  state: {
    process: Cancellee<Error>;
    scripts: ReadonlySet<URL.Absolute<StandardUrl>>;
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
        new RouterEntityState(state.process, state.scripts)))
    .fmap(entity =>
      route_(entity, io))
    .extract(() =>
      Left(new ApplicationError(`Disabled by config.`)));
}
