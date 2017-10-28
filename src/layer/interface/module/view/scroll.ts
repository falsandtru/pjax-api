import { Supervisor } from 'spica/supervisor';
import { bind } from 'typed-dom';
import { throttle } from 'spica/throttle';

export class ScrollView {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.monitor(
        [],
        bind(window, 'scroll', throttle<UIEvent>(300, ev => (
          this.active &&
          void listener(ev)
        )), { passive: true })),
      new Promise<never>(() => undefined)
    ), undefined);
    void this.sv.cast('', undefined);
  }
  private active = true;
  private readonly sv = new class extends Supervisor<'', void, void, void>{ }({
    destructor: () =>
      this.active = false,
  });
  public readonly close = () =>
    void this.sv.terminate();
}
