import { Supervisor } from 'spica';
import { delegate } from '../../../../lib/dom';

export class ClickView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => any
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.once(
        [''],
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
  public readonly close = (): void =>
    void this.sv.terminate();
}
