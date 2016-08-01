import { canonicalizeUrl, CanonicalUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';

let url: CanonicalUrl = canonicalizeUrl(validateUrl(location.href));

export const documentUrl = {
  get href(): CanonicalUrl {
    return url;
  },
  sync(): CanonicalUrl {
    return url = canonicalizeUrl(validateUrl(location.href));
  }
};
