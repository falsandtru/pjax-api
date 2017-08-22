import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { find } from '../../../../lib/dom';
import { bind } from 'typed-dom';

export const scripts = new Set<StandardUrl>();

void bind(window, 'pjax:unload', () =>
  void find(document, 'script')
    .filter(script => script.hasAttribute('src'))
    .forEach(script =>
      void scripts.add(standardizeUrl(script.src))));
