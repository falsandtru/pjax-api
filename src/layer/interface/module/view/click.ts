import { Supervisor } from 'spica/supervisor.legacy';
import { AtomicPromise } from 'spica/promise';
import { delegate } from 'typed-dom';

export class ClickView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => void,
  ) {
    void this.sv.register('', () => new AtomicPromise(() =>
      void this.sv.events.exit.monitor(
        [],
        delegate(document, selector, 'click', ev => {
          if (!(ev.currentTarget instanceof HTMLAnchorElement)) return;
          if (typeof ev.currentTarget.href !== 'string') return;
          void listener(ev);
        }))
    ), undefined);
    void this.sv.cast('', undefined);
  }
  private readonly sv = new class extends Supervisor<''>{ }();
  public close: () => void = () => void this.sv.terminate();
}
