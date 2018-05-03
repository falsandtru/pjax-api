import { Pjax, Sequence } from '../../index';
import { route as router } from '../../src/layer/interface/service/router';
import { parse } from '../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Package', function () {
  describe('state', function () {
    it('scrollRestoration', function () {
      assert(window.history.scrollRestoration === 'auto' || window.history.scrollRestoration === undefined);
    });

  });

  describe('event', function () {
    it('sequence', function (done) {
      const path = '/base/test/integration/fixture/basic/2.html';
      const document = parse('').extract();
      new Pjax({
        fallback: done
      }, { document, router })
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
      once(document, 'pjax:content', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(window.location.pathname === path);
        assert(document.title === 'Title 2');
        assert(document.querySelector('header')!.innerHTML === 'Header 2');
        assert(cnt === 2 && ++cnt);
      });
      once(document, 'pjax:ready', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(cnt === 3 && ++cnt);
      });
      once(window, 'pjax:load', ev => {
        assert(ev instanceof Event);
        assert(window.history.scrollRestoration === 'auto');
        assert(cnt === 4 && ++cnt);
        done();
      });
    });

  });

  describe('sequence', function () {
    it('sequence', function (done) {
      const path = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      const sequence: Sequence<1, 2, 3, 4> = {
        async fetch(r, req) {
          assert(cnt === 1 && ++cnt);
          assert(r === undefined);
          assert(window.history.scrollRestoration === 'manual');
          assert.deepStrictEqual(req, {
            path: path,
            method: 'GET',
            headers: req.headers,
            body: null
          });
          return 1;
        },
        async unload(r, res) {
          assert(cnt === 3 && ++cnt);
          assert(r === 1);
          assert(res.header('Content-Type') === 'text/html');
          assert(res.document instanceof Document);
          assert(res.document !== window.document);
          assert(window.history.scrollRestoration === 'auto');
          assert(window.location.pathname !== path);
          return 2;
        },
        async content(r, areas) {
          assert(cnt === 5 && ++cnt);
          assert(r === 2);
          assert.deepStrictEqual(areas, [document.body]);
          assert(window.history.scrollRestoration === 'auto');
          assert(window.location.pathname === path);
          assert(document.title === 'Title 1');
          assert(document.querySelector('header')!.innerHTML === 'Header 1');
          return 3;
        },
        async ready(r) {
          assert(cnt === 7 && ++cnt);
          assert(r === 3);
          assert(window.history.scrollRestoration === 'auto');
          return 4;
        },
        async load(r, events) {
          assert(cnt === 9 && ++cnt);
          assert(r === 4);
          assert.deepStrictEqual(events, []);
          assert(window.history.scrollRestoration === 'auto');
          done();
        }
      };
      new Pjax({
        sequence,
        fallback: done
      }, { document, router })
        .assign(path);
      let cnt = 0;
      once(window, 'pjax:fetch', () =>
        assert(cnt === 0 && ++cnt));
      once(window, 'pjax:unload', () =>
        assert(cnt === 2 && ++cnt));
      once(document, 'pjax:content', () =>
        assert(cnt === 4 && ++cnt));
      once(document, 'pjax:ready', () =>
        assert(cnt === 6 && ++cnt));
      once(window, 'pjax:load', () =>
        assert(cnt === 8 && ++cnt));
    });

  });

});
