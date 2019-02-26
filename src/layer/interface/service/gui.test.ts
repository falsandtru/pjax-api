import { GUI, unregister } from './gui';
import { API } from './api';
import { parse } from '../../../lib/html';
import { html, once } from 'typed-dom';

describe('Unit: layer/interface/service/gui', function () {
  afterEach(() => {
    unregister();
  });

  describe('assign', function () {
    it('', function () {
      assert(GUI.assign === API.assign);
      assert(new GUI({}, { document, router: config => {
        assert(config.replace as string !== '*');
        return true;
      }})
        .assign(''));
    });

  });

  describe('replace', function () {
    it('', function () {
      assert(GUI.replace === API.replace);
      assert(new GUI({}, { document, router: config => {
        assert(config.replace as string === '*');
        return true;
      }})
        .replace(''));
    });

  });

  describe('click', function () {
    it('normal', function () {
      const document = parse('<a href=""></a>').extract();
      assert(new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return true;
      }}));
      once(document, 'a', 'click', ev => {
        assert(ev.defaultPrevented === true);
      });
      document.querySelector('a')!.click();
    });

    it('shadow', function () {
      if (!window.document.body.attachShadow) return;
      const document = parse('<a href=""></a>').extract();
      document.body.attachShadow({ mode: 'open' }).appendChild(document.body.firstChild!);
      assert(new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return true;
      }}));
      once(document, 'a', 'click', ev => {
        assert(ev.defaultPrevented === true);
      });
      document.body.shadowRoot!.querySelector('a')!.click();
    });

  });

  describe('submit', function () {
    it('normal', function () {
      const form = html('form', { action: '' }, [
        html('input', { type: 'submit', value: 'submit' }),
      ]);
      document.body.appendChild(form);
      assert(new GUI({}, { document, router: (_, ev) => {
        ev.original.preventDefault();
        return true;
      }}));
      once(document, 'form', 'submit', ev => {
        assert(ev.defaultPrevented === true);
        form.remove();
      });
      form.querySelector('input')!.click();
    });

  });

});
