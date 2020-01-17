import { Coroutine } from 'spica/coroutine';
import { delegate } from 'typed-dom';

export class ClickView extends Coroutine {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => void,
  ) {
    super(function* () {
      return this.finally(delegate(document, selector, 'click', ev => {
        if (!(ev.currentTarget instanceof HTMLAnchorElement)) return;
        if (typeof ev.currentTarget.href !== 'string') return;
        void listener(ev);
      }));
    });
    void this[Coroutine.init]();
  }
}
