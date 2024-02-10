import { scope } from './scope';
import { Config } from '../config';
import { URL, standardize } from 'spica/url';

describe('Unit: layer/domain/data/config/scope', () => {
  describe('scope', () => {
    it('basic', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/b', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/a/', window.location.href)).pathname,
          dest: new URL(standardize('/b/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/abc', window.location.href)).pathname,
          dest: new URL(standardize('/def', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/abc/', window.location.href)).pathname,
          dest: new URL(standardize('/def/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({}), {
          orig: new URL(standardize('/a/b/c.d', window.location.href)).pathname,
          dest: new URL(standardize('/e/f/g.h', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/a': { link: 'a' } } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/ab', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/a': { link: 'a' } } }), {
          orig: new URL(standardize('/a#', window.location.href)).pathname,
          dest: new URL(standardize('/a?b', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({ link: 'a' })));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a' } } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a' } } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/a', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a' } } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a' } } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/b', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({ link: 'a' })));
    });

    it('disable', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': undefined } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': undefined } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/a', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': undefined } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/b', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
    });

    it('enable', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined, '/*': {} } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined, '/*': {} } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/a', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': undefined, '/*': {} } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/b', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
    });

    it('isolation', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a', isolation: true } } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a', isolation: true } } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/a', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/*': { link: 'a', isolation: true } } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/b', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({ link: 'a', isolation: true })));
    });

    it('nest', () => {
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': { scope: { '/*': undefined } } } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/', window.location.href)).pathname,
        }).extract()),
        JSON.stringify(new Config({})));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': { scope: { '/*': undefined } } } }), {
          orig: new URL(standardize('/', window.location.href)).pathname,
          dest: new URL(standardize('/a', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
      assert.deepStrictEqual(
        JSON.stringify(scope(new Config({ scope: { '/': { scope: { '/*': undefined } } } }), {
          orig: new URL(standardize('/a', window.location.href)).pathname,
          dest: new URL(standardize('/b', window.location.href)).pathname,
        }).extract(() => [])),
        JSON.stringify([]));
    });

  });

});
