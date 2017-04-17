import { Url } from './url';

describe('Unit: lib/url', () => {
  describe('Url', () => {
    const protocol = 'https:';
    const hostname = 'example.com';
    const port = '80';
    const dir = '/dir/';
    const file = 'index.html';
    const query = '?a=1&b=2';
    const hash = '#hash';

    const domain = protocol + '//' + hostname + ':' + port;

    it('protocol', () => {
      assert(new Url(domain).protocol === protocol);
    });

    it('hostname', () => {
      assert(new Url(domain).hostname === hostname);
    });

    it('port', () => {
      assert(new Url(domain).port === port);
    });

    it('domain', () => {
      assert(new Url(domain).domain === domain);
    });

    it('host', () => {
      assert(new Url(domain).host === hostname + ':' + port);
    });

    it('dir', () => {
      assert(new Url(dir).dir === dir);
    });

    it('file', () => {
      assert(new Url(dir + file).file === file);
    });

    it('pathname', () => {
      assert(new Url(dir + file + query + hash).pathname === dir + file);
    });

    it('query', () => {
      assert(new Url(dir + file + query + hash).query === query);
    });

    it('path', () => {
      assert(new Url(dir + file + query + hash).path === dir + file + query);
    });

    it('hash', () => {
      assert(new Url(dir + file + query + hash).hash === hash);
    });

    it('href', () => {
      assert(new Url(domain + dir + file + query + hash).href === domain + dir + file + query + hash);
    });

  });

});
