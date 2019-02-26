import { API } from './api';

describe('Unit: layer/interface/service/api', function () {
  describe('assign', function () {
    it('', function () {
      assert(API.assign('', {}, { document, router: config => {
        assert(config.replace as string !== '*');
        return true;
      }}));
    });

  });

  describe('replace', function () {
    it('', function () {
      assert(API.replace('', {}, { document, router: config => {
        assert(config.replace as string === '*');
        return true;
      }}));
    });

  });

});
