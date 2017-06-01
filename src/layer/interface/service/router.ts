import { Cancellation, Supervisor, Just, Nothing } from 'spica';
import { route as route_, Config } from '../../application/api';
import { documentUrl } from './state/url';
import { env } from '../service/state/env';
import { RouterEventSource } from '../../domain/event/router';
import { progressbar } from './progressbar';
import { bind } from '../../../lib/dom';
import { canonicalizeUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
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
  assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => event._currentTarget instanceof Class));
  void event.preventDefault();
  const cancellation = new Cancellation<Error>();
  void process.cast('', new InterfaceError(`Abort.`));
  void process.register('', e => {
    throw void cancellation.cancel(e);
  }, void 0);
  const [scripts] = await env;
  window.history.scrollRestoration = 'manual';
  void progressbar(config.progressbar);
  return route_(config, event, { scripts, cancellation }, io)
    .then(m => m
      .bind(cancellation.either)
      .fmap(ss => (
        void ss
          .forEach(s =>
            void scripts.add(canonicalizeUrl(validateUrl(s.src)))),
        void process.terminate(''),
        void documentUrl.sync()))
      .extract())
    .catch(e =>
      void cancellation.maybe(e instanceof Error ? e : new Error(e))
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
            void config.fallback(<RouterEventSource>event._currentTarget, e))));
}
