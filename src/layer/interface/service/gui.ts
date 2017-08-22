import { API } from './api';
import { Config as Option } from '../../../../';
import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { Just, Nothing } from 'spica/maybe';
import { Config } from '../../application/api';
import { Url } from '../../../lib/url';
import { RouterEventSource } from '../../domain/event/router';
import { StandardUrl, standardizeUrl } from '../../data/model/domain/url';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { documentUrl } from './state/url';
import './state/scroll-restoration';
import { process } from './state/process';
import { route } from './router';
import { loadTitle, savePosition } from '../../application/api';

const view = new class extends Supervisor<'', void, void, Cancellation<void>>{ }();

export class GUI extends API {
  constructor(
    private readonly option: Option,
    private readonly io = {
      document: window.document
    },
  ) {
    super();
    const config = new Config(this.option);
    void view.terminate('');
    void view.register('', {
      init: s => s,
      call: (_, s) => (
        void s.register(new ClickView(this.io.document, config.link, event =>
          void Just(new Url(standardizeUrl((<RouterEventSource.Anchor>event.currentTarget).href)))
            .bind(url =>
              isAccessible(url)
              && !isHashChange(url)
              && !hasModifierKey(event)
              && config.filter(<RouterEventSource.Anchor>event.currentTarget)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              route(config, event, process, this.io))
            .extract(sync))
          .close),
        void s.register(new SubmitView(this.io.document, config.form, event =>
          void Just(new Url(standardizeUrl((<RouterEventSource.Form>event.currentTarget).action)))
            .bind(url =>
              isAccessible(url)
                ? Just(0)
                : Nothing)
            .fmap(() =>
              route(config, event, process, this.io))
            .extract(sync))
          .close),
        void s.register(new NavigationView(window, event =>
          void Just(new Url(standardizeUrl(window.location.href)))
            .bind(url =>
              isAccessible(url)
              && !isHashChange(url)
                ? Just(loadTitle())
                : Nothing)
            .fmap(title => (
              title
                ? io.document.title = title
                : void 0,
              route(config, event, process, this.io)))
            .extract(sync))
          .close),
        void s.register(new ScrollView(window, () =>
          void Just(new Url(standardizeUrl(window.location.href)))
            .fmap(url =>
              documentUrl.href === url.href
                ? void savePosition()
                : void 0)
            .extract())
          .close),
        new Promise<never>(() => void 0)),
      exit: (_, s) =>
        void s.cancel(),
    }, new Cancellation());
    void view.cast('', void 0);
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

function isAccessible(
  dest: Url<StandardUrl>,
  orig: Url<StandardUrl> = new Url(documentUrl.href),
): boolean {
  return orig.domain === dest.domain;
}

function isHashChange(
  dest: Url<StandardUrl>,
  orig: Url<StandardUrl> = new Url(documentUrl.href),
): boolean {
  return orig.domain === dest.domain
      && orig.path === dest.path
      && orig.fragment !== dest.fragment;
}

function sync(): void {
  void documentUrl.sync();
}
