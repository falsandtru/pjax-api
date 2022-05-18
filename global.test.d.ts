import assert from 'power-assert';

declare namespace NS {
  export {
    assert,
  }
}

declare global {
  const assert: typeof NS.assert;
}
