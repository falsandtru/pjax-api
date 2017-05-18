import 'mocha';
import _assert from 'power-assert';

declare global {
  export const assert: typeof _assert;

  interface WindowEventMap {
    'error': ErrorEvent;
  }
  interface Event {
    _currentTarget: Window | Document | HTMLElement;
  }

}
