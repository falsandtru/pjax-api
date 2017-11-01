import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { bind, currentTargets } from 'typed-dom';
import { route as router, Config, scope, RouterEvent, RouterEventType, RouterEventSource } from '../../application/router';
import { docurl } from './state/url';
import { env } from '../service/state/env';
import { progressbar } from './progressbar';
import { InterfaceError } from '../data/error';
import { URL } from '../../../lib/url';
import { StandardUrl, standardizeUrl } from '../../data/model/domain/url';
import { loadTitle, savePosition } from '../../application/store';
import { Just } from 'spica/maybe';

void bind(window, 'pjax:unload', () =>
  window.history.scrollRestoration = 'auto', true);

export { Config, RouterEvent, RouterEventSource }

export function route(
  config: Config,
  event: RouterEvent,
  process: Supervisor<'', Error>,
  io: {
    document: Document;
  }
): void {
  assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => event.source instanceof Class));
  switch (event.type) {
    case RouterEventType.click:
    case RouterEventType.submit:
      void savePosition();
      break;
    case RouterEventType.popstate:
      io.document.title = loadTitle();
      break;
  }
  return void Just(0)
    .guard(validate(new URL(event.request.url), config, event))
    .bind(() =>
      scope(config, (({ orig, dest }) => ({ orig: orig.pathname, dest: dest.pathname }))(event.location)))
    .fmap(async config => {
      void event.original.preventDefault();
      void process.cast('', new InterfaceError(`Aborted.`));
      const cancellation = new Cancellation<Error>();
      const kill = process.register('', e => {
        void kill();
        void cancellation.cancel(e);
        return new Promise<never>(() => undefined);
      }, undefined);
      const [scripts] = await env;
      window.history.scrollRestoration = 'manual';
      void progressbar(config.progressbar);
      return router(config, event, { process: cancellation, scripts }, io)
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
        .catch(reason => (
          void kill(),
          void docurl.sync(),
          window.history.scrollRestoration = 'auto',
          !cancellation.canceled || reason instanceof Error && reason.name === 'FatalError'
            ? void config.fallback(currentTargets.get(event.original) as RouterEventSource, reason)
            : undefined));
    })
    .extract(async () => {
      void docurl.sync();
      switch (event.type) {
        case RouterEventType.click:
        case RouterEventType.submit:
          return;
        case RouterEventType.popstate:
          return void config.fallback(event.source, new Error(`Disabled.`));
      }
    });
}

function validate(url: URL<StandardUrl>, config: Config, event: RouterEvent): boolean {
  switch (event.type) {
    case RouterEventType.click:
      assert(event.original instanceof MouseEvent);
      return isAccessible(url)
          && !isHashClick(url)
          && !isHashChange(url)
          && !isDownload(event.source as RouterEventSource.Anchor)
          && !hasModifierKey(event.original as MouseEvent)
          && config.filter(event.source as RouterEventSource.Anchor);
    case RouterEventType.submit:
      return isAccessible(url);
    case RouterEventType.popstate:
      return isAccessible(url)
          && !isHashChange(url);
    default:
      return false;
  }

  function isAccessible(dest: URL<StandardUrl>): boolean {
    const orig: URL<StandardUrl> = new URL(docurl.href);
    return orig.origin === dest.origin;
  }

  function isHashClick(dest: URL<StandardUrl>): boolean {
    const orig: URL<StandardUrl> = new URL(docurl.href);
    return orig.origin === dest.origin
        && orig.path === dest.path
        && dest.fragment !== '';
  }

  function isHashChange(dest: URL<StandardUrl>): boolean {
    const orig: URL<StandardUrl> = new URL(docurl.href);
    return orig.origin === dest.origin
        && orig.path === dest.path
        && orig.fragment !== dest.fragment;
  }

  function isDownload(el: HTMLAnchorElement): boolean {
    return el.hasAttribute('download');
  }

  function hasModifierKey(event: MouseEvent): boolean {
    return event.which > 1
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey;
  }
}
export { validate as _validate }
