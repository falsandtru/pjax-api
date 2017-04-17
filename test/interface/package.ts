import _Pjax, { Pjax, router } from '../../index';

describe('Interface: Package', function () {
  describe('default', function () {
    it('default', function () {
      assert(_Pjax === Pjax);
    });

  });

  describe('Pjax', function () {
    it('assign', function () {
      assert(typeof Pjax.assign === 'function');
    });

    it('replace', function () {
      assert(typeof Pjax.replace === 'function');
    });

  });

  describe('router', function () {
    it('router', function () {
      assert(typeof router === 'function');
    });

  });

});
