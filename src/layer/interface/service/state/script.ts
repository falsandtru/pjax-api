import { URL, StandardURL, standardize } from 'spica/url';
import { bind, apply } from 'typed-dom';

export const scripts = new Set<URL.Reference<StandardURL>>();

void bind(window, 'pjax:unload', () =>
  void apply<HTMLScriptElement>(document, 'script[src]')
    .forEach(script =>
      void scripts.add(new URL(standardize(script.src)).reference)));
