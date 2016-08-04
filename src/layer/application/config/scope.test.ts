import { Sequence } from 'spica';
import { scope, compare, expand, match } from './scope';
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

  describe('compare', () => {
    it('root', () => {
      assert(compare(new Url(canonicalizeUrl(validateUrl('/'))).pathname, '/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/a'))).pathname, '/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/abc'))).pathname, '/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/a/'))).pathname, '/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname, '/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/a/b'))).pathname, '/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/abc/bcd'))).pathname, '/'));
    });

    it('dir', () => {
      assert(compare(new Url(canonicalizeUrl(validateUrl('/abc'))).pathname, '/abc'));
      assert(!compare(new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname, '/abc'));
      assert(!compare(new Url(canonicalizeUrl(validateUrl('/abc'))).pathname, '/abc/'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname, '/abc/'));
    });

    it('file', () => {
      assert(compare(new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname, '/a/b/c.d'));
      assert(!compare(new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname, '/a/b/c'));
      assert(!compare(new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname, '/a/b/d'));
    });

    it('query', () => {
      assert(compare(new Url(canonicalizeUrl(validateUrl('/a/b/c.d?e#f'))).pathname, '/a/b/c.d'));
    });

    it('expand', () => {
      assert(compare(new Url(canonicalizeUrl(validateUrl('/a'))).pathname, '/{a,b}'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/b'))).pathname, '/{a,b}'));
    });

    it('match', () => {
      assert(compare(new Url(canonicalizeUrl(validateUrl('/---/ac/-/103'))).pathname, '/*/{a,b}?/*/{1?3}'));
      assert(compare(new Url(canonicalizeUrl(validateUrl('/---/bc/-/103'))).pathname, '/*/{a,b}?/*/{1?3}'));
    });

  });

  describe('expand', () => {
    it('1', () => {
      assert.deepEqual(
        expand('{a}'),
        ['a']);
    });

    it('2', () => {
      assert.deepEqual(
        expand('{a}{b,c}d{e}{f,g}'),
        ['abdef', 'abdeg', 'acdef', 'acdeg']);
    });

    it('3', () => {
      assert.deepEqual(
        expand('{ab,bc,cd}'),
        ['ab', 'bc', 'cd']);
    });

  });

  describe('match', () => {
    it('char', () => {
      assert(match('', ''));
      assert(match('a', 'a'));
      assert(!match('a', 'A'));
      assert(!match('A', 'a'));
      Sequence.mappend(
        Sequence.from(['a', 'b', 'c'])
          .subsequences(),
        Sequence.from(['a', 'b', 'c'])
          .permutations())
        .map(subs => subs.join(''))
        .read()
        .forEach(subs =>
          assert(match(subs, 'abc') === (subs === 'abc')));
    });

    it('?', () => {
      assert(match('a', '?'));
      assert(!match('?', 'a'));
    });

    it('*', () => {
      assert(match('a', '*'));
      assert(!match('*', 'a'));
      assert(match('abc', '*'));
      assert(match('abc', 'a*'));
      assert(match('abc', 'ab*'));
      assert(match('abc', '*c'));
      assert(match('abc', '*bc'));
      assert(match('abc', 'a*c'));
      assert(match('abc', '*b*'));
    });

  });

});
