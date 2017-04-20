import {
  parse,
  find,
  serialize,
  bind,
  delegate,
  once
} from './dom';
import DOM from 'typed-dom';

describe('Unit: lib/dom', () => {
  describe('parse', () => {
    it('text', () => {
      assert(parse('&amp;').innerHTML === '&amp;');
      assert(parse('&amp;').textContent === '&');
    });

    it('element', () => {
      assert(parse('<hr>').outerHTML === '<hr>');
    });

  });

  describe('find', () => {
    it('children', () => {
      assert(find(DOM.div([DOM.p()]).element, 'p').length === 1);
      assert(find(DOM.div([DOM.p()]).element, 'p')[0].matches('p'));
    });

  });

  describe('bind', () => {
    it('click', done => {
      const a = DOM.a().element;
      bind(a, 'click', ev => {
        assert(ev instanceof Event);
        bind(a, 'click', () => done());
      });
      document.createDocumentFragment().appendChild(a);
      a.click();
      a.click();
    });

  });

  describe('delegate', () => {
    it('click', done => {
      const dom = DOM.div([DOM.a()]);
      delegate(dom.element, 'a', 'click', ev => {
        assert(ev instanceof Event);
        delegate(dom.element, 'a', 'click', () => done());
      });
      document.createDocumentFragment().appendChild(dom.element);
      dom.children = [DOM.a()];
      dom.children[0].element.click();
      dom.children = [DOM.a()];
      dom.children[0].element.click();
    });

  });

  describe('once', () => {
    it('click', done => {
      const a = DOM.a().element;
      let cnt = 0;
      once(a, 'click', ev => {
        assert(ev instanceof Event);
        assert(++cnt === 1);
        once(a, 'click', () => assert(++cnt === 2) || done());
      });
      document.createDocumentFragment().appendChild(a);
      a.click();
      a.click();
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
