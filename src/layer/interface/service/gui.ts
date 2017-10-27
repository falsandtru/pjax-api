import { API } from './api';
import { Config as Option } from '../../../../';
import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { Just, Nothing } from 'spica/maybe';
import { Config } from '../../application/api';
import { URL } from '../../../lib/url';
import { RouterEventSource } from '../../domain/event/router';
import { StandardUrl, standardizeUrl } from '../../data/model/domain/url';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { docurl } from './state/url';
import './state/scroll-restoration';
import { process } from './state/process';
import { route } from './router';
import { savePosition } from '../../application/api';

const view = new class extends Supervisor<'', void, void, Cancellation<void>>{ }();

export class GUI extends API {
  constructor(
    private readonly option: Option,
    private readonly io = {
      document: window.document,
      router: route,
    },
  ) {
    super();
    const config = new Config(this.option);
    void view.kill('');
    void view.register('', {
      init: s => s,
      call: (_, s) => (
        void s.register(new ClickView(this.io.document, config.link, event =>
          void Just(new URL(standardizeUrl((event.currentTarget as RouterEventSource.Anchor).href)))
            .bind(url =>
              isAccessible(url)
              && !isHashClick(url)
              && !isHashChange(url)
              && !isDownload(event.currentTarget as RouterEventSource.Anchor)
              && !hasModifierKey(event)
              && config.filter(event.currentTarget as RouterEventSource.Anchor)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              io.router(config, event, process, this.io))
            .extract(docurl.sync))
          .close),
        void s.register(new SubmitView(this.io.document, config.form, event =>
          void Just(new URL(standardizeUrl((event.currentTarget as RouterEventSource.Form).action)))
            .bind(url =>
              isAccessible(url)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              io.router(config, event, process, this.io))
            .extract(docurl.sync))
          .close),
        void s.register(new NavigationView(window, event =>
          void Just(new URL(standardizeUrl(window.location.href)))
            .bind(url =>
              isAccessible(url)
              && !isHashChange(url)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              io.router(config, event, process, this.io))
            .extract(docurl.sync))
          .close),
        void s.register(new ScrollView(window, () =>
          void Just(new URL(standardizeUrl(window.location.href)))
            .fmap(url =>
              url.href === docurl.href
                ? void savePosition()
                : undefined)
            .extract())
          .close),
        new Promise<never>(() => undefined)),
      exit: (_, s) =>
        void s.cancel(),
    }, new Cancellation());
    void view.cast('', undefined);
  }
  public assign(url: string): undefined {
    return void API.assign(url, this.option, this.io);
  }
  public replace(url: string): undefined {
    return void API.replace(url, this.option, this.io);
  }
}

function hasModifierKey(event: MouseEvent): boolean {
  return event.which > 1
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey;
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
