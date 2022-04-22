import { page } from '../../service/state/page';
import { isTransitable } from '../../../data/store/state';
import { Coroutine } from 'spica/coroutine';
import { standardize } from 'spica/url';
import { bind } from 'typed-dom/listener';

export class NavigationView extends Coroutine<never> {
  constructor(
    window: Window,
    listener: (event: Event) => void,
  ) {
    super(async function* () {
      return this.finally(bind(window, 'popstate', ev => {
        if (!isTransitable(page.state) || !isTransitable(window.history.state)) return;
        if (standardize(window.location.href) === page.href) return;
        void listener(ev);
      }));
    }, { delay: false });
  }
}
