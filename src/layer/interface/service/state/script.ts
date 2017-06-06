import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { find } from '../../../../lib/dom';

export const scripts: Promise<Set<StandardUrl>> = new Promise<void>(setTimeout)
  .then<Set<StandardUrl>>(() =>
    find<HTMLScriptElement>(document, 'script')
      .filter(script => script.hasAttribute('src'))
      .reduce(
        (scripts, script) =>
          scripts.add(standardizeUrl(script.src)),
        new Set<StandardUrl>()));
