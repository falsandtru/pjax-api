import { Supervisor } from 'spica/supervisor';
import { Cancellee } from 'spica/cancellation';
import { delegate } from 'typed-dom';

export class ClickView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => void,
    cancellation: Cancellee,
  ) {
    void this.sv.register('', () => new Promise(() =>
      void this.sv.events.exit.monitor(
        [],
        delegate(document, selector, 'click', ev => {
          if (!(ev.currentTarget instanceof HTMLAnchorElement)) return;
          if (typeof ev.currentTarget.href !== 'string') return;
          void listener(ev);
        }))
    ), undefined);
    void this.sv.cast('', undefined);
    void cancellation.register(() => this.sv.terminate());
  }
  private readonly sv = new class extends Supervisor<''>{ }();
}
