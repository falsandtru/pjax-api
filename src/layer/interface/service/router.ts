import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { bind, currentTargets } from 'typed-dom';
import { route as route_, Config } from '../../application/api';
import { documentUrl } from './state/url';
import { env } from '../service/state/env';
import { RouterEventSource } from '../../domain/event/router';
import { progressbar } from './progressbar';
import { standardizeUrl } from '../../data/model/domain/url';
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
  assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => event.currentTarget instanceof Class));
  void event.preventDefault();
  void process.cast('', new InterfaceError(`Abort.`));
  const cancellation = new Cancellation<Error>();
  const terminate = process.register('', e => {
    throw void cancellation.cancel(e);
  }, void 0);
  const [scripts] = await env;
  window.history.scrollRestoration = 'manual';
  void progressbar(config.progressbar);
  return route_(config, event, { process: cancellation, scripts }, io)
    .then(m => m
      .fmap(ss => (
        void terminate(),
        void ss
          .filter(s => s.hasAttribute('src'))
          .forEach(s =>
            void scripts.add(standardizeUrl(s.src))),
        void documentUrl.sync()))
      .extract())
    .catch(e => (
      void terminate(),
      window.history.scrollRestoration = 'auto',
      void documentUrl.sync(),
      !cancellation.canceled || e instanceof Error && e.name === 'FatalError'
        ? void config.fallback(currentTargets.get(event) as RouterEventSource, e instanceof Error ? e : new Error(e))
        : void 0));
}
