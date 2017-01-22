import { focus } from './focus';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/focus', () => {
  describe('blur', () => {
    it('', () => {
      const el = DOM.input({ autofocus: '' }, []).element;
      document.body.appendChild(el);
      focus(document);
      assert(document.activeElement === el);
      el.remove();
    });

  });

});
