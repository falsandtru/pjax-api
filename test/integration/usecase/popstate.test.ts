import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { wait } from 'spica/timer';
import { once } from 'typed-dom';

describe('Integration: Usecase', function () {
  afterEach(() => {
    Pjax['resources'].clear();
  });

  describe('popstate', function () {
    it('basic', function (done) {
      const url = '/base/test/integration/fixture/basic/2.html';
      const document = parse('').extract();
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 2');
        assert(document.querySelector('#primary')!.textContent === 'Primary 2');
        once(document, 'pjax:ready', () => {
          assert(window.location.pathname !== url);
          assert(document.title !== 'Title 2');
          once(document, 'pjax:ready', () => {
            assert(window.location.pathname === url);
            assert(document.title === 'Title 2');
            assert(document.querySelector('#primary')!.textContent === 'Primary 2');
            done();
          });
          window.history.go(1);
        });
        window.history.back();
      });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

    it('complex', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', async () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary')!.textContent === 'Primary 1');
        Pjax.pushURL('/404', '404');
        window.history.back();
        await wait(100);
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary')!.textContent === 'Primary 1');
        window.history.go(1);
        await wait(100);
        assert(window.location.pathname === '/404');
        assert(document.title === 'Title 1');
        done();
      });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

  });

});
