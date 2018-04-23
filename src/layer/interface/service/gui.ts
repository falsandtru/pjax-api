import { API } from './api';
import { Config as Option } from '../../../../';
import { Supervisor } from 'spica/supervisor';
import { Cancellation } from 'spica/cancellation';
import { URL } from '../../../lib/url';
import { standardizeUrl } from '../../data/model/domain/url';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { route, Config, RouterEvent } from './router';
import { docurl } from './state/url';
import './state/scroll-restoration';
import { process } from './state/process';
import { savePosition } from '../../application/store';

const view = new class extends Supervisor<'', undefined, undefined, Cancellation>{ }();

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
    void view.register('', {
      init: s => s,
      main: (_, s) => new Promise(() => {
        void new ClickView(this.io.document, config.link, event =>
          void io.router(config, new RouterEvent(event), process, io), s);
        void new SubmitView(this.io.document, config.form, event =>
          void io.router(config, new RouterEvent(event), process, io), s);
        void new NavigationView(window, event =>
          void io.router(config, new RouterEvent(event), process, io), s);
        void new ScrollView(window, () => {
          if (new URL(standardizeUrl(window.location.href)).href !== docurl.href) return;
          void savePosition();
        }, s);
      }),
      exit: (_, s) =>
        void s.cancel(),
    }, new Cancellation(), new Error('Kill'));
    void view.cast('', undefined);
  }
  public assign(url: string): undefined {
    return void API.assign(url, this.option, this.io);
  }
  public replace(url: string): undefined {
    return void API.replace(url, this.option, this.io);
  }
}
