import { Supervisor } from 'spica/supervisor';
import { delegate } from 'typed-dom';

export class SubmitView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: Event) => void,
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.monitor(
        [],
        delegate(document.documentElement, selector, 'submit', ev => {
          if (!(ev.currentTarget instanceof HTMLFormElement)) return;
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
