import { Pjax, Sequence } from 'pjax-api';
import { parse } from '../../src/lib/html';
import { once } from '../../src/lib/dom';

describe('Integration: Package', function () {
  describe('state', function () {
    it('scrollRestoration', function () {
      assert(window.history.scrollRestoration === 'auto' || window.history.scrollRestoration === void 0);
    });

  });

  describe('event', function () {
    it('sequence', function (done) {
      const document = parse('').extract();
      new Pjax({}, { document }).assign('/base/test/integration/usecase/fixture/basic/1.html');
      let cnt = 0;
      once(window, 'pjax:fetch', () => assert(++cnt === 1));
      once(window, 'pjax:unload', () => assert(++cnt === 2));
      once(document, 'pjax:ready', () => assert(++cnt === 3));
      once(window, 'pjax:load', () => assert(++cnt === 4) || done());
    });

  });

  describe('sequence', function () {
    it('sequence', function (done) {
      const document = parse('').extract();
      const sequence: Sequence<boolean, number, string> = {
        fetch(r, req) {
          assert(++cnt === 2);
          assert(r === void 0);
          assert.deepStrictEqual(req, {
            host: '',
            path: '/base/test/integration/usecase/fixture/basic/1.html',
            method: 'GET',
            data: null
          });
          return Promise.resolve(false);
        },
        unload(r, res) {
          assert(++cnt === 4);
          assert(r === false);
          assert(res.headers['Content-Type'] === 'text/html');
          assert(res.document instanceof Document);
          assert(res.document !== window.document);
          return Promise.resolve(0);
        },
        ready(r) {
          assert(++cnt === 6);
          assert(r === 0);
          return Promise.resolve('');
        },
        load(r) {
          assert(++cnt === 8);
          assert(r === '');
          done();
        }
      };
      new Pjax({ sequence }, { document }).assign('/base/test/integration/usecase/fixture/basic/1.html');
      let cnt = 0;
      once(window, 'pjax:fetch', () => assert(++cnt === 1));
      once(window, 'pjax:unload', () => assert(++cnt === 3));
      once(document, 'pjax:ready', () => assert(++cnt === 5));
      once(window, 'pjax:load', () => assert(++cnt === 7));
    });

  });

});
