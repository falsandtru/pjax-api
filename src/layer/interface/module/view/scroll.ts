import { Supervisor } from 'spica/supervisor';
import { Cancellee } from 'spica/cancellation';
import { bind } from 'typed-dom';
import { debounce } from 'spica/throttle';

export class ScrollView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
    cancellation: Cancellee,
  ) {
    void this.sv.register('', () => new Promise(() =>
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'scroll', debounce(100, ev => (
          !cancellation.canceled &&
          void listener(ev)
        )), { passive: true }))
    ), undefined);
    void this.sv.cast('', undefined);
    void cancellation.register(() => this.sv.terminate());
  }
  private readonly sv = new class extends Supervisor<''>{ }();
}
