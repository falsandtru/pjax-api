import { Coroutine } from 'spica/coroutine';
import { delegate } from 'typed-dom/listener';

export class ClickView extends Coroutine<never> {
  constructor(
    document: Document,
    selector: string,
    listener: (event: MouseEvent) => void,
  ) {
    super(async function* () {
      return this.finally(delegate(document, selector, 'click', ev => {
        if (!(ev.currentTarget instanceof HTMLAnchorElement || ev.currentTarget instanceof HTMLAreaElement)) return;
        assert(typeof ev.currentTarget.href === 'string');
        listener(ev);
      }));
    }, { delay: false });
  }
}
