import { Pjax } from 'pjax-api';
import { parse } from '../../src/layer/application/api';
import { once } from '../../src/lib/dom';

describe('Integration: Package', function () {
  describe('state', function () {
    it('scrollRestoration', function () {
      assert(window.history.scrollRestoration === 'manual');
    });

  });

  describe('event', function () {
    it('sequence', function (done) {
      const document = parse('').extract();
      new Pjax({}, { document }).assign('/base/test/integration/usecase/fixture/basic/1.html');
      let cnt = 0;
      once(window, 'pjax:fetch', () => assert(++cnt === 1));
      once(window, 'pjax:unload', () => assert(++cnt === 2));
      once(document, 'pjax:ready', () => assert(++cnt === 3));
      once(window, 'pjax:load', () => assert(++cnt === 4) || done());
    });

  });

});
