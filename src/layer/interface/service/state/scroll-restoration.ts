import { bind } from 'typed-dom';

void bind(window, 'unload', () =>
  window.history.scrollRestoration = 'auto', false);
