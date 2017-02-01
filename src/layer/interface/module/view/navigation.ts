import { Supervisor } from 'spica';
import { isInvalidPopstateEvent } from '../../service/state/url';
import { bind } from '../../../../lib/dom';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => any
  ) {
    void this.sv.register('', () => (
      new Promise<never>(() =>
        void this.sv.events.exit.once(
          [],
          bind(window, 'popstate', ev => {
            if (isInvalidPopstateEvent(ev)) return;
            void listener(ev);
          })))
    ), void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<'', void, void, void>{ }();
  public readonly close = (): void =>
    void this.sv.terminate();
}
