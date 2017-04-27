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
      const path = '/base/test/integration/usecase/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({
        fallback: done
      }, { document })
        .assign(path);
      let cnt = 0;
      once(window, 'pjax:fetch', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'manual');
        assert(cnt === 0 && ++cnt);
      });
      once(window, 'pjax:unload', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(window.location.pathname !== path);
        assert(cnt === 1 && ++cnt);
      });
      once(document, 'pjax:ready', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(window.location.pathname === path);
        assert(document.title === 'Title 1');
        assert(document.querySelector('header')!.innerHTML === 'Header 1');
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
      const path = '/base/test/integration/usecase/fixture/basic/2.html';
      const document = parse('').extract();
      const sequence: Sequence<boolean, number, string> = {
        async fetch(r, req) {
          assert(cnt === 1 && ++cnt);
          assert(r === void 0);
          assert(window.history.scrollRestoration === 'manual');
          assert.deepStrictEqual(req, {
            host: '',
            path: path,
            method: 'GET',
            data: null
          });
          return false;
        },
        async unload(r, res) {
          assert(cnt === 3 && ++cnt);
          assert(r === false);
          assert(res.headers['Content-Type'] === 'text/html');
          assert(res.document instanceof Document);
          assert(res.document !== window.document);
          assert(window.history.scrollRestoration === 'auto');
          assert(window.location.pathname !== path);
          return 0;
        },
        async ready(r, areas) {
          assert(cnt === 5 && ++cnt);
          assert(r === 0);
          assert.deepStrictEqual(areas, [document.body]);
          assert(window.history.scrollRestoration === 'auto');
          assert(window.location.pathname === path);
          assert(document.title === 'Title 2');
          assert(document.querySelector('header')!.innerHTML === 'Header 2');
          return '';
        },
        load(r, events) {
          assert(cnt === 7 && ++cnt);
          assert(r === '');
          assert.deepStrictEqual(events, []);
          assert(window.history.scrollRestoration === 'auto');
          done();
        }
      };
      new Pjax({
        sequence,
        fallback: done
      }, { document })
        .assign(path);
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
