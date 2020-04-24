import { docurl } from '../../service/state/url';
import { Coroutine } from 'spica/coroutine';
import { standardize } from 'spica/url';
import { bind } from 'typed-dom';

export class NavigationView extends Coroutine<never> {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    super(async function* () {
      return this.finally(bind(window, 'popstate', ev => {
        if (standardize(window.location.href) === docurl.href) return;
        void listener(ev);
      }));
    }, { delay: false });
  }
}
