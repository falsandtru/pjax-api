import { GUI } from './gui';
import { API } from './api';
import { parse } from '../../../lib/html';
import { html, once } from 'typed-dom';

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
    it('normal', function (done) {
      const document = parse('<a href=""></a>').extract();
      new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return Promise.resolve();
      }});
      once(document, 'a', 'click', ev => {
        assert(ev.defaultPrevented === true);
        done();
      });
      document.querySelector('a')!.click();
    });

    it('shadow', function (done) {
      if (!window.document.body.attachShadow) return done();
      const document = parse('<a href=""></a>').extract();
      document.body.attachShadow({ mode: 'open' }).appendChild(document.body.firstChild!);
      new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return Promise.resolve();
      }});
      once(document, 'a', 'click', ev => {
        assert(ev.defaultPrevented === true);
        done();
      });
      document.body.shadowRoot!.querySelector('a')!.click();
    });

  });

  describe('submit', function () {
    it('normal', function (done) {
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
        form.remove();
        done();
      });
      form.querySelector('input')!.click();
    });

  });

});
