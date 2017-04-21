import { Cancelable, Supervisor } from 'spica';
import { Config, route as route_ } from '../../application/api';
import { canonicalizeUrl, CanonicalUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import { documentUrl } from './state/url';
import { RouterEvent } from '../../domain/event/router';
import { progressbar } from './progressbar';
import { InterfaceError } from '../data/error';

export function route(
  config: Config,
  event: Event,
  state: {
    router: Supervisor<'', Error, void, void>;
    scripts: Set<CanonicalUrl>;
    cancelable: Cancelable<Error>;
  },
  io: {
    document: Document;
  }
): Promise<void> {
  void state.router.cast('', new InterfaceError(`Abort.`));
  void state.router.register('', e => {
    throw void state.cancelable.cancel(e);
  }, void 0);
  void progressbar(config.progressbar);
  return route_(config, event, state, io)
    .then(m => (
      void state.router.terminate(''),
      void m
        .bind(state.cancelable.either)
        .fmap(ss => (
          void ss.forEach(s => void state.scripts.add(canonicalizeUrl(validateUrl(s.src)))),
          void documentUrl.sync()))
        .extract()))
    .catch(e =>
      state.cancelable.maybe(e)
        .extract(
          () =>
            void state.router.terminate(''),
          e => (
            void state.router.terminate('', e),
            event.defaultPrevented
              ? void config.fallback(<RouterEvent.Source>event._currentTarget, e)
              : void 0,
            Promise.reject<undefined>(e))));
}
