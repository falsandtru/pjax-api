import { page } from './page';
import { URL, StandardURL, standardize } from 'spica/url';
import { bind } from 'typed-dom/listener';

export const scripts = new Set<URL.Href<StandardURL>>();

void bind(window, 'pjax:unload', () =>
  void document.querySelectorAll('script[src]')
    .forEach(script =>
      void scripts.add(new URL(standardize(script.src, page.url.href)).href)));
