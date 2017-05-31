import { Supervisor } from 'spica';
import { canonicalizeUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';
import { bind } from '../../../../lib/dom';
import { documentUrl } from '../../service/state/url';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => any
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.once(
        [''],
        bind(window, 'popstate', ev => {
          if (canonicalizeUrl(validateUrl(location.href)) === documentUrl.href) return;
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
