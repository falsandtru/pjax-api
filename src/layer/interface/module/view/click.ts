import { Coroutine } from 'spica/coroutine';
import { delegate } from 'typed-dom';

export class ClickView extends Coroutine<never> {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => void,
  ) {
    super(async function* () {
      return this.finally(delegate(document, selector, 'click', ev => {
        if (!(ev.currentTarget instanceof HTMLAnchorElement)) return;
        assert(typeof ev.currentTarget.href === 'string');
        void listener(ev);
      }));
    });
    void this[Coroutine.init]();
  }
}
