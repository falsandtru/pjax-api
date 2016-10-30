import { Tick } from 'spica';
import { canonicalizeUrl, CanonicalUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';
import { once } from '../../../../lib/dom';

let url: CanonicalUrl = canonicalizeUrl(validateUrl(location.href));
let init: CanonicalUrl | undefined = url;

export const documentUrl = {
  get href(): CanonicalUrl {
    return url;
  },
  sync(): CanonicalUrl {
    init = undefined;
    return url = canonicalizeUrl(validateUrl(location.href));
  }
};

void once(window, 'popstate', () => Tick(() => init = undefined));
void once(document, 'DOMContentLoaded', () => void setTimeout(() => init = undefined, 1000));
export function isInvalidPopstateEvent(event: Event): boolean {
  assert(event.type === 'popstate');
  return init === canonicalizeUrl(validateUrl(location.href));
}
