import { Supervisor } from 'spica/supervisor';
import { Cancellee } from 'spica/cancellation';
import { delegate } from 'typed-dom';

export class SubmitView {
  constructor(
    document: Document,
    selector: string,
    listener: (event: Event) => void,
    cancellation: Cancellee,
  ) {
    void this.sv.register('', () => (
      void this.sv.events.exit.monitor(
        [],
        delegate(document, selector, 'submit', ev => {
          if (!(ev.currentTarget instanceof HTMLFormElement)) return;
          void listener(ev);
        })),
      new Promise<never>(() => undefined)
    ), undefined);
    void this.sv.cast('', undefined);
    void cancellation.register(() => this.sv.terminate());
  }
  private readonly sv = new class extends Supervisor<''>{ }();
}
