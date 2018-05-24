import { Supervisor } from 'spica/supervisor.legacy';
import { AtomicPromise } from 'spica/promise';
import { bind } from 'typed-dom';
import { debounce } from 'spica/throttle';

export class ScrollView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    void this.sv.register('', () => new AtomicPromise(() =>
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'scroll', debounce(100, ev => {
          void listener(ev);
        }), { passive: true }))
    ), undefined);
    void this.sv.cast('', undefined);
  }
  private readonly sv = new class extends Supervisor<''>{ }();
  public close: () => void = () => void this.sv.terminate();
}
