import { Pjax } from 'pjax-api';
import DOM from 'typed-dom';
import { once } from '../../../src/lib/dom';

describe('Integration: Usecase', function () {
  describe('submit', function () {
    it('get', function (done) {
      const url = '/base/test/integration/usecase/fixture/basic/1.html';
      new Pjax({}, { document });
      once(document, 'pjax:ready', () => {
        assert(decodeURIComponent(window.location.search) === '?query=あアｱ亜=&');
        done();
      });
      const form = DOM.form({ action: url }, [
        DOM.input({ type: 'search', name: 'query', value: 'あアｱ亜=&' }, []),
        DOM.input({ type: 'submit', value: 'submit' }, [])
      ]).element;
      document.body.appendChild(form);
      (<HTMLElement>form.querySelector('input[type="submit"]')).click();
    });

  });

});
