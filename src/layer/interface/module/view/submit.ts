import { Supervisor } from 'spica';
import { delegate } from '../../../../lib/dom';

export class SubmitView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => any
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.once(
        [],
        delegate(document.documentElement, selector, 'submit', listener)),
      new Promise<never>(() => void 0)
    ), void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<'', void, void, void>{ }();
  public readonly close = (): void =>
    void this.sv.terminate();
}
