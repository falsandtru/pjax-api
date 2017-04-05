import { Config as Option } from 'pjax-api';
import { Cancelable, Supervisor, Just, Nothing, extend } from 'spica';
import { Config } from '../../application/api';
import { Url } from '../../../lib/url';
import { RouterEvent } from '../../domain/event/router';
import { canonicalizeUrl, CanonicalUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { init } from '../service/state/initialization';
import { documentUrl } from '../service/state/url';
import '../service/state/scroll-restoration';
import { route } from '../service/router';
import { loadTitle, savePosition } from '../../application/api';
import { once } from '../../../lib/dom';
import { parse } from '../../../lib/html';

export class GUI {
  private static readonly router = new class extends Supervisor<'', Error, void, void> { }();
  private static readonly view = new class extends Supervisor<'', void, void, Cancelable<void>>{ }();
  public static assign(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        init
          .then(([scripts]) =>
            route(new Config(option), event, { router: GUI.router, scripts, cancelable: new Cancelable<Error>() }, io)))
      .then(failure, success)
      .catch(() => void window.location.assign(url));
  }
  public static replace(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        init
          .then(([scripts]) =>
            route(new Config(extend<Option>({}, option, { replace: '*' })), event, { router: GUI.router, scripts, cancelable: new Cancelable<Error>() }, io)))
      .then(failure, success)
      .catch(() => void window.location.replace(url));
  }
  constructor(
    private readonly option: Option,
    private readonly io = {
      document: window.document
    }
  ) {
    void GUI.view.terminate('');
    void GUI.view.register('', {
      init: s => s,
      call: (_, {listeners}) =>
        new Promise<never>(() =>
          void listeners
            .add(new ClickView(this.io.document, this.config.link, event =>
              void Just(new Url(canonicalizeUrl(validateUrl((<RouterEvent.Source.Anchor>event._currentTarget).href))))
                .bind(url =>
                    isAccessible(url)
                    && !isHashChange(url)
                    && !hasModifierKey(event)
                    && this.config.filter(<RouterEvent.Source.Anchor>event._currentTarget)
                    ? Just(0)
                    : Nothing)
                .fmap(() => (
                  void event.preventDefault(),
                  init
                    .then(([scripts]) =>
                      route(
                        this.config,
                        event,
                        {
                          router: GUI.router,
                          scripts,
                          cancelable: new Cancelable<Error>()
                        },
                        this.io))))
                .extract(failure, success)
                .catch(() => void window.location.assign((<RouterEvent.Source.Anchor>event._currentTarget).href)))
              .close)
            .add(new SubmitView(this.io.document, this.config.form, event =>
              void Just(new Url(canonicalizeUrl(validateUrl((<RouterEvent.Source.Form>event._currentTarget).action))))
                .bind(url =>
                  isAccessible(url)
                  && !hasModifierKey(event)
                    ? Just(0)
                    : Nothing)
                .fmap(() => (
                  void event.preventDefault(),
                  init
                    .then(([scripts]) =>
                      route(
                        this.config,
                        event,
                        {
                          router: GUI.router,
                          scripts,
                          cancelable: new Cancelable<Error>()
                        },
                        this.io))))
                .extract(failure, success)
                .catch(() => void window.location.assign((<RouterEvent.Source.Form>event._currentTarget).action)))
              .close)
            .add(new NavigationView(window, event =>
              void Just(new Url(canonicalizeUrl(validateUrl(window.location.href))))
                .bind(url =>
                  isAccessible(url)
                  && !isHashChange(url)
                    ? Just(loadTitle())
                    : Nothing)
                .fmap(title => (
                  title
                    ? io.document.title = title
                    : void 0,
                  init
                    .then(([scripts]) =>
                      route(
                        this.config,
                        event,
                        {
                          router: GUI.router,
                          scripts,
                          cancelable: new Cancelable<Error>()
                        },
                        this.io))))
                .extract(failure, success)
                .catch(() => void window.location.reload(true)))
              .close)
            .add(new ScrollView(window, () =>
              void Just(new Url(canonicalizeUrl(validateUrl(window.location.href))))
                .fmap(url =>
                  documentUrl.href === url.href
                    ? void savePosition()
                    : void 0)
                .extract())
              .close)),
      exit: (_, s) =>
        void s.cancel()
    }, new Cancelable<void>());
    void GUI.view.cast('', void 0);
  }
  private readonly config: Config = new Config(this.option);
  public assign(url: string): undefined {
    return void GUI.assign(url, this.option, this.io);
  }
  public replace(url: string): undefined {
    return void GUI.replace(url, this.option, this.io);
  }
}

function success<T extends Promise<any>>(p: T): T {
  window.history.scrollRestoration = 'manual';
  void p.then(() =>
    window.history.scrollRestoration = 'auto');
  return p;
}
function failure(): Promise<void> {
  void documentUrl.sync();
  window.history.scrollRestoration = 'auto';
  return Promise.resolve();
}

function hasModifierKey(event: MouseEvent): boolean {
  return event.which > 1
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey;
}

function isAccessible(
  dest: Url<CanonicalUrl>,
  orig: Url<CanonicalUrl> = new Url(documentUrl.href)
): boolean {
  return orig.domain === dest.domain;
}

function isHashChange(
  dest: Url<CanonicalUrl>,
  orig: Url<CanonicalUrl> = new Url(documentUrl.href)
): boolean {
  return orig.domain === dest.domain
      && orig.path === dest.path
      && orig.hash !== dest.hash;
}

function click(url: string): Promise<Event> {
  const el: RouterEvent.Source.Anchor = document.createElement('a');
  el.href = url;
  return new Promise<Event>(resolve => (
    void once(el, 'click', event => (
      void event.preventDefault(),
      void resolve(event))),
    void parse('').extract().body.appendChild(el),
    void el.click(),
    void el.remove()));
}
