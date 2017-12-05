import { focus } from './focus';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/focus', () => {
  describe('focus', () => {
    it('click', () => {
      const el = DOM.input({ autofocus: '' }, []).element;
      document.body.appendChild(el);
      focus('click', document);
      assert(document.activeElement === el);
      el.remove();
    });

    it('submit', () => {
      const el = DOM.input({ autofocus: '' }, []).element;
      document.body.appendChild(el);
      focus('submit', document);
      assert(document.activeElement === el);
      el.remove();
    });

    it('popstate', () => {
      const el = DOM.input({ autofocus: '' }, []).element;
      document.body.appendChild(el);
      focus('popstate', document);
      assert(document.activeElement !== el);
      el.remove();
    });

  });

});
