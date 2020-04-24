import { docurl } from '../../service/state/url';
import { Coroutine } from 'spica/coroutine';
import { standardize } from 'spica/url';
import { debounce } from 'spica/throttle';
import { bind } from 'typed-dom';

export class ScrollView extends Coroutine<never> {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    super(async function* () {
      return this.finally(bind(window, 'scroll', debounce(100, ev => {
        if (standardize(window.location.href) !== docurl.href) return;
        void listener(ev);
      }), { passive: true }));
    }, { delay: false });
  }
}
