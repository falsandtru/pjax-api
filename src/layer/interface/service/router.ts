import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { bind, currentTargets } from 'typed-dom';
import { route as route_, Config } from '../../application/api';
import { docurl } from './state/url';
import { env } from '../service/state/env';
import { RouterEventSource } from '../../domain/event/router';
import { progressbar } from './progressbar';
import { InterfaceError } from '../data/error';
import { loadTitle } from '../../application/api';
import { standardizeUrl } from '../../data/model/domain/url';
import { URL } from '../../../lib/url';

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
  const kill = process.register('', e => {
    void kill();
    void cancellation.cancel(e);
    // A part of the workaround to record the correct browser history.
    io.document.title = loadTitle();
    return [undefined, undefined];
  }, undefined);
  const [scripts] = await env;
  window.history.scrollRestoration = 'manual';
  void progressbar(config.progressbar);
  return route_(config, event, { process: cancellation, scripts }, io)
    .then(m => m
      .fmap(async ([ss, p]) => (
        void kill(),
        void docurl.sync(),
        void ss
          .filter(s => s.hasAttribute('src'))
          .forEach(s =>
            void scripts.add(new URL(standardizeUrl(s.src)).href)),
        void (await p)
          .filter(s => s.hasAttribute('src'))
          .forEach(s =>
            void scripts.add(new URL(standardizeUrl(s.src)).href))))
      .extract())
    .catch(e => (
      void kill(),
      window.history.scrollRestoration = 'auto',
      void docurl.sync(),
      !cancellation.canceled || e instanceof Error && e.name === 'FatalError'
        ? void config.fallback(currentTargets.get(event) as RouterEventSource, e instanceof Error ? e : new Error(e))
        : undefined));
}
