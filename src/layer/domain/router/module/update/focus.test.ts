import { focus } from './focus';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/focus', () => {
  describe('focus', () => {
    it('click', () => {
      const el = html('input', { autofocus: '' });
      document.body.appendChild(el);
      focus('click', document);
      assert(document.activeElement === el);
      el.remove();
    });

    it('submit', () => {
      const el = html('input', { autofocus: '' });
      document.body.appendChild(el);
      focus('submit', document);
      assert(document.activeElement === el);
      el.remove();
    });

    it('popstate', () => {
      const el = html('input', { autofocus: '' });
      document.body.appendChild(el);
      focus('popstate', document);
      assert(document.activeElement !== el);
      el.remove();
    });

  });

});
