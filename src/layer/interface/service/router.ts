import { Cancelable, Supervisor, Just, Nothing } from 'spica';
import { route as route_, Config } from '../../application/api';
import { documentUrl } from './state/url';
import { env } from '../service/state/env';
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
): Promise<Event[]> {
  void event.preventDefault();
  assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => event._currentTarget instanceof Class));
  const cancelable = new Cancelable<Error>();
  void process.cast('', new InterfaceError(`Abort.`));
  void process.register('', e => {
    throw void cancelable.cancel(e);
  }, void 0);
  const [scripts] = await env;
  window.history.scrollRestoration = 'manual';
  void progressbar(config.progressbar);
  assert(cancelable.canceled === false);
  return route_(config, event, { scripts, cancelable }, io)
    .then(m => m
      .bind(cancelable.either)
      .fmap(events => (
        void process.terminate(''),
        void documentUrl.sync(),
        events))
      .extract())
    .catch(e => (
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
            void config.fallback(<RouterEvent.Source>event._currentTarget, e))),
      Promise.reject(e)));
}
