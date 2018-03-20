import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { URL } from '../../../../lib/url';
import { find } from '../../../../lib/dom';
import { bind, once } from 'typed-dom';
import { concat } from 'spica/concat';

export const scripts = new Set<URL.Absolute<StandardUrl>>();

void bind(window, 'pjax:unload', () =>
  void find<HTMLScriptElement>(document, 'script[src]')
    .forEach(script =>
      void scripts.add(new URL(standardizeUrl(script.src)).href)));

void new MutationObserver(ms =>
  void ms
    .reduce<HTMLScriptElement[]>((ss, { addedNodes }) =>
      concat(
        ss,
        [...addedNodes]
          .filter((node): node is HTMLScriptElement =>
            node instanceof HTMLScriptElement && node.hasAttribute('src')))
    , [])
    .forEach(script =>
      void once(script, 'load', () =>
        void scripts.add(new URL(standardizeUrl(script.src)).href))))
  .observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
