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
void once(document, 'DOMContentLoaded', () => init = undefined);
export function isInvalidPopstateEvent(event: Event): boolean {
  return event.type !== 'popstate'
      || init !== canonicalizeUrl(validateUrl(location.href));
}
