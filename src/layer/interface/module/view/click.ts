import { Supervisor } from 'spica/supervisor';
import { delegate } from 'typed-dom';

export class ClickView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => void,
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.monitor(
        [],
        delegate(document.documentElement, selector, 'click', ev => {
          if (!(ev.currentTarget instanceof HTMLAnchorElement)) return;
          if (typeof ev.currentTarget.href !== 'string') return;
          void listener(ev);
        })),
      new Promise<never>(() => void 0)
    ), void 0);
    void this.sv.cast('', void 0);
  }
  private readonly sv = new class extends Supervisor<'', void, void, void>{ }();
  public readonly close = () =>
    void this.sv.terminate();
}
