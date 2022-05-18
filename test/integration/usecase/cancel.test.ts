import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { wait as delay } from 'spica/timer';
import { once } from 'typed-dom';

describe('Integration: Usecase', function () {
  afterEach(() => {
    Pjax['resources'].clear();
  });

  describe('cancel', function () {
    it('basic', function (done) {
      const url1 = '/base/test/integration/fixture/basic/1.html';
      const url2 = '/base/test/integration/fixture/basic/2.html';
      const document = parse('').extract();
      Pjax.assign(url1, { fallback: done }, { document, router });
      Pjax.assign(url2, { fallback: done }, { document, router });
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url2);
        assert(document.title === 'Title 2');
        assert(document.querySelector('#primary')!.textContent === 'Primary 2');
        setTimeout(done, 1000);
      });
    });

    it('hash', function (done) {
      const url1 = '/base/test/integration/fixture/basic/1.html';
      const url2 = '#';
      const document = parse('').extract();
      Pjax.assign(url1, { fallback: done }, { document, router });
      Pjax.assign(url2, { fallback: done }, { document, router });
      Promise.race([
        once(document, 'pjax:ready'),
        delay(1000)
      ]).then(done);
    });

  });

});
