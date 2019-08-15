import { serialize } from './dom';
import { html } from 'typed-dom';

describe('Unit: lib/dom', () => {
  describe('find', () => {
    it('children', () => {
      assert(html('div', [html('p')]).querySelectorAll('p').length === 1);
      assert(html('div', [html('p')]).querySelector('p'));
    });

  });

  describe('serialize', () => {
    it('form', () => {
      const query = serialize(html('form', [
        html('input', { name: 'check', type: 'checkbox', checked: '' }),
        html('input', { name: 'text', type: 'text', value: '1' }),
        html('input', { name: 'hidden', type: 'hidden', value: '0' }),
        html('input', { name: 'empty', type: 'hidden' }),
        html('input', { name: 'whitespace', type: 'hidden', value: ' ' }),
        html('input', { name: 'invalid', type: 'hidden', value: '\uD800\uD800\uDC00\uDC00' }),
        html('input', { name: 'button', type: 'submit', value: 'submit' })
      ]));
      assert(query === 'check=on&text=1&hidden=0&empty=&whitespace=%20&invalid=%F0%90%80%80');
    });

  });

});
