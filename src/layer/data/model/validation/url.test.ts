import { validateUrl } from './url';

describe('Unit: layer/data/model/validation/url', () => {
  describe('validateUrl', () => {
    it('primitive', () => {
      assert(typeof validateUrl('') === 'string');
    });

    it('absolute path', () => {
      assert(validateUrl('') === location.href);
    });

    it('percent-encoding', () => {
      assert(validateUrl('#<>') === `${location.href}#%3C%3E`);
      assert(validateUrl('#%3F%3D') === `${location.href}#%3F%3D`);
      assert(validateUrl('#<%3F%3D>') === `${location.href}#%3C%3F%3D%3E`);
      assert(validateUrl('#%%FF<%3F%3D>') === `${location.href}#%25%FF%3C%3F%3D%3E`);
      assert(validateUrl('#\uD800\uDC00') === `${location.href}#${encodeURI('\uD800\uDC00')}`);
      assert(validateUrl('#\uD800\uD800\uDC00\uDC00') === `${location.href}#${encodeURI('\uD800\uDC00')}`);
    });

    it('multiple-encoding', () => {
      assert(validateUrl(<any>validateUrl('#<%3F%3D>')) === `${location.href}#%3C%3F%3D%3E`);
    });

  });

});
