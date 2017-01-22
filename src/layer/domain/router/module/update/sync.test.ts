import { sync, pair } from './sync';
import { parse } from '../fetch/html';
import { find } from '../../../../../lib/dom';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/sync', () => {
  describe('sync', () => {
    it('empty', () => {
      const document = {
        src: parse(DOM.head([
        ]).element.outerHTML).extract(),
        dst: parse(DOM.head([
        ]).element.outerHTML).extract()
      };
      sync(pair(find(document.src, 'meta'), find(document.dst, 'meta'), (a, b) => a.id === b.id), document.dst.head);
      assert.deepStrictEqual(find(document.dst, 'meta').map(el => el.id), [
      ]);
    });

    it('nothing to all', () => {
      const document = {
        src: parse(DOM.head([
          DOM.meta({ id: 'a' }, []),
          DOM.meta({ id: 'b' }, []),
          DOM.meta({ id: 'c' }, [])
        ]).element.outerHTML).extract(),
        dst: parse(DOM.head([
        ]).element.outerHTML).extract()
      };
      sync(pair(find(document.src, 'meta'), find(document.dst, 'meta'), (a, b) => a.id === b.id), document.dst.head);
      assert.deepStrictEqual(find(document.dst, 'meta').map(el => el.id), [
        'a',
        'b',
        'c'
      ]);
    });

    it('all to nothing', () => {
      const document = {
        src: parse(DOM.head([
        ]).element.outerHTML).extract(),
        dst: parse(DOM.head([
          DOM.meta({ id: 'a' }, []),
          DOM.meta({ id: 'b' }, []),
          DOM.meta({ id: 'c' }, [])
        ]).element.outerHTML).extract()
      };
      sync(pair(find(document.src, 'meta'), find(document.dst, 'meta'), (a, b) => a.id === b.id), document.dst.head);
      assert.deepStrictEqual(find(document.dst, 'meta').map(el => el.id), [
      ]);
    });

    it('partial', () => {
      const document = {
        src: parse(DOM.head([
          DOM.meta({ id: 'a' }, []),
          DOM.meta({ id: 'c' }, []),
          DOM.meta({ id: 'e' }, [])
        ]).element.outerHTML).extract(),
        dst: parse(DOM.head([
          DOM.meta({ id: 'b' }, []),
          DOM.meta({ id: 'c' }, []),
          DOM.meta({ id: 'd' }, [])
        ]).element.outerHTML).extract()
      };
      sync(pair(find(document.src, 'meta'), find(document.dst, 'meta'), (a, b) => a.id === b.id), document.dst.head);
      assert.deepStrictEqual(find(document.dst, 'meta').map(el => el.id), [
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
