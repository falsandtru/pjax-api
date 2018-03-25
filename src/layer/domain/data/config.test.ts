import { Config } from './config';
import { html } from 'typed-dom';

describe('Unit: layer/domain/data/config', () => {
  describe('Config', () => {
    it('filter', () => {
      const filter = new Config({}).filter;
      assert(filter(html('a', { href: '' })));
      assert(filter(html('a', { href: '/' })));
      assert(filter(html('a', { href: '/dir' })));
      assert(filter(html('a', { href: '/dir/' })));
      assert(filter(html('a', { href: '/dir/file.html' })));
      assert(filter(html('a', { href: '?' })));
      assert(filter(html('a', { href: '#' })));
      assert(!filter(html('a', { href: '', target: '_blank' })));
    });

    it('ignore', () => {
      assert(new Config({}).update.ignore === '[href^="chrome-extension://"],[src*=".scr.kaspersky-labs.com/"]');
      assert(new Config(new Config({})).update.ignore === '[href^="chrome-extension://"],[src*=".scr.kaspersky-labs.com/"]');
      assert(new Config({ update: { ignore: 'style' } }).update.ignore === '[href^="chrome-extension://"],[src*=".scr.kaspersky-labs.com/"],style');
    });

  });

});
