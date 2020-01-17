import { API } from './api';
import { Config as Option } from '../../../../';
import { ClickView } from '../module/view/click';
import { SubmitView } from '../module/view/submit';
import { NavigationView } from '../module/view/navigation';
import { ScrollView } from '../module/view/scroll';
import { route, Config, RouterEvent } from './router';
import './state/scroll-restoration';
import { process } from './state/process';
import { savePosition } from '../../application/store';
import { Supervisor } from 'spica/supervisor';

export class GUI extends API {
  constructor(
    private readonly option: Option,
    private readonly io = {
      document: window.document,
      router: route,
    },
  ) {
    super();
    new View(this.option, io);
  }
  public assign(url: string): boolean {
    return API.assign(url, this.option, this.io);
  }
  public replace(url: string): boolean {
    return API.replace(url, this.option, this.io);
  }
}

class View {
  private static readonly resource = new class extends Supervisor<string, unknown>{ }();
  constructor(
    option: Option,
    io: {
      document: Document,
      router: typeof route,
    },
  ) {
    const config = new Config(option);
    const router = (event: Event) => void io.router(config, new RouterEvent(event), process, io);
    void [
      new ClickView(io.document, config.link, router),
      new SubmitView(io.document, config.form, router),
      new NavigationView(window, router),
      new ScrollView(window, savePosition),
    ]
      .forEach((view, i) =>
        void View.resource.kill(`${i}`) ||
        void View.resource.register(`${i}`, view));
  }
}

export function clear(): void {
  void View['resource'].clear();
}
