import { URL } from './url';

describe('Unit: lib/url', () => {
  describe('URL', () => {
    const protocol = 'https:';
    const hostname = 'example.com';
    const dir = '/dir/';
    const file = 'index.html';
    const query = '?a=1&b=2';
    const fragment = '#?hash';

    const domain = protocol + '//' + hostname;
    assert(domain === 'https://example.com');

    it('relative', () => {
      assert(new URL('').reference === window.location.href);
    });

    it('trim', () => {
      assert(new URL(' ').reference === window.location.href);
    });

    it('origin', () => {
      assert(new URL(domain).origin === domain);
      assert(new URL(domain + ':80').origin === domain + ':80');
      assert(new URL(domain + ':443').origin === domain + '');
    });

    it('scheme', () => {
      assert(new URL(domain).scheme === protocol.split(':')[0]);
    });

    it('protocol', () => {
      assert(new URL(domain).protocol === protocol);
    });

    it('host', () => {
      assert(new URL(domain).host === hostname);
      assert(new URL(domain + ':80').host === hostname + ':80');
      assert(new URL(domain + ':443').host === hostname + '');
    });

    it('hostname', () => {
      assert(new URL(domain).hostname === hostname);
      assert(new URL(domain + ':80').hostname === hostname);
      assert(new URL(domain + ':443').hostname === hostname);
    });

    it('port', () => {
      assert(new URL(domain).port === '');
      assert(new URL(domain + ':80').port === '80');
      assert(new URL(domain + ':443').port === '');
    });

    it('reference', () => {
      assert(new URL(domain + dir + file).reference === domain + dir + file);
      assert(new URL(domain + dir + file + query + fragment).reference === domain + dir + file + query + fragment);
    });

    it('resource', () => {
      assert(new URL(domain + dir + file).resource === domain + dir + file);
      assert(new URL(domain + dir + file + query + fragment).resource === domain + dir + file + query);
      assert(new URL(domain + dir + file + '?').resource === domain + dir + file);
      assert(new URL(domain + dir + file + '/').resource === domain + dir + file);
      assert(new URL(domain + '/' + query).resource === domain + query);
      assert(new URL(domain + '/?').resource === domain);
    });

    it('path', () => {
      assert(new URL(dir + file + query + fragment).path === dir + file + query);
      assert(new URL(domain).path === '/');
      assert(new URL('/').path === '/');
    });

    it('pathname', () => {
      assert(new URL(dir + file + query + fragment).pathname === dir + file);
      assert(new URL(domain).pathname === '/');
      assert(new URL('/').pathname === '/');
    });

    it('query', () => {
      assert(new URL(dir + file + query + fragment).query === query);
      assert(new URL('').query === '');
      assert(new URL('?').query === '?');
      assert(new URL('??').query === '??');
    });

    it('fragment', () => {
      assert(new URL(dir + file + query + fragment).fragment === fragment);
      assert(new URL('').fragment === '');
      assert(new URL('#').fragment === '#');
      assert(new URL('##').fragment === '##');
    });

  });

});
