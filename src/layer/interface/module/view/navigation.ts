import { Supervisor } from 'spica/supervisor.legacy';
import { AtomicPromise } from 'spica/promise';
import { bind } from 'typed-dom';
import { docurl } from '../../service/state/url';
import { standardize } from 'spica/url';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    void this.sv.register('', () => new AtomicPromise(() =>
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'popstate', ev => {
          if (standardize(window.location.href) === docurl.href) return;
          void listener(ev);
        }))
    ), undefined);
    void this.sv.cast('', undefined);
  }
  private readonly sv = new class extends Supervisor<''>{ }();
  public close: () => void = () => void this.sv.terminate();
}
