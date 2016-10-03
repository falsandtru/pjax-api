import { Supervisor } from 'spica';
import { bind } from '../../../../lib/dom';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => any
  ) {
    void this.sv.register('', () => [
      void this.sv.events.exit.once(
        [],
        bind(window, 'popstate', listener)),
      void 0
    ], void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<string, void, void, void>{ }();
  public readonly close = (): void =>
    void this.sv.terminate();
}
