import { validateUrl } from './url';

describe('Unit: layer/data/model/validation/url', () => {
  describe('validateUrl', () => {
    it('primitive', () => {
      assert(typeof validateUrl('') === 'string');
    });

    it('absolute path', () => {
      assert(validateUrl('') + '' === location.href);
    });

    it('percent-encoding', () => {
      assert(validateUrl('#<%3F%3D>') + '' === `${location.href}#%3C%3F%3D%3E`);
    });

    it('multiple-encoding', () => {
      assert(validateUrl(<any>validateUrl('#<%3F%3D>')) + '' === `${location.href}#%3C%3F%3D%3E`);
    });

  });

});
