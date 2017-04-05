import { Pjax } from '../../../index';
import { parse } from '../../../src/lib/html';
import { once } from '../../../src/lib/dom';

describe('Integration: Usecase', function () {
  describe('replace', function () {
    it('basic', function (done) {
      const url = '/base/test/integration/usecase/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({}, { document }).replace(url);
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary')!.textContent === 'Primary 1');
        done();
      });
    });

  });

});
