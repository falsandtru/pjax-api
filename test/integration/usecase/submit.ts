import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import DOM, { once } from 'typed-dom';

describe('Integration: Usecase', function () {
  describe('submit', function () {
    it('get', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', () => {
        assert(decodeURIComponent(window.location.search) === '?query=あアｱ亜=&');
        done();
      });
      const form = DOM.form({ action: url }, [
        DOM.input({ type: 'submit', value: 'submit' }),
        DOM.input({ type: 'search', name: 'query', value: 'あアｱ亜=&' }),
      ]).element;
      document.body.appendChild(form);
      form.querySelector('input')!.click();
    });

    it('failure', function (done) {
      const url = '404';
      new Pjax({
        fallback(target) {
          assert(target === form);
          assert(window.history.scrollRestoration === 'auto');
          done();
        }
      }, { document, router });
      const form = DOM.form({ action: url }, [
        DOM.input({ type: 'submit', value: 'submit' }),
        DOM.input({ type: 'search', name: 'query', value: 'あアｱ亜=&' }),
      ]).element;
      document.body.appendChild(form);
      form.querySelector('input')!.click();
    });

  });

});
