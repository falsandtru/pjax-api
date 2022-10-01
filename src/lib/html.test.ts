import { parse } from './html';

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
      assert(dom.querySelector('noscript')!.innerHTML !== '<hr>');
    });

  });

});
