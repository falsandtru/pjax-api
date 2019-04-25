import { RouterEventMethod, RouterEventRequest, RouterEventLocation } from './router';
import { URL, standardizeURL } from '../../../lib/url';
import { html } from 'typed-dom';

describe('Unit: layer/domain/event/router', () => {
  describe('RouterEventRequest', () => {
    it('click', () => {
      const req = new RouterEventRequest(html('a', { href: window.location.href }));
      assert(req.url.reference === standardizeURL(''));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

    it('submit get', () => {
      const req = new RouterEventRequest(html('form', { method: 'GET', action: './search' }, [
        html('input', { name: 'test', type: 'text', value: 'abc' })
      ]));
      assert(req.url.reference === standardizeURL('./search?test=abc'));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

    it('submit post', () => {
      const req = new RouterEventRequest(html('form', { method: 'POST', action: './send' }, [
        html('input', { name: 'test', type: 'text', value: 'abc' })
      ]));
      assert(req.url.reference === standardizeURL('./send'));
      assert(req.method === RouterEventMethod.POST);
      assert(req.body instanceof FormData);
    });

    it('popstate', () => {
      const req = new RouterEventRequest(window);
      assert(req.url.reference === standardizeURL(''));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

  });

  describe('RouterEventLocation', () => {
    it('instance', () => {
      const loc = new RouterEventLocation(new URL(standardizeURL('#')));
      assert(loc.orig.reference === standardizeURL(window.location.href));
      assert(loc.dest.reference === standardizeURL(window.location.href + '#'));
    });

  });

});
