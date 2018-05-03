import { RouterEventMethod, RouterEventRequest, RouterEventLocation } from './router';
import { standardizeUrl } from '../../data/model/domain/url';
import { html } from 'typed-dom';

describe('Unit: layer/domain/event/router', () => {
  describe('RouterEventRequest', () => {
    it('click', () => {
      const req = new RouterEventRequest(html('a', { href: location.href }));
      assert(req.url === standardizeUrl(''));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

    it('submit get', () => {
      const req = new RouterEventRequest(html('form', { method: 'GET', action: './search' }, [
        html('input', { name: 'test', type: 'text', value: 'abc' })
      ]));
      assert(req.url === standardizeUrl('./search?test=abc'));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

    it('submit post', () => {
      const req = new RouterEventRequest(html('form', { method: 'POST', action: './send' }, [
        html('input', { name: 'test', type: 'text', value: 'abc' })
      ]));
      assert(req.url === standardizeUrl('./send'));
      assert(req.method === RouterEventMethod.POST);
      assert(req.body instanceof FormData);
    });

    it('popstate', () => {
      const req = new RouterEventRequest(window);
      assert(req.url === standardizeUrl(''));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

  });

  describe('RouterEventLocation', () => {
    it('instance', () => {
      const loc = new RouterEventLocation(standardizeUrl('#'));
      assert(loc.orig.href === standardizeUrl(location.href));
      assert(loc.dest.href === standardizeUrl(location.href + '#'));
    });

  });

});
