import { Supervisor } from 'spica/supervisor';
import { Cancellee } from 'spica/cancellation';
import { bind } from 'typed-dom';
import { standardizeUrl } from '../../../data/model/domain/url';
import { docurl } from '../../service/state/url';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
    cancellation: Cancellee,
  ) {
    void this.sv.register('', () => new Promise(() =>
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'popstate', ev => {
          if (standardizeUrl(window.location.href) === docurl.href) return;
          void listener(ev);
        }))
    ), undefined);
    void this.sv.cast('', undefined);
    void cancellation.register(() => this.sv.terminate());
  }
  private readonly sv = new class extends Supervisor<''>{ }();
}
