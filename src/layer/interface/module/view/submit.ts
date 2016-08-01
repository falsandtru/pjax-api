import { Supervisor } from 'spica';
import { delegate } from '../../../../lib/dom';

export class SubmitView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => any
  ) {
    void this.sv.register([], () =>
      void this.sv.events.exit.once(
        [],
        delegate(document.documentElement, selector, 'submit', listener)));
    void this.sv.cast([], void 0);
  }
  private readonly sv = new class extends Supervisor<string[], undefined, undefined>{ }();
  public readonly close = (): undefined =>
    void this.sv.terminate();
}
