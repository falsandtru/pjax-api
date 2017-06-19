import { Pjax } from '../../../index';
import { parse } from '../../../src/lib/html';
import { once } from '../../../src/lib/dom';

describe('Integration: Usecase', function () {
  describe('cancel', function () {
    it('basic', function (done) {
      const url1 = '/base/test/integration/usecase/fixture/basic/1.html';
      const url2 = '/base/test/integration/usecase/fixture/basic/2.html';
      const document = parse('').extract();
      Pjax.assign(url1, { fallback: done }, { document });
      Pjax.assign(url2, { fallback: done }, { document });
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url2);
        assert(document.title === 'Title 2');
        assert(document.querySelector('#primary')!.textContent === 'Primary 2');
        setTimeout(done, 1000);
      });
    });

  });

});
