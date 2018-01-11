import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Config', function () {
  describe('redirect', function () {
    it('', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({
        redirect: path => path.replace('/1.html', '/2.html') 
      }, { document, router })
        .assign(url);
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 2');
        assert(document.querySelector('#primary')!.textContent === 'Primary 2');
        done();
      });
    });

  });

});
