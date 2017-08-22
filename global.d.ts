declare global {
  interface Window {
    Window: typeof Window;
  }
  interface WindowEventMap {
    'error': ErrorEvent;
  }
  interface Event {
    _currentTarget: Window | Document | HTMLElement;
  }

}

import assert from 'power-assert';

type Assert = typeof assert;

declare global {
  const assert: Assert;
}
