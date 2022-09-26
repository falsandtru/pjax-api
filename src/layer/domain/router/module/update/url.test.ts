import { _isRegisterable as isRegisterable, _isReplaceable as isReplaceable } from './url';
import { RouterEventLocation, RouterEventType } from '../../../event/router';
import { URL, standardize } from 'spica/url';
import { html } from 'typed-dom';

describe('Unit: layer/domain/router/module/update/url', () => {
  describe('isRegisterable', () => {
    it('same location', () => {
      assert(!isRegisterable(RouterEventType.Click, new RouterEventLocation(new URL(standardize(window.location.href)), new URL(standardize(window.location.href)))));
      assert(!isRegisterable(RouterEventType.Submit, new RouterEventLocation(new URL(standardize(window.location.href)), new URL(standardize(window.location.href)))));
      assert(!isRegisterable(RouterEventType.Popstate, new RouterEventLocation(new URL(standardize(window.location.href)), new URL(standardize(window.location.href)))));
    });

    it('click', () => {
      assert(isRegisterable(RouterEventType.Click, new RouterEventLocation(new URL(standardize(window.location.href)), new URL(standardize(`#${Math.random()}`, window.location.href)))));
    });

    it('submit', () => {
      assert(isRegisterable(RouterEventType.Submit, new RouterEventLocation(new URL(standardize(window.location.href)), new URL(standardize(`#${Math.random()}`, window.location.href)))));
    });

    it('popstate', () => {
      assert(!isRegisterable(RouterEventType.Popstate, new RouterEventLocation(new URL(standardize(window.location.href)), new URL(standardize(`#${Math.random()}`, window.location.href)))));
    });

  });

  describe('isReplaceable', () => {
    it('click', () => {
      assert(!isReplaceable(RouterEventType.Click, html('a'), '.replace'));
      assert(isReplaceable(RouterEventType.Click, html('a', { class: 'replace' }), '.replace'));
    });

    it('submit', () => {
      assert(!isReplaceable(RouterEventType.Submit, html('form'), '.replace'));
      assert(isReplaceable(RouterEventType.Submit, html('form', { class: 'replace' }), '.replace'));
    });

    it('popstate', () => {
      assert(!isReplaceable(RouterEventType.Popstate, window, '.replace'));
    });

  });

});
