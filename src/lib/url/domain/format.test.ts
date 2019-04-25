import { standardize, _encode as encode } from './format';

describe('Unit: lib/url/domain/format', () => {
  describe('standardize', () => {
    it('primitive', () => {
      assert(typeof standardize('') === 'string');
    });

    it('absolutization', () => {
      assert(standardize('') === window.location.href);
    });

    it('trim', () => {
      assert(standardize(' ') === window.location.href);
    });

    it('default port removing', () => {
      assert(standardize('//host:').endsWith('//host/'));
      assert(standardize('//host:/').endsWith('//host/'));
      assert(standardize('//host:80/').endsWith('//host/'));
      assert(standardize('//[80:80::80]/').endsWith('//[80:80::80]/'));
      assert(standardize('//[80:80::80]:/').endsWith('//[80:80::80]/'));
      assert(standardize('//[80:80::80]:80/').endsWith('//[80:80::80]/'));
      assert(standardize('//host/path:/').endsWith('//host/path:/'));
      assert(standardize('//host/path:80/').endsWith('//host/path:80/'));
    });

    it('root path filling', () => {
      assert(standardize('//host').endsWith('//host/'));
      assert(standardize('//host:').endsWith('//host/'));
      assert(standardize('//host:80').endsWith('//host/'));
      assert(standardize('//[80:80::80]').endsWith('//[80:80::80]/'));
      assert(standardize('//host/path').endsWith('//host/path'));
      assert(standardize('//host?').endsWith('//host/?'));
      assert(standardize('//host/?').endsWith('//host/?'));
      assert(standardize('//host/path?').endsWith('//host/path?'));
      assert(standardize('//host/path/?').endsWith('//host/path/?'));
    });

    it('verbose flag leaving', () => {
      assert(standardize('?').endsWith(`?`));
      assert(standardize('#').endsWith(`#`));
      assert(standardize('?#').endsWith(`?#`));
    });

    it('percent-encoding', () => {
      if (navigator.userAgent.includes('Edge')) return;
      assert(standardize('?a=b+c&%%3f#/?=+&%%3f#').endsWith(`?a=b%2Bc&%25%3F#/?=+&%%3f#`));
    });

    it('multiple-encoding', () => {
      if (navigator.userAgent.includes('Edge')) return;
      assert(standardize(standardize('/%%3f%3d') as string).endsWith('/%25%3F%3D'));
    });

  });

  describe('encode', () => {
    it('percent-encoding', () => {
      assert(encode('/<>') === `/%3C%3E`);
      assert(encode('/%3F%3D') === `/%3F%3D`);
      assert(encode('/<%3F%3D>') === `/%3C%3F%3D%3E`);
      assert(encode('/%%FF<%3F%3D>') === `/%25%FF%3C%3F%3D%3E`);
      assert(encode('/\uD800\uDC00') === `/${encodeURI('\uD800\uDC00')}`);
      assert(encode('/\uD800\uD800\uDC00\uDC00') === `/${encodeURI('\uD800\uDC00')}`);
      assert(encode('//[2001:db8::7]/') === `//[2001:db8::7]/`);
      assert(encode('?a=b+c&%%3f#/?=+&%%3f#') === `?a=b%2Bc&%25%3F#/?=+&%%3f#`);
    });

    it('multiple-encoding', () => {
      assert(encode(encode('/%%3f%3d') as string) === `/%25%3F%3D`);
    });

  });

});
