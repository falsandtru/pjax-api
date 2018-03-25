import { blur } from './blur';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/blur', () => {
  describe('blur', () => {
    it('', () => {
      const el = html('input');
      document.body.appendChild(el);
      el.focus();
      assert(document.activeElement === el);
      blur(document);
      assert(document.activeElement === document.body);
      el.remove();
    });

  });

});
