import { parse, _fixNoscript } from './html';
import DOM from 'typed-dom';
import { find } from '../../../../../lib/dom';

describe('Unit: layer/domain/router/module/fetch/html', () => {
  describe('parse', () => {
    it('html', () => {
      assert(parse('<title>').extract() instanceof Document);
      assert(parse('<title>').extract() !== document);
    });

    it('noscript', () => {
      const dom = parse('<noscript><hr></noscript>').extract();
      assert(find(dom, 'noscript')[0].innerHTML !== '<hr>');
    });

  });

  describe('_fixNoscript', () => {
    it('', () => {
      const el = DOM.noscript([DOM.hr()]).element;
      document.body.appendChild(el);
      const texts = _fixNoscript(el.ownerDocument)
        .map(([, {textContent}]) => textContent);
      assert.deepStrictEqual(texts, ['<hr>']);
      el.remove();
    });

  });

});
