import { scope } from './scope';
import { Config } from '../../domain/data/config';
import { Url } from '../../../lib/url';
import { canonicalizeUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';

describe('Unit: layer/application/config/scope', () => {
  describe('scope', () => {
    it('match', () => {
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new Url(canonicalizeUrl(validateUrl('/'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/'))).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new Url(canonicalizeUrl(validateUrl('/a'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/a'))).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new Url(canonicalizeUrl(validateUrl('/a/'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/a/'))).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new Url(canonicalizeUrl(validateUrl('/abc'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/abc'))).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname
        }).extract(),
        new Config({}));
    });

    it('mismatch', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/a': {} } }), {
          orig: new Url(canonicalizeUrl(validateUrl('/'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/a'))).pathname
        }).extract(() => []),
        []);
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/a': {} } }), {
          orig: new Url(canonicalizeUrl(validateUrl('/a'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/'))).pathname
        }).extract(() => []),
        []);
    });

    it('extend', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/': { fetch: { wait: 100 } } } }), {
          orig: new Url(canonicalizeUrl(validateUrl('/'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/'))).pathname
        }).extract(),
        new Config({ fetch: { wait: 100 }, scope: { '/': { fetch: { wait: 100 } } } }));
    });

    it('disable', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/': void 0 } }), {
          orig: new Url(canonicalizeUrl(validateUrl('/'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/'))).pathname
        }).extract(() => ({})),
        {});
    });

    it('enable', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/': void 0, '/a': {} } }), {
          orig: new Url(canonicalizeUrl(validateUrl('/a'))).pathname,
          dest: new Url(canonicalizeUrl(validateUrl('/a'))).pathname
        }).extract(),
        new Config({ scope: { '/': void 0, '/a': {} } }));
    });

  });

});
