import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { unregister } from '../../../src/layer/interface/service/gui';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Config', function () {
  afterEach(() => {
    unregister();
  });

  describe('cache', function () {
    it('', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      const pjax = new Pjax({
        fetch: {
          cache: () => '.'
        }
      }, { document, router });
      pjax.assign('/base/test/integration/fixture/basic/2.html');
      once(window, 'pjax:load', () => {
        pjax.assign(url);
        once(document, 'pjax:ready', () => {
          assert(window.location.pathname === url);
          assert(document.title === 'Title 2');
          assert(document.querySelector('#primary')!.textContent === 'Primary 2');
          done();
        });
      });
    });

  });

});
