import { parse, _fixNoscript as fixNoscript } from './html';
import { find } from './dom';
import { html } from 'typed-dom';

describe('Unit: lib/html', () => {
  describe('parse', () => {
    it('html', () => {
      assert(parse('<title>').extract() instanceof Document);
      assert(parse('<title>').extract() !== document);
    });

    it('title', () => {
      assert(parse('<title>&amp;</title>').extract().title === '&');
    });

    it('noscript', () => {
      const dom = parse('<noscript><hr></noscript>').extract();
      assert(find(dom, 'noscript')[0].innerHTML !== '<hr>');
    });

  });

  describe('_fixNoscript', () => {
    it('', () => {
      const el = html('noscript', [html('hr')]);
      document.body.appendChild(el);
      const texts = fixNoscript(el.ownerDocument)
        .map(([, {textContent}]) => textContent);
      assert.deepStrictEqual(texts, ['<hr>']);
      el.remove();
    });

  });

});
