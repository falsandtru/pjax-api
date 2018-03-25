import { sync, pair } from './sync';
import { parse } from '../../../../../lib/html';
import { find } from '../../../../../lib/dom';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/sync', () => {
  describe('sync', () => {
    it('empty', () => {
      const documents = {
        src: parse(html('head', [
        ]).outerHTML).extract(),
        dst: parse(html('head', [
        ]).outerHTML).extract(),
      };
      sync(pair(find(documents.src, 'meta'), find(documents.dst, 'meta'), (a, b) => a.id === b.id), documents.dst.head);
      assert.deepStrictEqual(find(documents.dst, 'meta').map(el => el.id), [
      ]);
    });

    it('nothing to all', () => {
      const documents = {
        src: parse(html('head', [
          html('meta', { id: 'a' }),
          html('meta', { id: 'b' }),
          html('meta', { id: 'c' }),
        ]).outerHTML).extract(),
        dst: parse(html('head', [
        ]).outerHTML).extract(),
      };
      sync(pair(find(documents.src, 'meta'), find(documents.dst, 'meta'), (a, b) => a.id === b.id), documents.dst.head);
      assert.deepStrictEqual(find(documents.dst, 'meta').map(el => el.id), [
        'a',
        'b',
        'c'
      ]);
    });

    it('all to nothing', () => {
      const documents = {
        src: parse(html('head', [
        ]).outerHTML).extract(),
        dst: parse(html('head', [
          html('meta', { id: 'a' }),
          html('meta', { id: 'b' }),
          html('meta', { id: 'c' }),
        ]).outerHTML).extract(),
      };
      sync(pair(find(documents.src, 'meta'), find(documents.dst, 'meta'), (a, b) => a.id === b.id), documents.dst.head);
      assert.deepStrictEqual(find(documents.dst, 'meta').map(el => el.id), [
      ]);
    });

    it('partial', () => {
      const documents = {
        src: parse(html('head', [
          html('meta', { id: 'a' }),
          html('meta', { id: 'c' }),
          html('meta', { id: 'e' }),
        ]).outerHTML).extract(),
        dst: parse(html('head', [
          html('meta', { id: 'b' }),
          html('meta', { id: 'c' }),
          html('meta', { id: 'd' }),
        ]).outerHTML).extract()
      };
      sync(pair(find(documents.src, 'meta'), find(documents.dst, 'meta'), (a, b) => a.id === b.id), documents.dst.head);
      assert.deepStrictEqual(find(documents.dst, 'meta').map(el => el.id), [
        'a',
        'c',
        'e'
      ]);
    });

  });

  describe('pair', () => {
    it('empty', () => {
      assert.deepStrictEqual(pair([], [], () => true), [
      ]);
      assert.deepStrictEqual(pair([], [], () => false), [
      ]);
    });

    it('all', () => {
      assert.deepStrictEqual(pair([1, 2, 3], [], () => true), [
        [[1, 2, 3], null]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [], () => false), [
        [[1, 2, 3], null]
      ]);
    });

    it('one', () => {
      assert.deepStrictEqual(pair([1, 2, 3], [1], (a, b) => a === b), [
        [[1], 1],
        [[2, 3], null]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [2], (a, b) => a === b), [
        [[1, 2], 2],
        [[3], null]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [3], (a, b) => a === b), [
        [[1, 2, 3], 3]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [4], (a, b) => a === b), [
        [[1, 2, 3], null],
        [[], 4]
      ]);
      assert.deepStrictEqual(pair([1], [1, 2, 3], (a, b) => a === b), [
        [[1], 1],
        [[], 2],
        [[], 3]
      ]);
      assert.deepStrictEqual(pair([2], [1, 2, 3], (a, b) => a === b), [
        [[2], 2],
        [[], 1],
        [[], 3]
      ]);
      assert.deepStrictEqual(pair([3], [1, 2, 3], (a, b) => a === b), [
        [[3], 3],
        [[], 1],
        [[], 2]
      ]);
    });

    it('multiple', () => {
      assert.deepStrictEqual(pair([1, 2, 3], [1, 2], (a, b) => a === b), [
        [[1], 1],
        [[2], 2],
        [[3], null]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [1, 3], (a, b) => a === b), [
        [[1], 1],
        [[2, 3], 3]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [2, 3], (a, b) => a === b), [
        [[1, 2], 2],
        [[3], 3]
      ]);
      assert.deepStrictEqual(pair([1, 2], [1, 2, 3], (a, b) => a === b), [
        [[1], 1],
        [[2], 2],
        [[], 3]
      ]);
      assert.deepStrictEqual(pair([1, 3], [1, 2, 3], (a, b) => a === b), [
        [[1], 1],
        [[3], 3],
        [[], 2]
      ]);
      assert.deepStrictEqual(pair([2, 3], [1, 2, 3], (a, b) => a === b), [
        [[2], 2],
        [[3], 3],
        [[], 1]
      ]);
      assert.deepStrictEqual(pair([1, 2, 3], [1, 2, 3], (a, b) => a === b), [
        [[1], 1],
        [[2], 2],
        [[3], 3]
      ]);
    });

  });

});
