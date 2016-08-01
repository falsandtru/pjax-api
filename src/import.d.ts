import 'mocha';
import _assert from 'power-assert';
import './lib.ex';

declare global {
  export const assert: typeof _assert;
}
