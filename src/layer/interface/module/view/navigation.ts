import { Supervisor } from 'spica/supervisor';
import { bind } from 'typed-dom';
import { standardizeUrl } from '../../../data/model/domain/url';
import { docurl } from '../../service/state/url';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'popstate', ev => {
          if (standardizeUrl(window.location.href) === docurl.href) return;
          void listener(ev);
        })),
      new Promise<never>(() => void 0)
    ), void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<'', void, void, void>{ }();
  public readonly close = () =>
    void this.sv.terminate();
}
