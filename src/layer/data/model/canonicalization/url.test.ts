import { canonicalizeUrl } from './url';
import { validateUrl } from '../validation/url';

describe('Unit: layer/data/model/canonicalization/url', () => {
  describe('canonicalizeUrl', () => {
    it('primitive', () => {
      assert(typeof canonicalizeUrl(validateUrl('')) === 'string');
    });

    it('absolute path', () => {
      assert(canonicalizeUrl(validateUrl('')) === location.href);
    });

    it('percent-encoding', () => {
      assert(canonicalizeUrl(validateUrl('#%%3f%3d')) === `${location.href}#%25%3F%3D`);
    });

    it('multiple-encoding', () => {
      assert(canonicalizeUrl(validateUrl(<any>canonicalizeUrl(validateUrl('#%%3f%3d')))) === `${location.href}#%25%3F%3D`);
    });

  });

});
