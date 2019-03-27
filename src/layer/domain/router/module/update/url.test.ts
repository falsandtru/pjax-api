import { _isRegisterable as isRegisterable, _isReplaceable as isReplaceable } from './url';
import { RouterEventLocation, RouterEventType } from '../../../event/router';
import { URL } from '../../../../../lib/url';
import { standardizeUrl } from '../../../../data/model/domain/url';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/url', () => {
  describe('isRegisterable', () => {
    it('same location', () => {
      assert(!isRegisterable(RouterEventType.click, new RouterEventLocation(new URL(standardizeUrl(location.href)).href)));
      assert(!isRegisterable(RouterEventType.submit, new RouterEventLocation(new URL(standardizeUrl(location.href)).href)));
      assert(!isRegisterable(RouterEventType.popstate, new RouterEventLocation(new URL(standardizeUrl(location.href)).href)));
    });

    it('click', () => {
      assert(isRegisterable(RouterEventType.click, new RouterEventLocation(new URL(standardizeUrl(`#${Math.random()}`)).href)));
    });

    it('submit', () => {
      assert(isRegisterable(RouterEventType.submit, new RouterEventLocation(new URL(standardizeUrl(`#${Math.random()}`)).href)));
    });

    it('popstate', () => {
      assert(!isRegisterable(RouterEventType.popstate, new RouterEventLocation(new URL(standardizeUrl(`#${Math.random()}`)).href)));
    });

  });

  describe('isReplaceable', () => {
    it('click', () => {
      assert(!isReplaceable(RouterEventType.click, html('a'), '.replace'));
      assert(isReplaceable(RouterEventType.click, html('a', { class: 'replace' }), '.replace'));
    });

    it('submit', () => {
      assert(!isReplaceable(RouterEventType.submit, html('form'), '.replace'));
      assert(isReplaceable(RouterEventType.submit, html('form', { class: 'replace' }), '.replace'));
    });

    it('popstate', () => {
      assert(!isReplaceable(RouterEventType.popstate, window, '.replace'));
    });

  });

});
