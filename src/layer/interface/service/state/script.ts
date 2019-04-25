import { URL, StandardURL, standardizeURL } from '../../../../lib/url';
import { find } from '../../../../lib/dom';
import { bind } from 'typed-dom';

export const scripts = new Set<URL.Reference<StandardURL>>();

void bind(window, 'pjax:unload', () =>
  void find<HTMLScriptElement>(document, 'script[src]')
    .forEach(script =>
      void scripts.add(new URL(standardizeURL(script.src)).reference)));
