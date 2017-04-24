import { Cancelable, Supervisor, Just, Nothing } from 'spica';
import { Config, route as route_ } from '../../application/api';
import { canonicalizeUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import { documentUrl } from './state/url';
import { init } from '../service/state/initialization';
import { RouterEvent } from '../../domain/event/router';
import { progressbar } from './progressbar';
import { bind } from '../../../lib/dom';
import { InterfaceError } from '../data/error';

void bind(window, 'pjax:unload', () =>
  window.history.scrollRestoration = 'auto', true);

export async function route(
  config: Config,
  event: Event,
  process: Supervisor<'', Error, void, void>,
  io: {
    document: Document;
  }
): Promise<void> {
  void event.preventDefault();
  assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => event._currentTarget instanceof Class));
  void process.cast('', new InterfaceError(`Abort.`));
  void process.register('', e => {
    throw void cancelable.cancel(e);
  }, void 0);
  const cancelable = new Cancelable<Error>();
  const [scripts] = await init;
  window.history.scrollRestoration = 'manual';
  void progressbar(config.progressbar);
  return route_(config, event, { scripts, cancelable }, io)
    .then(result =>
      result
        .bind(cancelable.either)
        .fmap(ss => (
          void ss.forEach(s =>
            void scripts.add(canonicalizeUrl(validateUrl(s.src)))),
          void process.terminate(''),
          void documentUrl.sync()))
        .extract())
    .catch(e =>
      void cancelable.maybe(e instanceof Error ? e : new Error(e))
        .bind(e =>
          event.defaultPrevented
            ? Just(e)
            : Nothing)
        .extract(
          () =>
            void process.terminate(''),
          e => (
            void process.terminate('', e),
            window.history.scrollRestoration = 'auto',
            void documentUrl.sync(),
            void config.fallback(<RouterEvent.Source>event._currentTarget, e))))
}
