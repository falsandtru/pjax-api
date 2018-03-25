import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { URL } from '../../../../lib/url';
import { find } from '../../../../lib/dom';
import { bind } from 'typed-dom';

export const scripts = new Set<URL.Absolute<StandardUrl>>();

void bind(window, 'pjax:unload', () =>
  void find<HTMLScriptElement>(document, 'script[src]')
    .forEach(script =>
      void scripts.add(new URL(standardizeUrl(script.src)).href)));
