import { Url } from './url';

describe('Unit: lib/url', () => {
  describe('Url', () => {
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
      assert(new Url(domain).domain === domain);
    });

    it('scheme', () => {
      assert(new Url(domain).scheme === protocol.split(':')[0]);
    });

    it('protocol', () => {
      assert(new Url(domain).protocol === protocol);
    });

    it('userinfo', () => {
      assert(new Url(domain).userinfo === '');
      //assert(new Url(protocol + '//' + userinfo + '@' + hostname + ':' + port).userinfo === userinfo);
    });

    it('host', () => {
      assert(new Url(domain).host === hostname + ':' + port);
      //assert(new Url(protocol + '//' + userinfo + '@' + hostname + ':' + port).host === hostname + ':' + port);
    });

    it('hostname', () => {
      assert(new Url(domain).hostname === hostname);
    });

    it('port', () => {
      assert(new Url(domain).port === port);
    });

    it('href', () => {
      assert(new Url(domain + dir + file).href === domain + dir + file);
      assert(new Url(domain + dir + file + query + fragment).href === domain + dir + file + query + fragment);
    });

    it('path', () => {
      assert(new Url(dir + file + query + fragment).path === dir + file + query);
    });

    it('pathname', () => {
      assert(new Url(dir + file + query + fragment).pathname === dir + file);
    });

    it('query', () => {
      assert(new Url(dir + file + query + fragment).query === query);
    });

    it('fragment', () => {
      assert(new Url(dir + file + query + fragment).fragment === fragment);
    });

  });

});
