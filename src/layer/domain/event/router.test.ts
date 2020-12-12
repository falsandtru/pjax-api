import { RouterEventMethod, RouterEventRequest, RouterEventLocation } from './router';
import { URL, standardize } from 'spica/url';
import { html } from 'typed-dom';

describe('Unit: layer/domain/event/router', () => {
  describe('RouterEventRequest', () => {
    it('click', () => {
      const req = new RouterEventRequest(html('a', { href: window.location.href }));
      assert(req.url.href === standardize(''));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

    it('submit get', () => {
      const req = new RouterEventRequest(html('form', { method: 'GET', action: './search' }, [
        html('input', { name: 'test', type: 'text', value: 'abc' })
      ]));
      assert(req.url.href === standardize('./search?test=abc'));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

    it('submit post', () => {
      const req = new RouterEventRequest(html('form', { method: 'POST', action: './send' }, [
        html('input', { name: 'test', type: 'text', value: 'abc' })
      ]));
      assert(req.url.href === standardize('./send'));
      assert(req.method === RouterEventMethod.POST);
      assert(req.body instanceof FormData);
    });

    it('popstate', () => {
      const req = new RouterEventRequest(window);
      assert(req.url.href === standardize(''));
      assert(req.method === RouterEventMethod.GET);
      assert(req.body === null);
    });

  });

  describe('RouterEventLocation', () => {
    it('instance', () => {
      const loc = new RouterEventLocation(new URL(standardize('#')));
      assert(loc.orig.href === standardize(window.location.href));
      assert(loc.dest.href === standardize(window.location.href + '#'));
    });

  });

});
