import { canonicalizeUrl, CanonicalUrl } from '../../../data/model/canonicalization/url';
import { validateUrl } from '../../../data/model/validation/url';

export const documentUrl = new class {
  href = canonicalizeUrl(validateUrl(location.href));
  sync(): CanonicalUrl {
    return this.href = canonicalizeUrl(validateUrl(location.href));
  }
};
