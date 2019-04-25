import { URL, StandardURL, standardize } from './url';

describe('Unit: lib/url', () => {
  describe('URL', () => {
    const protocol = 'https:';
    const hostname = 'example.com';
    const dir = '/dir/';
    const file = 'index.html';
    const query = '?a=1&b=2';
    const fragment = '#?hash';

    const origin = protocol + '//' + hostname;
    assert(origin === 'https://example.com');

    it('relative', () => {
      assert(new URL('').reference === window.location.href);
    });

    it('trim', () => {
      assert(new URL(' ').reference === window.location.href);
    });

    it('origin', () => {
      assert(new URL(origin).origin === origin);
      assert(new URL(origin + ':80').origin === origin + ':80');
      assert(new URL(origin + ':443').origin === origin + '');
    });

    it('scheme', () => {
      assert(new URL(origin).scheme === protocol.split(':')[0]);
    });

    it('protocol', () => {
      assert(new URL(origin).protocol === protocol);
    });

    it('host', () => {
      assert(new URL(origin).host === hostname);
      assert(new URL(origin + ':80').host === hostname + ':80');
      assert(new URL(origin + ':443').host === hostname + '');
    });

    it('hostname', () => {
      assert(new URL(origin).hostname === hostname);
      assert(new URL(origin + ':80').hostname === hostname);
      assert(new URL(origin + ':443').hostname === hostname);
    });

    it('port', () => {
      assert(new URL(origin).port === '');
      assert(new URL(origin + ':80').port === '80');
      assert(new URL(origin + ':443').port === '');
    });

    it('reference', () => {
      assert(new URL(origin + dir + file).reference === origin + dir + file);
      assert(new URL(origin + dir + file + query + fragment).reference === origin + dir + file + query + fragment);
    });

    it('resource', () => {
      assert(new URL(origin + dir + file).resource === origin + dir + file);
      assert(new URL(origin + dir + file + query + fragment).resource === origin + dir + file + query);
      assert(new URL(origin + dir + file + '?').resource === origin + dir + file);
      assert(new URL(origin + dir + file + '/').resource === origin + dir + file);
      assert(new URL(origin + '/' + query).resource === origin + query);
      assert(new URL(origin + '/?').resource === origin);
    });

    it('path', () => {
      assert(new URL(dir + file + query + fragment).path === dir + file + query);
      assert(new URL(origin).path === '/');
      assert(new URL('/').path === '/');
    });

    it('pathname', () => {
      assert(new URL(dir + file + query + fragment).pathname === dir + file);
      assert(new URL(origin).pathname === '/');
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

    it('standard', () => {
      assert((): URL<StandardURL> => new URL(standardize('')));
      //assert((): URL<StandardURL> => new URL(standardizeURL('')));
      assert((): URL<StandardURL> => new URL<StandardURL>(standardize('')));
      assert((): URL<StandardURL> => new URL(new URL(standardize('')).reference));
      assert((): URL<StandardURL> => new URL(new URL(standardize('')).path));
    });

  });

});
