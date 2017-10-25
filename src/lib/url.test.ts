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

    const origin = protocol + '//' + hostname + ':' + port;
    const domain = protocol + '//' + hostname;
    assert(origin === 'https://example.com:80');

    it('origin', () => {
      assert(new URL(origin).origin === origin);
    });

    it('domain', () => {
      assert(new URL(origin).domain === domain);
    });

    it('scheme', () => {
      assert(new URL(origin).scheme === protocol.split(':')[0]);
    });

    it('protocol', () => {
      assert(new URL(origin).protocol === protocol);
    });

    it('userinfo', () => {
      assert(new URL(origin).userinfo === '');
      //assert(new URL(protocol + '//' + userinfo + '@' + hostname + ':' + port).userinfo === userinfo);
    });

    it('host', () => {
      assert(new URL(origin).host === hostname + ':' + port);
      //assert(new URL(protocol + '//' + userinfo + '@' + hostname + ':' + port).host === hostname + ':' + port);
    });

    it('hostname', () => {
      assert(new URL(origin).hostname === hostname);
    });

    it('port', () => {
      assert(new URL(origin).port === port);
    });

    it('href', () => {
      assert(new URL(origin + dir + file).href === origin + dir + file);
      assert(new URL(origin + dir + file + query + fragment).href === origin + dir + file + query + fragment);
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
      assert(new URL('').fragment === '');
      assert(new URL('#').fragment === '#');
      assert(new URL('##').fragment === '##');
    });

  });

});
