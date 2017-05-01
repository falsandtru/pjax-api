import { RouterEventMethod, RouterEventRequest, RouterEventLocation } from './router';
import { canonicalizeUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import DOM from 'typed-dom';

describe('Unit: layer/domain/event/router', () => {
  describe('RouterEventRequest', () => {
    it('click', () => {
      const req = new RouterEventRequest(DOM.a({ href: location.href }, []).element, 'click');
      assert(req.url === canonicalizeUrl(validateUrl('')));
      assert(req.method === RouterEventMethod.GET);
      assert(req.data === null);
    });

    it('submit get', () => {
      const req = new RouterEventRequest(DOM.form({ method: 'GET', action: './search' }, [
        DOM.input({ name: 'test', type: 'text', value: 'abc' }, [])
      ]).element, 'submit');
      assert(req.url === canonicalizeUrl(validateUrl('./search?test=abc')));
      assert(req.method === RouterEventMethod.GET);
      assert(req.data === null);
    });

    it('submit post', () => {
      const req = new RouterEventRequest(DOM.form({ method: 'POST', action: './send' }, [
        DOM.input({ name: 'test', type: 'text', value: 'abc' }, [])
      ]).element, 'submit');
      assert(req.url === canonicalizeUrl(validateUrl('./send')));
      assert(req.method === RouterEventMethod.POST);
      assert(req.data instanceof FormData);
    });

    it('popstate', () => {
      const req = new RouterEventRequest(window, 'popstate');
      assert(req.url === canonicalizeUrl(validateUrl('')));
      assert(req.method === RouterEventMethod.GET);
      assert(req.data === null);
    });

  });

  describe('RouterEventLocation', () => {
    it('instance', () => {
      const loc = new RouterEventLocation(canonicalizeUrl(validateUrl('#')));
      assert(loc.orig.href === canonicalizeUrl(validateUrl(location.href)));
      assert(loc.dest.href === canonicalizeUrl(validateUrl(location.href + '#')));
    });

  });

});
