import { API } from './api';
import { Config as Options } from '../../../../';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { route, Config, RouterEvent } from './router';
import { page } from './state/page';
import './state/scroll-restoration';
import { process } from './state/process';
import { savePosition } from '../../application/store';
import { Supervisor } from 'spica/supervisor';
import { Copropagator } from 'spica/copropagator';

export class GUI extends API {
  private static readonly resources = new class extends Supervisor<string> { }();
  constructor(
    private readonly options: Options,
    private readonly io = {
      document: window.document,
      router: route,
    },
  ) {
    super();
    GUI.resources.clear();
    GUI.resources.register('view', this.view);
  }
  private readonly view = new View(this.options, this.io);
  public assign(url: string): boolean {
    return API.assign(url, this.options, this.io);
  }
  public replace(url: string): boolean {
    return API.replace(url, this.options, this.io);
  }
}

class View extends Copropagator<never> {
  constructor(
    options: Options,
    io: {
      document: Document,
      router: typeof route,
    },
  ) {
    const config = new Config(options);
    const router = (event: Event) => void io.router(config, new RouterEvent(event, page.url), process, io);
    super([
      new ClickView(io.document, config.link, router),
      new SubmitView(io.document, config.form, router),
      new NavigationView(window, router),
      new ScrollView(window, savePosition),
    ]);
  }
}
