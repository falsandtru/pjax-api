import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { html, once } from 'typed-dom';

describe('Integration: Usecase', function () {
  describe('submit', function () {
    it('get', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      new Pjax({}, { document, router });
      once(document, 'pjax:ready', () => {
        assert(decodeURIComponent(window.location.search) === '?query=あアｱ亜=&');
        done();
      });
      const form = html('form', { action: url }, [
        html('input', { type: 'submit', value: 'submit' }),
        html('input', { type: 'search', name: 'query', value: 'あアｱ亜=&' }),
      ]);
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
      const form = html('form', { action: url }, [
        html('input', { type: 'submit', value: 'submit' }),
        html('input', { type: 'search', name: 'query', value: 'あアｱ亜=&' }),
      ]);
      document.body.appendChild(form);
      form.querySelector('input')!.click();
    });

  });

});
