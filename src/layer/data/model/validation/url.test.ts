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
      assert(validateUrl('/<>').endsWith('/%3C%3E'));
      assert(validateUrl('/%3F%3D').endsWith('/%3F%3D'));
      assert(validateUrl('/<%3F%3D>').endsWith('/%3C%3F%3D%3E'));
      assert(validateUrl('/%%FF<%3F%3D>').endsWith('/%25%FF%3C%3F%3D%3E'));
      assert(validateUrl('/\uD800\uDC00').endsWith(`/${encodeURI('\uD800\uDC00')}`));
      assert(validateUrl('/\uD800\uD800\uDC00\uDC00').endsWith(`/${encodeURI('\uD800\uDC00')}`));
      assert(validateUrl('//[2001:db8::7]/').endsWith('//[2001:db8::7]/'));
    });

    it('multiple-encoding', () => {
      assert(validateUrl(<any>validateUrl('/<%3F%3D>')).endsWith('/%3C%3F%3D%3E'));
    });

  });

});
