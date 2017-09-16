import { URL } from './url';

describe('Unit: lib/url', () => {
  describe('URL', () => {
    const protocol = 'https:';
    //const userinfo = 'user';
    const hostname = 'example.com';
    const port = '80';
    const dir = '/dir/';
    const file = 'index.html';
    const query = '?a=1&b=2';
    const fragment = '#hash';

    const domain = protocol + '//' + hostname + ':' + port;
    assert(domain === 'https://example.com:80');

    it('domain', () => {
      assert(new URL(domain).domain === domain);
    });

    it('scheme', () => {
      assert(new URL(domain).scheme === protocol.split(':')[0]);
    });

    it('protocol', () => {
      assert(new URL(domain).protocol === protocol);
    });

    it('userinfo', () => {
      assert(new URL(domain).userinfo === '');
      //assert(new URL(protocol + '//' + userinfo + '@' + hostname + ':' + port).userinfo === userinfo);
    });

    it('host', () => {
      assert(new URL(domain).host === hostname + ':' + port);
      //assert(new URL(protocol + '//' + userinfo + '@' + hostname + ':' + port).host === hostname + ':' + port);
    });

    it('hostname', () => {
      assert(new URL(domain).hostname === hostname);
    });

    it('port', () => {
      assert(new URL(domain).port === port);
    });

    it('href', () => {
      assert(new URL(domain + dir + file).href === domain + dir + file);
      assert(new URL(domain + dir + file + query + fragment).href === domain + dir + file + query + fragment);
    });

    it('path', () => {
      assert(new URL(dir + file + query + fragment).path === dir + file + query);
    });

    it('pathname', () => {
      assert(new URL(dir + file + query + fragment).pathname === dir + file);
    });

    it('query', () => {
      assert(new URL(dir + file + query + fragment).query === query);
    });

    it('fragment', () => {
      assert(new URL(dir + file + query + fragment).fragment === fragment);
    });

  });

});
