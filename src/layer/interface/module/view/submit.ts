import { Coroutine } from 'spica/coroutine';
import { delegate } from 'typed-dom';

export class SubmitView extends Coroutine {
  constructor(
    document: Document,
    selector: string,
    listener: (event: Event) => void,
  ) {
    super(function* () {
      return this.finally(delegate(document, selector, 'submit', ev => {
        if (!(ev.currentTarget instanceof HTMLFormElement)) return;
        void listener(ev);
      }));
    });
    void this[Coroutine.init]();
  }
}
