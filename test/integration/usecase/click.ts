import { Pjax } from '../../../index';
import { parse } from '../../../src/lib/html';
import { once } from '../../../src/lib/dom';

describe('Integration: Usecase', function () {
  describe('click', function () {
    it('basic', function (done) {
      const url = '/base/test/integration/usecase/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({}, { document });
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
          assert(target instanceof HTMLAnchorElement);
          done();
        }
      }, { document });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

  });

});
