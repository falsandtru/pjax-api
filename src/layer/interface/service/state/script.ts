import { canonicalizeUrl, CanonicalUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';
import { find } from '../../../../lib/dom';

export const scripts: Promise<Set<CanonicalUrl>> = new Promise<void>(setTimeout)
  .then<Set<CanonicalUrl>>(() =>
    find<HTMLScriptElement>(document, 'script')
      .filter(script => script.hasAttribute('src'))
      .reduce(
        (scripts, script) =>
          scripts.add(canonicalizeUrl(validateUrl(script.src))),
        new Set<CanonicalUrl>()));
