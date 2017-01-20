import 'mocha';
import _assert from 'power-assert';

declare global {
  export const assert: typeof _assert;

  interface Event {
    _currentTarget: HTMLElement;
  }

  interface History {
    scrollRestoration: 'auto' | 'manual';
  }

}
