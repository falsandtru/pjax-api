import { router, compare, _expand as expand, _match as match } from './router';
import { URL } from './url';
import { standardizeUrl } from '../layer/data/model/domain/url';
import { Sequence } from 'spica/sequence';

describe('Unit: lib/router', () => {
  describe('router', () => {
    it('router', () => {
      const route = router({
        '/'(path) {
          assert(this instanceof Object);
          assert(path === '/a');
          return '/';
        },
        '/b'(path) {
          assert(this instanceof Object);
          assert(path === '/b');
          return '/b';
        },
        '/b/'(path) {
          assert(this instanceof Object);
          assert(path === '/b/');
          return '/b/';
        },
        '/c'(path) {
          assert(this instanceof Object);
          assert(path === '/c/?q');
          return '/c';
        }
      });
      assert(route('/a') === '/');
      assert(route('/b') === '/b');
      assert(route('/b/') === '/b/');
      assert(route('/c/?q') === '/c');
    });

  });

  describe('compare', () => {
    it('root', () => {
      assert(compare('/', new URL(standardizeUrl('/')).pathname));
      assert(compare('/', new URL(standardizeUrl('/a')).pathname));
      assert(compare('/', new URL(standardizeUrl('/abc')).pathname));
      assert(compare('/', new URL(standardizeUrl('/a/')).pathname));
      assert(compare('/', new URL(standardizeUrl('/abc/')).pathname));
      assert(compare('/', new URL(standardizeUrl('/a/b')).pathname));
      assert(compare('/', new URL(standardizeUrl('/abc/bcd')).pathname));
    });

    it('dir', () => {
      assert(!compare('/abc', new URL(standardizeUrl('/')).pathname));
      assert(compare('/abc', new URL(standardizeUrl('/abc')).pathname));
      assert(compare('/abc', new URL(standardizeUrl('/abc/')).pathname));
      assert(!compare('/abc/', new URL(standardizeUrl('/abc')).pathname));
      assert(compare('/abc/', new URL(standardizeUrl('/abc/')).pathname));
      assert(!compare('/abc', new URL(standardizeUrl('/ab')).pathname));
      assert(!compare('/ab', new URL(standardizeUrl('/abc')).pathname));
    });

    it('file', () => {
      assert(compare('/a/b/c.d', new URL(standardizeUrl('/a/b/c.d')).pathname));
      assert(!compare('/a/b/c', new URL(standardizeUrl('/a/b/c.d')).pathname));
      assert(!compare('/a/b/c.d', new URL(standardizeUrl('/a/b/c')).pathname));
    });

    it('expand', () => {
      assert(compare('/{a,b}', new URL(standardizeUrl('/a')).pathname));
      assert(compare('/{a,b}', new URL(standardizeUrl('/b')).pathname));
    });

    it('match', () => {
      assert(compare('/*/{a,b}?/*/{1?3}', new URL(standardizeUrl('/---/ac/-/103')).pathname));
      assert(compare('/*/{a,b}?/*/{1?3}', new URL(standardizeUrl('/---/bc/-/103')).pathname));
    });

  });

  describe('expand', () => {
    it('{}', () => {
      assert.deepStrictEqual(expand('{}'), ['']);
      assert.deepStrictEqual(expand('{a}'), ['a']);
      assert.deepStrictEqual(expand('{a}{b,c}d{e}{,f}'), ['abde', 'abdef', 'acde', 'acdef']);
      assert.deepStrictEqual(expand('{ab,bc,cd}'), ['ab', 'bc', 'cd']);
      assert.deepStrictEqual(expand('{{}}'), ['']);
      assert.deepStrictEqual(expand('{a,{b,}c}'), ['a', 'bc', 'c']);
    });

    it('[]', () => {
      assert.throws(() => expand('[]'));
    });

    it('**', () => {
      assert.throws(() => expand('**'));
    });

  });

  describe('match', () => {
    it('char', () => {
      assert(match('', ''));
      assert(!match('', 'a'));
      assert(match('a', 'a'));
      assert(!match('a', 'A'));
      assert(!match('A', 'a'));
      Sequence.mappend(
        Sequence.from(['a', 'b', 'c'])
          .subsequences(),
        Sequence.from(['a', 'b', 'c'])
          .permutations())
        .map(subs => subs.join(''))
        .extract()
        .forEach(subs =>
          assert(match('abc', subs) === (subs === 'abc')));
    });

    it('?', () => {
      assert(!match('', '?'));
      assert(!match('?', ''));
      assert(match('?', 'a'));
      assert(!match('?', '/'));
      assert(!match('a?', 'a/'));
      assert(!match('?', '.'));
      assert(match('.?', '.a'));
      assert(match('a?', 'a.'));
    });

    it('*', () => {
      assert(!match('', '*'));
      assert(match('*', ''));
      assert(match('*', 'a'));
      assert(match('*', 'abc'));
      assert(match('a*', 'a'));
      assert(match('a*', 'abc'));
      assert(match('ab*', 'abc'));
      assert(match('*c', 'c'));
      assert(match('*c', 'abc'));
      assert(match('*bc', 'abc'));
      assert(match('a*c', 'ac'));
      assert(match('a*c', 'abc'));
      assert(match('*b*', 'b'));
      assert(match('*b*', 'abc'));
      assert(match('*bc', 'abbc'));
      assert(match('*c', 'abcc'));
      assert(!match('a?*c', 'ac'));
      assert(!match('a*?c', 'ac'));
      assert(match('a?*c', 'abc'));
      assert(match('a*?c', 'abc'));
      assert(match('a?*c', 'abbc'));
      assert(match('a*?c', 'abbc'));
      assert(!match('*', '/'));
      assert(match('*/', '/'));
      assert(match('.*', '.'));
      assert(!match('*', '.'));
      assert(match('*', 'a.b'));
      assert(!match('*.', '.'));
      assert(match('*.*', 'a.b'));
      assert(match('?*.*', 'a.b'));
    });

  });

});
