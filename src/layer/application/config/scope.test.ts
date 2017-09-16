import { scope } from './scope';
import { Config } from '../../domain/data/config';
import { URL } from '../../../lib/url';
import { standardizeUrl } from '../../data/model/domain/url';

describe('Unit: layer/application/config/scope', () => {
  describe('scope', () => {
    it('match', () => {
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new URL(standardizeUrl('/a')).pathname,
          dest: new URL(standardizeUrl('/a')).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new URL(standardizeUrl('/a/')).pathname,
          dest: new URL(standardizeUrl('/a/')).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new URL(standardizeUrl('/abc')).pathname,
          dest: new URL(standardizeUrl('/abc')).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new URL(standardizeUrl('/abc/')).pathname,
          dest: new URL(standardizeUrl('/abc/')).pathname
        }).extract(),
        new Config({}));
      assert.deepStrictEqual(
        scope(new Config({}), {
          orig: new URL(standardizeUrl('/a/b/c.d')).pathname,
          dest: new URL(standardizeUrl('/a/b/c.d')).pathname
        }).extract(),
        new Config({}));
    });

    it('mismatch', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/a': {} } }), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/a')).pathname
        }).extract(() => []),
        []);
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/a': {} } }), {
          orig: new URL(standardizeUrl('/a')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract(() => []),
        []);
    });

    it('extend', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/': { fetch: { wait: 100 } } } }), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract(),
        new Config({ fetch: { wait: 100 }, scope: { '/': { fetch: { wait: 100 } } } }));
    });

    it('disable', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/': void 0 } }), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract(() => ({})),
        {});
    });

    it('enable', () => {
      assert.deepStrictEqual(
        scope(new Config({ scope: { '/': void 0, '/a': {} } }), {
          orig: new URL(standardizeUrl('/a')).pathname,
          dest: new URL(standardizeUrl('/a')).pathname
        }).extract(),
        new Config({ scope: { '/': void 0, '/a': {} } }));
    });

  });

});
