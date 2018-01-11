import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Usecase', function () {
  describe('multibyte', function () {
    it('basic', function (done) {
      const url = '/base/test/integration/fixture/multibyte/あアｱ亜.html';
      const document = parse('').extract();
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', () => {
        assert(decodeURIComponent(window.location.pathname) === url);
        assert(decodeURIComponent(document.title) === 'Title あアｱ亜');
        assert(decodeURIComponent(document.querySelector('#primary')!.textContent!) === 'Primary あアｱ亜');
        done();
      });
      const a = document.createElement('a');
      a.href = url;
      document.body.appendChild(a);
      a.click();
    });

  });

});
