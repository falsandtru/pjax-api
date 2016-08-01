import { Tick, concat } from 'spica';
import { canonicalizeUrl, CanonicalUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';
import { find } from '../../../../lib/dom';

export const script: CanonicalUrl[] = [];

void Tick(() =>
  void concat(script, find<HTMLScriptElement>(document, 'script')
    .filter(script => script.hasAttribute('src'))
    .map(script => canonicalizeUrl(validateUrl(script.src)))));
