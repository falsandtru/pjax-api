import { scope } from './scope';
import { Config } from '../config';
import { URL } from '../../../../lib/url';
import { standardizeUrl } from '../../../data/model/domain/url';

describe('Unit: layer/domain/data/config/scope', () => {
  describe('scope', () => {
    it('match', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardizeUrl('/a')).pathname,
          dest: new URL(standardizeUrl('/a')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardizeUrl('/a/')).pathname,
          dest: new URL(standardizeUrl('/a/')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardizeUrl('/abc')).pathname,
          dest: new URL(standardizeUrl('/abc')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardizeUrl('/abc/')).pathname,
          dest: new URL(standardizeUrl('/abc/')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardizeUrl('/a/b/c.d')).pathname,
          dest: new URL(standardizeUrl('/a/b/c.d')).pathname
        }).extract()),
        JSON.stringify(new Config({})));
    });

    it('mismatch', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/a': {} } }), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/a')).pathname
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/a': {} } }), {
          orig: new URL(standardizeUrl('/a')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract(() => [])),
        JSON.stringify([]));
    });

    it('extend', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': { fetch: { wait: 100 } } } }), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract()),
        JSON.stringify(new Config({ fetch: { wait: 100 }, scope: { '/': { fetch: { wait: 100 } } } })));
    });

    it('disable', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined } }), {
          orig: new URL(standardizeUrl('/')).pathname,
          dest: new URL(standardizeUrl('/')).pathname
        }).extract(() => ({}))),
        JSON.stringify({}));
    });

    it('enable', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined, '/a': {} } }), {
          orig: new URL(standardizeUrl('/a')).pathname,
          dest: new URL(standardizeUrl('/a')).pathname
        }).extract()),
        JSON.stringify(new Config({ scope: { '/': undefined, '/a': {} } })));
    });

  });

});
