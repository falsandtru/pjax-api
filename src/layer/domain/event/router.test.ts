import { RouterEvent } from './router';
import { canonicalizeUrl } from '../../data/model/canonicalization/url';
import { validateUrl } from '../../data/model/validation/url';
import DOM from 'typed-dom';

describe('Unit: layer/domain/event/router', () => {
  describe('RouterEvent.Request', () => {
    it('click', () => {
      const req = new RouterEvent.Request(DOM.a({ href: location.href }, []).element, 'click');
      assert(req.url === canonicalizeUrl(validateUrl('')));
      assert(req.method === RouterEvent.Method.GET);
      assert(req.data === null);
    });

    it('submit get', () => {
      const req = new RouterEvent.Request(DOM.form({ method: 'GET', action: './search' }, [
        DOM.input({ name: 'test', type: 'text', value: 'abc' }, [])
      ]).element, 'submit');
      assert(req.url === canonicalizeUrl(validateUrl('./search?test=abc')));
      assert(req.method === RouterEvent.Method.GET);
      assert(req.data === null);
    });

    it('submit post', () => {
      const req = new RouterEvent.Request(DOM.form({ method: 'POST', action: './send' }, [
        DOM.input({ name: 'test', type: 'text', value: 'abc' }, [])
      ]).element, 'submit');
      assert(req.url === canonicalizeUrl(validateUrl('./send')));
      assert(req.method === RouterEvent.Method.POST);
      assert(req.data instanceof FormData);
    });

    it('popstate', () => {
      const req = new RouterEvent.Request(window, 'popstate');
      assert(req.url === canonicalizeUrl(validateUrl('')));
      assert(req.method === RouterEvent.Method.GET);
      assert(req.data === null);
    });

  });

  describe('RouterEvent.Location', () => {
    it('instance', () => {
      const loc = new RouterEvent.Location(canonicalizeUrl(validateUrl('#')));
      assert(loc.orig.href === canonicalizeUrl(validateUrl(location.href)));
      assert(loc.dest.href === canonicalizeUrl(validateUrl(location.href + '#')));
    });

  });

});
