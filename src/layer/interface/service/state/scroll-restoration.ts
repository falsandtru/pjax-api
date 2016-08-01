void setTimeout(() =>
  window.history.scrollRestoration = 'manual',
  0);
void window.addEventListener('unload', () =>
  window.history.scrollRestoration = 'auto', true);
