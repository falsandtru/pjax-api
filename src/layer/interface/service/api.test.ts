import { API } from './api';

describe('Unit: layer/interface/service/api', function () {
  describe('assign', function () {
    it('', function (done) {
      API.assign('', {}, { document, router: config => {
        assert(config.replace as string !== '*');
        done();
        return Promise.resolve();
      }});
    });

  });

  describe('replace', function () {
    it('', function (done) {
      API.replace('', {}, { document, router: config => {
        assert(config.replace as string === '*');
        done();
        return Promise.resolve();
      }});
    });

  });

});
