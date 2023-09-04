import Pjax$, { Pjax, FakeXMLHttpRequest } from '../../index';

describe('Interface: Package', function () {
  describe('default', function () {
    it('default', function () {
      assert(Pjax$ === Pjax);
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

  describe('FakeXMLHttpRequest', function () {
    assert(typeof FakeXMLHttpRequest === 'function');
  });

});
