import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { find, bind } from '../../../../lib/dom';

export const scripts = new Set<StandardUrl>();

void bind(window, 'pjax:unload', () =>
  void find<HTMLScriptElement>(document, 'script')
    .filter(script => script.hasAttribute('src'))
    .forEach(script =>
      void scripts.add(standardizeUrl(script.src))));
