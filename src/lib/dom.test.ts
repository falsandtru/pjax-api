import { find, serialize } from './dom';
import DOM from 'typed-dom';

describe('Unit: lib/dom', () => {
  describe('find', () => {
    it('children', () => {
      assert(find(DOM.div([DOM.p()]).element, 'p').length === 1);
      assert(find(DOM.div([DOM.p()]).element, 'p')[0].matches('p'));
    });

  });

  describe('serialize', () => {
    it('form', () => {
      const query = serialize(DOM.form([
        DOM.input({ name: 'check', type: 'checkbox', checked: '' }, []),
        DOM.input({ name: 'text', type: 'text', value: '1' }, []),
        DOM.input({ name: 'hidden', type: 'hidden', value: '0' }, []),
        DOM.input({ name: 'empty', type: 'hidden' }, []),
        DOM.input({ name: 'whitespace', type: 'hidden', value: ' ' }, []),
        DOM.input({ name: 'invalid', type: 'hidden', value: '\uD800\uD800\uDC00\uDC00' }, []),
        DOM.input({ name: 'button', type: 'submit', value: 'submit' }, [])
      ]).element);
      assert(query === 'check=on&text=1&hidden=0&empty=&whitespace=%20&invalid=%F0%90%80%80');
    });

  });

});
