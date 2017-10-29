import { route as router, RouterEntity, RouterEntityState, RouterResult } from '../domain/router/api';
import { RouterEvent } from '../domain/event/router';
import { Config } from '../domain/data/config';
import { Cancellee } from 'spica/cancellation';
import { URL } from '../../lib/url';
import { StandardUrl } from '../data/model/domain/url';

export { RouterEvent, RouterEventType, RouterEventSource } from '../domain/event/router';
export { Config, scope } from '../domain/data/config';

export function route(
  config: Config,
  event: RouterEvent,
  state: {
    process: Cancellee<Error>;
    scripts: ReadonlySet<URL.Absolute<StandardUrl>>;
  },
  io: {
    document: Document;
  }
): Promise<RouterResult> {
  return router(new RouterEntity(config, event, new RouterEntityState(state.process, state.scripts)), io);
}
