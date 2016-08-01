import { Supervisor } from 'spica';
import { bind } from '../../../../lib/dom';

export class NavigationView {
  constructor(
    window: Window,
    listener: (event: Event) => any
  ) {
    void this.sv.register([], () =>
      void this.sv.events.exit.once(
        [],
        bind(window, 'popstate', listener)));
    void this.sv.cast([], void 0);
  }
  private readonly sv = new class extends Supervisor<string[], undefined, undefined>{ }();
  public readonly close = (): undefined =>
    void this.sv.terminate();
}
