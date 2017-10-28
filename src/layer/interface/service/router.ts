import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { bind, currentTargets } from 'typed-dom';
import { route as route_, Config, scope, RouterEvent, RouterEventType, RouterEventSource } from '../../application/router';
import { docurl } from './state/url';
import { env } from '../service/state/env';
import { progressbar } from './progressbar';
import { InterfaceError } from '../data/error';
import { StandardUrl, standardizeUrl } from '../../data/model/domain/url';
import { URL } from '../../../lib/url';

void bind(window, 'pjax:unload', () =>
  window.history.scrollRestoration = 'auto', true);

export async function route(
  config: Config,
  event: RouterEvent,
  process: Supervisor<'', Error, void, void>,
  io: {
    document: Document;
  }
): Promise<void> {
  assert([HTMLAnchorElement, HTMLFormElement, Window].some(Class => event.source instanceof Class));
  if (!validate(new URL(event.request.url), config, event)) return void docurl.sync();
  void new Promise(() =>
    config = scope(config, (({ orig: { pathname: orig }, dest: { pathname: dest } }) => ({ orig: orig, dest: dest }))(event.location)).extract());
  void event.original.preventDefault();
  void process.cast('', new InterfaceError(`Abort.`));
  const cancellation = new Cancellation<Error>();
  const kill = process.register('', e => {
    void kill();
    void cancellation.cancel(e);
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
      void docurl.sync(),
      window.history.scrollRestoration = 'auto',
      !cancellation.canceled || e instanceof Error && e.name === 'FatalError'
        ? void config.fallback(currentTargets.get(event.original) as RouterEventSource, e instanceof Error ? e : new Error(e))
        : undefined));
}

function validate(url: URL<StandardUrl>, config: Config, event: RouterEvent): boolean {
  switch (event.type) {
    case RouterEventType.click:
      assert(event.original instanceof MouseEvent);
      return isAccessible(url, config)
          && !isHashClick(url)
          && !isHashChange(url)
          && !isDownload(event.source as RouterEventSource.Anchor)
          && config.filter(event.source as RouterEventSource.Anchor)
          && !hasModifierKey(event.original as MouseEvent);
    case RouterEventType.submit:
      return isAccessible(url, config);
    case RouterEventType.popstate:
      return isAccessible(url, config)
          && !isHashChange(url);
    default:
      return false;
  }

  function isAccessible(dest: URL<StandardUrl>, config: Config): boolean {
    const orig: URL<StandardUrl> = new URL(docurl.href);
    return orig.origin === dest.origin
        && scope(config, { orig: orig.pathname, dest: dest.pathname })
            .extract(
              () => false,
              () => true);
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
