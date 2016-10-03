import { canonicalizeUrl, CanonicalUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';
import { find } from '../../../../lib/dom';

export const scripts = new Set<CanonicalUrl>();

void setTimeout(() =>
  void find<HTMLScriptElement>(document, 'script')
    .filter(script => script.hasAttribute('src'))
    .forEach(script =>
      void scripts.add(canonicalizeUrl(validateUrl(script.src)))));
