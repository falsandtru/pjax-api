import { Pjax } from 'pjax-api';
import { parse } from '../../../src/layer/application/api';
import { once } from '../../../src/lib/dom';

describe('Integration: Usecase', function () {
  describe('assign', function () {
    it('basic', function (done) {
      const url = '/base/test/integration/usecase/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({}, { document }).assign(url);
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary').textContent === 'Primary 1');
        done();
      });
    });

  });

});
