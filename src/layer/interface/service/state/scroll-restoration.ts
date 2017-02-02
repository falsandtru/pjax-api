import { bind } from '../../../../lib/dom';

void bind(window, 'unload', () =>
  window.history.scrollRestoration = 'auto', false);
