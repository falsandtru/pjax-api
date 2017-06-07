import { standardizeUrl, encode_ } from './url';

describe('Unit: layer/data/model/url', () => {
  describe('standardizeUrl', () => {
    it('primitive', () => {
      assert(typeof standardizeUrl('') === 'string');
    });

    it('absolute path', () => {
      assert(standardizeUrl('') === location.href);
    });

    it('default port removing', () => {
      assert(standardizeUrl('//host:').endsWith('//host/'));
      assert(standardizeUrl('//host:/').endsWith('//host/'));
      assert(standardizeUrl('//host:80/').endsWith('//host/'));
      assert(standardizeUrl('//[80:80::80]/').endsWith('//[80:80::80]/'));
      assert(standardizeUrl('//[80:80::80]:/').endsWith('//[80:80::80]/'));
      assert(standardizeUrl('//[80:80::80]:80/').endsWith('//[80:80::80]/'));
      assert(standardizeUrl('//host/path:/').endsWith('//host/path:/'));
      assert(standardizeUrl('//host/path:80/').endsWith('//host/path:80/'));
    });

    it('root path filling', () => {
      assert(standardizeUrl('//host').endsWith('//host/'));
      assert(standardizeUrl('//host:').endsWith('//host/'));
      assert(standardizeUrl('//host:80').endsWith('//host/'));
      assert(standardizeUrl('//[80:80::80]').endsWith('//[80:80::80]/'));
      assert(standardizeUrl('//host/path').endsWith('//host/path'));
      assert(standardizeUrl('//host?').endsWith('//host/?'));
      assert(standardizeUrl('//host/?').endsWith('//host/?'));
      assert(standardizeUrl('//host/path?').endsWith('//host/path?'));
      assert(standardizeUrl('//host/path/?').endsWith('//host/path/?'));
    });

    it('percent-encoding', () => {
      assert(standardizeUrl('?a=b+c&%%3f#=%%3f').endsWith('?a=b%2Bc&%25%3F#%3D%25%3F'));
    });

    it('multiple-encoding', () => {
      assert(standardizeUrl(<string>standardizeUrl('/%%3f%3d')).endsWith('/%25%3F%3D'));
    });

  });

  describe('encode', () => {
    it('percent-encoding', () => {
      assert(encode_('/<>') === `/%3C%3E`);
      assert(encode_('/%3F%3D') === `/%3F%3D`);
      assert(encode_('/<%3F%3D>') === `/%3C%3F%3D%3E`);
      assert(encode_('/%%FF<%3F%3D>') === `/%25%FF%3C%3F%3D%3E`);
      assert(encode_('/\uD800\uDC00') === `/${encodeURI('\uD800\uDC00')}`);
      assert(encode_('/\uD800\uD800\uDC00\uDC00') === `/${encodeURI('\uD800\uDC00')}`);
      assert(encode_('//[2001:db8::7]/') === `//[2001:db8::7]/`);
      assert(encode_('?a=b+c&%%3f#=%%3f') === `?a=b%2Bc&%25%3F#%3D%25%3F`);
    });

    it('multiple-encoding', () => {
      assert(encode_(<string>encode_('/%%3f%3d')) === `/%25%3F%3D`);
    });

  });

});
