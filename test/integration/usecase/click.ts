import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { unregister } from '../../../src/layer/interface/service/gui';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Usecase', function () {
  afterEach(() => {
    unregister();
  });

  describe('click', function () {
    it('basic', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary')!.textContent === 'Primary 1');
        done();
      });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

    it('shadow', function (done) {
      if (!window.document.body.attachShadow) return done();
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary')!.textContent === 'Primary 1');
        done();
      });
      const a = document.createElement('a');
      a.href = url;
      document.body.attachShadow({ mode: 'open' }).appendChild(a);
      a.click();
    });

    it('hash', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html#a';
      new Pjax({}, { document, router });
      const unbind = once(window, 'pjax:fetch', () => {
        done(true);
      });
      once(document, 'click', ev => {
        assert(!ev.defaultPrevented);
        a.remove();
        setTimeout(() => {
          assert(window.location.hash === '#a');
          once(window, 'hashchange', () => {
            assert(window.location.hash === '');
            setTimeout(() => {
              unbind();
              done();
            }, 100);
          });
          window.history.back();
        }, 100);
      });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

    it('failure', function (done) {
      const url = '404';
      const document = parse('').extract();
      new Pjax({
        fallback(target) {
          assert(target === a);
          assert(window.history.scrollRestoration === 'auto');
          done();
        }
      }, { document, router });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

  });

});
