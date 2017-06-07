import 'mocha';
import _assert from 'power-assert';

declare global {
  export const assert: typeof _assert;

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
