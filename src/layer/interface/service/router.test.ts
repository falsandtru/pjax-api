import { _validate as validate, Config, RouterEvent } from './router';
import { page } from './state/page';
import { parse } from '../../../lib/html';
import { URL, standardize } from 'spica/url';
import { html, delegate, once } from 'typed-dom';

describe('Unit: layer/interface/service/router', function () {
  describe('validate', function () {
    it('click', function (done) {
      const url = '';
      const document = parse(`<a href="${url}"></a>`).extract();
      delegate(document, 'a', 'click', ev => {
        assert(validate(new URL(standardize(url, window.location.href)), new Config({}), new RouterEvent(ev, page.url)));
        done();
      });
      document.querySelector('a')!.click();
    });

    it('click external', function (done) {
      const url = '//external';
      const document = parse(`<a href="${url}"></a>`).extract();
      delegate(document, 'a', 'click', ev => {
        assert(!validate(new URL(standardize(url, window.location.href)), new Config({}), new RouterEvent(ev, page.url)));
        ev.preventDefault();
        done();
      });
      document.querySelector('a')!.click();
    });

    it('click hash', function (done) {
      const url = '#';
      const document = parse(`<a href="${url}"></a>`).extract();
      delegate(document, 'a', 'click', ev => {
        assert(!validate(new URL(standardize(url, window.location.href)), new Config({}), new RouterEvent(ev, page.url)));
        ev.preventDefault();
        done();
      });
      document.querySelector('a')!.click();
    });

    it('click download', function (done) {
      const url = '';
      const document = parse(`<a href="${url}" download></a>`).extract();
      delegate(document, 'a', 'click', ev => {
        assert(!validate(new URL(standardize(url, window.location.href)), new Config({}), new RouterEvent(ev, page.url)));
        ev.preventDefault();
        done();
      });
      document.querySelector('a')!.click();
    });

    it('submit valid', function (done) {
      const url = '';
      const form = html('form', { action: url }, [
        html('input', { type: 'submit', value: 'submit' }),
      ]);
      document.body.appendChild(form);
      once(document, 'form', 'submit', ev => {
        assert(validate(new URL(standardize(url, window.location.href)), new Config({}), new RouterEvent(ev, page.url)));
        ev.preventDefault();
        form.remove();
        done();
      });
      form.querySelector('input')!.click();
    });

    it('submit external', function (done) {
      const url = '//external';
      const form = html('form', { action: url }, [
        html('input', { type: 'submit', value: 'submit' }),
      ]);
      document.body.appendChild(form);
      once(document, 'form', 'submit', ev => {
        assert(!validate(new URL(standardize(url, window.location.href)), new Config({}), new RouterEvent(ev, page.url)));
        ev.preventDefault();
        form.remove();
        done();
      });
      form.querySelector('input')!.click();
    });

  });

});
