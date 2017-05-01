import { _isRegisterable, _isReplaceable } from './url';
import { RouterEventLocation, RouterEventType } from '../../../event/router';
import { canonicalizeUrl } from '../../../../data/model/canonicalization/url';
import { validateUrl } from '../../../../data/model/validation/url';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/url', () => {
  describe('_isRegisterable', () => {
    it('same location', () => {
      assert(!_isRegisterable(RouterEventType.click, new RouterEventLocation(canonicalizeUrl(validateUrl(location.href)))));
      assert(!_isRegisterable(RouterEventType.submit, new RouterEventLocation(canonicalizeUrl(validateUrl(location.href)))));
      assert(!_isRegisterable(RouterEventType.popstate, new RouterEventLocation(canonicalizeUrl(validateUrl(location.href)))));
    });

    it('click', () => {
      assert(_isRegisterable(RouterEventType.click, new RouterEventLocation(canonicalizeUrl(validateUrl(`#${Math.random()}`)))));
    });

    it('submit', () => {
      assert(_isRegisterable(RouterEventType.submit, new RouterEventLocation(canonicalizeUrl(validateUrl(`#${Math.random()}`)))));
    });

    it('popstate', () => {
      assert(!_isRegisterable(RouterEventType.popstate, new RouterEventLocation(canonicalizeUrl(validateUrl(`#${Math.random()}`)))));
    });

  });

  describe('_isReplaceable', () => {
    it('click', () => {
      assert(!_isReplaceable(RouterEventType.click, DOM.a([]).element, '.replace'));
      assert(_isReplaceable(RouterEventType.click, DOM.a({ class: 'replace' }, []).element, '.replace'));
    });

    it('submit', () => {
      assert(!_isReplaceable(RouterEventType.submit, DOM.form([]).element, '.replace'));
      assert(_isReplaceable(RouterEventType.submit, DOM.form({ class: 'replace' }, []).element, '.replace'));
    });

    it('popstate', () => {
      assert(!_isReplaceable(RouterEventType.popstate, window, '.replace'));
    });

  });

});
