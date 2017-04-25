import { Cancelable, Left } from 'spica';
import { Config } from '../domain/data/config';
import { scope } from './config/scope';
import { RouterEvent } from '../domain/event/router';
import { route as route_, RouterEntity, RouterResult } from '../domain/router/api';
import { CanonicalUrl } from '../data/model/canonicalization/url';
import { ApplicationError } from './data/error';

export {Config}

export async function route(
  config: Config,
  event: Event,
  state: {
    scripts: ReadonlySet<CanonicalUrl>;
    cancelable: Cancelable<Error>
  },
  io: {
    document: Document;
  }
): Promise<RouterResult> {
  const location = new RouterEvent(event).location;
  return scope(
    config,
    {
      orig: location.orig.pathname,
      dest: location.dest.pathname
    })
    .extract(
      () =>
        Promise.resolve<RouterResult>(Left(new ApplicationError(`Disabled to use pjax by config.`))),
      config =>
        route_(
          new RouterEntity(
            config,
            new RouterEvent(event),
            new RouterEntity.State(state.scripts, state.cancelable)),
          io));
}

export * from './store/path';
