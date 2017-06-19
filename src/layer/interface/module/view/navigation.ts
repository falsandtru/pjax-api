import { Supervisor } from 'spica';
import { standardizeUrl } from '../../../data/model/domain/url';
import { bind } from '../../../../lib/dom';
import { documentUrl } from '../../service/state/url';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'popstate', ev => {
          if (standardizeUrl(location.href) === documentUrl.href) return;
          void listener(ev);
        })),
      new Promise<never>(() => void 0)
    ), void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<'', void, void, void>{ }();
  public readonly close = (): void =>
    void this.sv.terminate();
}
