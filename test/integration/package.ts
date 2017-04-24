import { Pjax, Sequence } from '../../index';
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
      new Pjax({}, { document })
        .assign('/base/test/integration/usecase/fixture/basic/1.html');
      let cnt = 0;
      once(window, 'pjax:fetch', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'manual');
        assert(cnt === 0 && ++cnt);
      });
      once(window, 'pjax:unload', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(cnt === 1 && ++cnt);
      });
      once(document, 'pjax:ready', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(cnt === 2 && ++cnt);
      });
      once(window, 'pjax:load', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(cnt === 3 && ++cnt);
        done();
      });
    });

  });

  describe('sequence', function () {
    it('sequence', function (done) {
      const document = parse('').extract();
      const sequence: Sequence<boolean, number, string> = {
        fetch(r, req) {
          assert(cnt === 1 && ++cnt);
          assert(r === void 0);
          assert(window.history.scrollRestoration === 'manual');
          assert.deepStrictEqual(req, {
            host: '',
            path: '/base/test/integration/usecase/fixture/basic/1.html',
            method: 'GET',
            data: null
          });
          return Promise.resolve(false);
        },
        unload(r, res) {
          assert(cnt === 3 && ++cnt);
          assert(r === false);
          assert(res.headers['Content-Type'] === 'text/html');
          assert(res.document instanceof Document);
          assert(res.document !== window.document);
          assert(window.history.scrollRestoration === 'auto');
          return Promise.resolve(0);
        },
        ready(r) {
          assert(cnt === 5 && ++cnt);
          assert(r === 0);
          assert(window.history.scrollRestoration === 'auto');
          return Promise.resolve('');
        },
        load(r) {
          assert(cnt === 7 && ++cnt);
          assert(r === '');
          assert(window.history.scrollRestoration === 'auto');
          done();
        }
      };
      new Pjax({ sequence }, { document })
        .assign('/base/test/integration/usecase/fixture/basic/1.html');
      let cnt = 0;
      once(window, 'pjax:fetch', () =>
        assert(cnt === 0 && ++cnt));
      once(window, 'pjax:unload', () =>
        assert(cnt === 2 && ++cnt));
      once(document, 'pjax:ready', () =>
        assert(cnt === 4 && ++cnt));
      once(window, 'pjax:load', () =>
        assert(cnt === 6 && ++cnt));
    });

  });

});
