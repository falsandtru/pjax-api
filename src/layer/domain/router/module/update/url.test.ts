import { _isRegisterable, _isReplaceable } from './url';
import { RouterEventLocation, RouterEventType } from '../../../event/router';
import { standardizeUrl } from '../../../../data/model/domain/url';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/url', () => {
  describe('_isRegisterable', () => {
    it('same location', () => {
      assert(!_isRegisterable(RouterEventType.click, new RouterEventLocation(standardizeUrl(location.href))));
      assert(!_isRegisterable(RouterEventType.submit, new RouterEventLocation(standardizeUrl(location.href))));
      assert(!_isRegisterable(RouterEventType.popstate, new RouterEventLocation(standardizeUrl(location.href))));
    });

    it('click', () => {
      assert(_isRegisterable(RouterEventType.click, new RouterEventLocation(standardizeUrl(`#${Math.random()}`))));
    });

    it('submit', () => {
      assert(_isRegisterable(RouterEventType.submit, new RouterEventLocation(standardizeUrl(`#${Math.random()}`))));
    });

    it('popstate', () => {
      assert(!_isRegisterable(RouterEventType.popstate, new RouterEventLocation(standardizeUrl(`#${Math.random()}`))));
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
