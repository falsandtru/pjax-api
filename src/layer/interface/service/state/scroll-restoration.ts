import { bind } from 'typed-dom/listener';

bind(window, 'unload', () =>
  window.history.scrollRestoration = 'auto', false);
