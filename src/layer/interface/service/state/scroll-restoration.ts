import { bind } from 'typed-dom/listener';

void bind(window, 'unload', () =>
  window.history.scrollRestoration = 'auto', false);
