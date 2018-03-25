import { GUI } from './gui';
import { API } from './api';
import { parse } from '../../../lib/html';
import { html, delegate, once } from 'typed-dom';

describe('Unit: layer/interface/service/gui', function () {
  describe('assign', function () {
    it('', function (done) {
      assert(GUI.assign === API.assign);
      new GUI({}, { document, router: config => {
        assert(config.replace as string !== '*');
        done();
        return Promise.resolve();
      }})
        .assign('');
    });

  });

  describe('replace', function () {
    it('', function (done) {
      assert(GUI.replace === API.replace);
      new GUI({}, { document, router: config => {
        assert(config.replace as string === '*');
        done();
        return Promise.resolve();
      }})
        .replace('');
    });

  });

  describe('click', function () {
    it('', function (done) {
      const document = parse('<a href=""></a>').extract();
      new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return Promise.resolve();
      }});
      delegate(document, 'a', 'click', ev => {
        assert(ev.defaultPrevented === true);
        done();
      });
      document.querySelector('a')!.click();
    });

  });

  describe('submit', function () {
    it('', function (done) {
      const form = html('form', { action: '' }, [
        html('input', { type: 'submit', value: 'submit' }),
      ]);
      document.body.appendChild(form);
      new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return Promise.resolve();
      }});
      once(document, 'form', 'submit', ev => {
        assert(ev.defaultPrevented === true);
        done();
      });
      form.querySelector('input')!.click();
    });

  });

});
