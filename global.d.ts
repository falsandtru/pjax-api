declare global {
  interface Window {
    Window: typeof Window;
  }
  interface WindowEventMap {
    'error': ErrorEvent;
  }
}

import assert from 'power-assert';

type Assert = typeof assert;

declare global {
  const assert: Assert;
}
