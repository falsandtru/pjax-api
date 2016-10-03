import { Supervisor } from 'spica';
import { bind } from '../../../../lib/dom';

export class ScrollView {
  constructor(
    window: Window,
    listener: (event: Event) => any
  ) {
    let timer = 0;
    void this.sv.register('', () => [
      void this.sv.events.exit.once(
        [],
        bind(window, 'scroll', event =>
          timer = timer > 0
            ? timer
            : setTimeout(
              (): void => (
                timer = 0,
                void listener(event)),
              300),
          { passive: true })),
      void 0
    ], void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<string, void, void, void>{ }();
  public readonly close = (): void =>
    void this.sv.terminate();
}
