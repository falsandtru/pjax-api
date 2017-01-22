import { blur } from './blur';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/blur', () => {
  describe('blur', () => {
    it('', () => {
      const el = DOM.input().element;
      document.body.appendChild(el);
      el.focus();
      assert(document.activeElement === el);
      blur(document);
      assert(document.activeElement === document.body);
      el.remove();
    });

  });

});
