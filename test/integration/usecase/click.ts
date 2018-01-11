import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Usecase', function () {
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
