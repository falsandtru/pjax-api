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
import { loadTitle, savePosition, parse } from '../../application/api';
import { once } from '../../../lib/dom';

export class GUI {
  private static readonly router = new class extends Supervisor<'', Error, void, void> { }();
  private static readonly sv = new class extends Supervisor<'view', void, void, Set<() => void>>{ }();
  public static assign(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        init
          .then(([scripts]) =>
            route(new Config(option), event, { router: GUI.router, scripts, cancelable: new Cancelable<Error>() }, io)));
  }
  public static replace(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        init
          .then(([scripts]) =>
            route(new Config(extend({}, option, { replace: '*' })), event, { router: GUI.router, scripts, cancelable: new Cancelable<Error>() }, io)));
  }
  constructor(
    private readonly option: Option,
    private readonly io = {
      document: window.document
    }
  ) {
    void GUI.sv.terminate('view');
    void GUI.sv.register('view', {
      init: s => s,
      call: (_, s) =>
        new Promise<never>(() =>
          void s
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
                .extract(() => Promise.resolve())
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
                .extract(() => Promise.resolve())
                .catch(() => void window.location.assign((<RouterEvent.Source.Form>event._currentTarget).action)))
              .close)
            .add(new NavigationView(window, event =>
              void Just(new Url(canonicalizeUrl(validateUrl(window.location.href))))
                .bind(url =>
                  isAccessible(url)
                  && !isHashChange(url)
                    ? Just(loadTitle(url.path))
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
                .extract(() => Promise.resolve())
                .catch(() => void window.location.reload(true)))
              .close)
            .add(new ScrollView(window, () =>
              void Just(window)
                .fmap(({pageXOffset: left, pageYOffset: top}) =>
                  documentUrl.href === new Url(canonicalizeUrl(validateUrl(window.location.href))).href
                    ? void savePosition(new Url(documentUrl.href).path, { top, left })
                    : void 0)
                .extract())
              .close)),
      exit: (_, s) =>
        void Array.from(s)
          .forEach(terminate =>
            void terminate()),
    }, new Set());
    void GUI.sv.cast('view', void 0);
  }
  private readonly config: Config = new Config(this.option);
  public assign(url: string): undefined {
    return void GUI.assign(url, this.option, this.io);
  }
  public replace(url: string): undefined {
    return void GUI.replace(url, this.option, this.io);
  }
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

export function click(url: string): Promise<Event> {
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
