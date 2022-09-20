import { Config } from './config';
import { html } from 'typed-dom';

describe('Unit: layer/domain/data/config', () => {
  describe('Config', () => {
    it('link', () => {
      const config = new Config({});
      assert(html('a', { href: '' }).matches(config.link));
      assert(html('a', { href: '/' }).matches(config.link));
      assert(html('a', { href: '/dir' }).matches(config.link));
      assert(html('a', { href: '/dir/' }).matches(config.link));
      assert(html('a', { href: '/dir/file.html' }).matches(config.link));
      assert(html('a', { href: '?' }).matches(config.link));
      assert(html('a', { href: '#' }).matches(config.link));
      assert(!html('a', { href: '', target: '_blank' }).matches(config.link));
    });

    it('ignore', () => {
      assert(new Config({}).update.ignore === '[href^="chrome-extension://"],[src*=".scr.kaspersky-labs.com/"]');
      assert(new Config(new Config({})).update.ignore === '[href^="chrome-extension://"],[src*=".scr.kaspersky-labs.com/"]');
      assert(new Config({ update: { ignore: 'style' } }).update.ignore === '[href^="chrome-extension://"],[src*=".scr.kaspersky-labs.com/"],style');
    });

  });

});
