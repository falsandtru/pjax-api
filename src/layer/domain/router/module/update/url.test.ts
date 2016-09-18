import { _isRegisterable, _isReplaceable } from './url';
import { RouterEvent } from '../../../event/router';
import { canonicalizeUrl } from '../../../../data/model/canonicalization/url';
import { validateUrl } from '../../../../data/model/validation/url';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/url', () => {
  describe('_isRegisterable', () => {
    it('same location', () => {
      assert(!_isRegisterable(RouterEvent.Type.click, new RouterEvent.Location(canonicalizeUrl(validateUrl(location.href)))));
      assert(!_isRegisterable(RouterEvent.Type.submit, new RouterEvent.Location(canonicalizeUrl(validateUrl(location.href)))));
      assert(!_isRegisterable(RouterEvent.Type.popstate, new RouterEvent.Location(canonicalizeUrl(validateUrl(location.href)))));
    });

    it('click', () => {
      assert(_isRegisterable(RouterEvent.Type.click, new RouterEvent.Location(canonicalizeUrl(validateUrl(`#${Math.random()}`)))));
    });

    it('submit', () => {
      assert(_isRegisterable(RouterEvent.Type.submit, new RouterEvent.Location(canonicalizeUrl(validateUrl(`#${Math.random()}`)))));
    });

    it('popstate', () => {
      assert(!_isRegisterable(RouterEvent.Type.popstate, new RouterEvent.Location(canonicalizeUrl(validateUrl(`#${Math.random()}`)))));
    });

  });

  describe('_isReplaceable', () => {
    it('click', () => {
      assert(!_isReplaceable(RouterEvent.Type.click, DOM.a([]).raw, '.replace'));
      assert(_isReplaceable(RouterEvent.Type.click, DOM.a({ class: 'replace' }, []).raw, '.replace'));
    });

    it('submit', () => {
      assert(!_isReplaceable(RouterEvent.Type.submit, DOM.form([]).raw, '.replace'));
      assert(_isReplaceable(RouterEvent.Type.submit, DOM.form({ class: 'replace' }, []).raw, '.replace'));
    });

    it('popstate', () => {
      assert(!_isReplaceable(RouterEvent.Type.popstate, window, '.replace'));
    });

  });

});
