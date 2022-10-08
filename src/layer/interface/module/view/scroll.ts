import { page } from '../../service/state/page';
import { Coroutine } from 'spica/coroutine';
import { standardize } from 'spica/url';
import { debounce } from 'spica/throttle';
import { bind } from 'typed-dom/listener';

export class ScrollView extends Coroutine<never> {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    super(async function* () {
      return this.finally(bind(window, 'scroll', debounce(100, ev => {
        if (standardize(window.location.href) !== page.url.href) return;
        listener(ev);
      }), { passive: true }));
    }, { delay: false });
  }
}
