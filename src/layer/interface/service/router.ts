import { route as router, Config, scope, RouterEvent, RouterEventType, RouterEventSource } from '../../application/router';
import { page } from './state/page';
import { env } from '../service/state/env';
//import { progressbar } from './progressbar';
import { FatalError } from '../../../lib/error';
import { loadTitle, savePosition } from '../../application/store';
import { URL, StandardURL, standardize } from 'spica/url';
import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { Just } from 'spica/maybe';
import { never } from 'spica/promise';
import { bind } from 'typed-dom/listener';

bind(window, 'pjax:unload', () =>
  window.history.scrollRestoration = 'auto', true);

export { Config, RouterEvent, RouterEventSource }

export function route(
  config: Config,
  event: RouterEvent,
  process: Supervisor<'', Error>,
  io: {
    document: Document;
  }
): boolean {
  assert([HTMLAnchorElement, HTMLAreaElement, HTMLFormElement, Window].some(Class => event.source instanceof Class));
  switch (event.type) {
    case RouterEventType.Click:
    case RouterEventType.Submit:
      savePosition();
      break;
    case RouterEventType.Popstate:
      io.document.title = loadTitle();
      // 小さな画面ではチラつく
      //const { scrollX, scrollY } = window;
      //requestAnimationFrame(() => void window.scrollTo(scrollX, scrollY));
      break;
  }
  return Just(0)
    .guard(validate(event.request.url, config, event))
    .bind(() =>
      scope(config, (({ orig, dest }) => ({ orig: orig.pathname, dest: dest.pathname }))(event.location)))
    .fmap(async config => {
      event.original.preventDefault();
      process.cast('', new Error(`Canceled.`));
      const cancellation = new Cancellation<Error>();
      const kill = process.register('', err => {
        kill();
        cancellation.cancel(err);
        return never;
      });
      page.isAvailable() && config.memory?.set(event.location.orig.path, io.document.cloneNode(true));
      page.process(event.location.dest);
      const [scripts] = await env;
      window.history.scrollRestoration = 'manual';
      //progressbar(config.progressbar);
      return router(config, event, { process: cancellation, scripts }, io)
        .then(m => m
          .fmap(async ([ss, p]) => {
            kill();
            page.complete();
            for (const el of ss.filter(s => s.hasAttribute('src'))) {
              scripts.add(new URL(standardize(el.src)).href);
            }
            for (const el of (await p).filter(s => s.hasAttribute('src'))) {
              scripts.add(new URL(standardize(el.src)).href);
            }
          })
          .extract())
        .catch(reason => {
          kill();
          page.complete();
          window.history.scrollRestoration = 'auto';
          if (cancellation.isAlive() || reason instanceof FatalError) {
            config.fallback(event.source, reason);
          }
        });
    })
    .extract(
      () => {
        assert(!event.original.defaultPrevented);
        switch (event.type) {
          case RouterEventType.Click:
            (event.source as RouterEventSource.Link).matches('[href]') && process.cast('', new Error(`Canceled.`));
            page.sync();
            return false;
          case RouterEventType.Submit:
            process.cast('', new Error(`Canceled.`));
            page.sync();
            return false;
          case RouterEventType.Popstate:
            if (isHashChange(event.location.dest)) {
              process.cast('', new Error(`Canceled.`));
              page.sync();
              return false;
            }
            config.fallback(event.source, new Error(`Disabled.`));
            page.sync();
            return true;
        }
      },
      () => true);
}

function validate(url: URL<StandardURL>, config: Config, event: RouterEvent): boolean {
  if (event.original.defaultPrevented) return false;
  switch (event.type) {
    case RouterEventType.Click:
      assert(event.original instanceof MouseEvent);
      return isAccessible(url)
          && !isHashClick(url)
          && !isHashChange(url)
          && !isDownload(event.source as RouterEventSource.Link)
          && !hasModifierKey(event.original as MouseEvent)
          && config.filter(event.source as RouterEventSource.Link);
    case RouterEventType.Submit:
      return isAccessible(url);
    case RouterEventType.Popstate:
      return isAccessible(url)
          && !isHashChange(url);
    default:
      return false;
  }

  function isAccessible(dest: URL<StandardURL>): boolean {
    const orig: URL<StandardURL> = page.url;
    return orig.origin === dest.origin;
  }

  function isHashClick(dest: URL<StandardURL>): boolean {
    const orig: URL<StandardURL> = page.url;
    return orig.resource === dest.resource
        && dest.fragment !== '';
  }

  function isDownload(el: HTMLAnchorElement | HTMLAreaElement): boolean {
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

function isHashChange(dest: URL<StandardURL>): boolean {
  const orig: URL<StandardURL> = page.url;
  return orig.resource === dest.resource
      && orig.fragment !== dest.fragment;
}
