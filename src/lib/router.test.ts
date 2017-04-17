import { router, compare, expand, match } from './router';
import { Url } from './url';
import { canonicalizeUrl } from '../layer/data/model/canonicalization/url';
import { validateUrl } from '../layer/data/model/validation/url';
import { Sequence } from 'spica';

describe('Unit: lib/router', () => {
  describe('router', () => {
    it('router', done => {
      let cnt = 0;
      const route = router({
        '/': path => {
          assert(++cnt === 1);
          assert(path === '/a');
        },
        '/b': path => {
          assert(++cnt === 2);
          assert(path === '/b?c');
          done();
        }
      });
      route('/a');
      route('/b?c');
    });

  });

  describe('compare', () => {
    it('root', () => {
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/'))).pathname));
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/a'))).pathname));
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/abc'))).pathname));
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/a/'))).pathname));
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname));
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/a/b'))).pathname));
      assert(compare('/', new Url(canonicalizeUrl(validateUrl('/abc/bcd'))).pathname));
      assert(!compare('/a', new Url(canonicalizeUrl(validateUrl('/'))).pathname));
    });

    it('dir', () => {
      assert(compare('/abc', new Url(canonicalizeUrl(validateUrl('/abc'))).pathname));
      assert(!compare('/abc', new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname));
      assert(!compare('/abc/', new Url(canonicalizeUrl(validateUrl('/abc'))).pathname));
      assert(compare('/abc/', new Url(canonicalizeUrl(validateUrl('/abc/'))).pathname));
      assert(!compare('/abc', new Url(canonicalizeUrl(validateUrl('/ab'))).pathname));
      assert(!compare('/ab', new Url(canonicalizeUrl(validateUrl('/abc'))).pathname));
    });

    it('file', () => {
      assert(compare('/a/b/c.d', new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname));
      assert(!compare('/a/b/c', new Url(canonicalizeUrl(validateUrl('/a/b/c.d'))).pathname));
      assert(!compare('/a/b/c.d', new Url(canonicalizeUrl(validateUrl('/a/b/c'))).pathname));
    });

    it('query', () => {
      assert(compare('/a/b', new Url(canonicalizeUrl(validateUrl('/a/b?c'))).pathname));
      assert(!compare('/a/b/', new Url(canonicalizeUrl(validateUrl('/a/b?c'))).pathname));
      assert(!compare('/a/b', new Url(canonicalizeUrl(validateUrl('/a/b/?c'))).pathname));
      assert(compare('/a/b/', new Url(canonicalizeUrl(validateUrl('/a/b/?c'))).pathname));
    });

    it('expand', () => {
      assert(compare('/{a,b}', new Url(canonicalizeUrl(validateUrl('/a'))).pathname));
      assert(compare('/{a,b}', new Url(canonicalizeUrl(validateUrl('/b'))).pathname));
    });

    it('match', () => {
      assert(compare('/*/{a,b}?/*/{1?3}', new Url(canonicalizeUrl(validateUrl('/---/ac/-/103'))).pathname));
      assert(compare('/*/{a,b}?/*/{1?3}', new Url(canonicalizeUrl(validateUrl('/---/bc/-/103'))).pathname));
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
        .extract()
        .forEach(subs =>
          assert(match('abc', subs) === (subs === 'abc')));
    });

    it('?', () => {
      assert(match('?', 'a'));
      assert(!match('a', '?'));
    });

    it('*', () => {
      assert(match('*', 'a'));
      assert(!match('a', '*'));
      assert(match('*', 'abc'));
      assert(match('a*', 'abc'));
      assert(match('ab*', 'abc'));
      assert(match('*c', 'abc'));
      assert(match('*bc', 'abc'));
      assert(match('a*c', 'abc'));
      assert(match('*b*', 'abc'));
      assert(match('*bc', 'abbc'));
    });

  });

});
