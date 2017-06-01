import { Config as Option } from '../../../../';
import { Supervisor, Cancellation, Just, Nothing, extend } from 'spica';
import { Config } from '../../application/api';
import { Url } from '../../../lib/url';
import { RouterEventSource } from '../../domain/event/router';
import { canonicalizeUrl, CanonicalUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { documentUrl } from '../service/state/url';
import '../service/state/scroll-restoration';
import { route } from '../service/router';
import { loadTitle, savePosition } from '../../application/api';
import { once } from '../../../lib/dom';
import { parse } from '../../../lib/html';

export class GUI {
  private static readonly process = new class extends Supervisor<'', Error, void, void> { }();
  private static readonly view = new class extends Supervisor<'', void, void, Cancellation<void>>{ }();
  public static assign(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        route(new Config(option), event, GUI.process, io));
  }
  public static replace(url: string, option: Option, io = { document: window.document }): undefined {
    return void click(url)
      .then(event =>
        route(new Config(extend<Option>({}, option, { replace: '*' })), event, GUI.process, io));
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
      call: (_, s) => (
        void s.register(new ClickView(this.io.document, this.config.link, event =>
          void Just(new Url(canonicalizeUrl(validateUrl((<RouterEventSource.Anchor>event._currentTarget).href))))
            .bind(url =>
              isAccessible(url)
              && !isHashChange(url)
              && !hasModifierKey(event)
              && this.config.filter(<RouterEventSource.Anchor>event._currentTarget)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              route(this.config, event, GUI.process, this.io))
            .extract(sync))
          .close),
        void s.register(new SubmitView(this.io.document, this.config.form, event =>
          void Just(new Url(canonicalizeUrl(validateUrl((<RouterEventSource.Form>event._currentTarget).action))))
            .bind(url =>
              isAccessible(url)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              route(this.config, event, GUI.process, this.io))
            .extract(sync))
          .close),
        void s.register(new NavigationView(window, event =>
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
              route(this.config, event, GUI.process, this.io)))
            .extract(sync))
          .close),
        void s.register(new ScrollView(window, () =>
          void Just(new Url(canonicalizeUrl(validateUrl(window.location.href))))
            .fmap(url =>
              documentUrl.href === url.href
                ? void savePosition()
                : void 0)
            .extract())
          .close),
        new Promise<[void, Cancellation<void>]>(resolve =>
          void s.register(() => void resolve([void 0, s])))),
      exit: (_, s) =>
        void s.cancel()
    }, new Cancellation());
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
      && orig.fragment !== dest.fragment;
}

function sync(): void {
  void documentUrl.sync();
}

function click(url: string): Promise<Event> {
  const el: RouterEventSource.Anchor = document.createElement('a');
  el.href = url;
  return new Promise<Event>(resolve => (
    void once(el, 'click', event => (
      void event.preventDefault(),
      void resolve(event))),
    void parse('').extract().body.appendChild(el),
    void el.click(),
    void el.remove()));
}
