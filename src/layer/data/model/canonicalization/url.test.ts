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

    it('default port removing', () => {
      assert(canonicalizeUrl(validateUrl('//host:')).endsWith('//host/'));
      assert(canonicalizeUrl(validateUrl('//host:/')).endsWith('//host/'));
      assert(canonicalizeUrl(validateUrl('//host:80/')).endsWith('//host/'));
      assert(canonicalizeUrl(validateUrl('//[80:80::80]/')).endsWith('//[80:80::80]/'));
      assert(canonicalizeUrl(validateUrl('//[80:80::80]:/')).endsWith('//[80:80::80]/'));
      assert(canonicalizeUrl(validateUrl('//[80:80::80]:80/')).endsWith('//[80:80::80]/'));
      assert(canonicalizeUrl(validateUrl('/host:/')).endsWith('/host:/'));
      assert(canonicalizeUrl(validateUrl('/host:80/')).endsWith('/host:80/'));
    });

    it('root path filling', () => {
      assert(canonicalizeUrl(validateUrl('//host')).endsWith('//host/'));
      assert(canonicalizeUrl(validateUrl('//host:')).endsWith('//host/'));
      assert(canonicalizeUrl(validateUrl('//host:80')).endsWith('//host/'));
      assert(canonicalizeUrl(validateUrl('/host')).endsWith('/host'));
      assert(canonicalizeUrl(validateUrl('/[80:80::80]')).endsWith('/[80:80::80]'));
    });

    it('percent-encoding', () => {
      assert(canonicalizeUrl(validateUrl('/%%3f%3d')).endsWith('/%25%3F%3D'));
    });

    it('multiple-encoding', () => {
      assert(canonicalizeUrl(validateUrl(<any>canonicalizeUrl(validateUrl('/%%3f%3d')))).endsWith('/%25%3F%3D'));
    });

  });

});
