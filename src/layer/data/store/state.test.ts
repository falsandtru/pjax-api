import { loadTitle, saveTitle, loadPosition, savePosition } from './state';

describe('Unit: layer/data/store/state', function () {
  describe('loadTitle', function () {
    it("", function () {
      window.history.replaceState(null, document.title);
      assert(loadTitle() === document.title);
    });

  });

  describe('saveTitle', function () {
    it("Don't mutate cross-origin objects: #44", function () {
      window.history.replaceState({}, document.title);
      Object.freeze(window.history.state);
      saveTitle();
    });

  });

  describe('loadPosition', function () {
    it("", function () {
      window.history.replaceState(null, document.title);
      assert.deepStrictEqual(loadPosition(), {
        top: window.pageYOffset,
        left: window.pageXOffset,
      });
    });

  });

  describe('savePosition', function () {
    it("Don't mutate cross-origin objects: #44", function () {
      window.history.replaceState({}, document.title);
      Object.freeze(window.history.state);
      savePosition();
    });

  });

});
