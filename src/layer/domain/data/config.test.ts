import { Config } from './config';
import DOM from 'typed-dom';

describe('Unit: layer/domain/data/config', () => {
  describe('Config', () => {
    it('filter', () => {
      const filter = new Config({}).filter;
      assert(filter(DOM.a([], { href: '' }).raw));
      assert(filter(DOM.a([], { href: '/' }).raw));
      assert(filter(DOM.a([], { href: '/dir' }).raw));
      assert(filter(DOM.a([], { href: '/dir/' }).raw));
      assert(filter(DOM.a([], { href: '/dir/file.html' }).raw));
      assert(filter(DOM.a([], { href: '?' }).raw));
      assert(filter(DOM.a([], { href: '#' }).raw));
    });

  });

});
