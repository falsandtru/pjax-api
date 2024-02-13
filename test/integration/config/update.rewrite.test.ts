import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { Cache } from 'spica/cache';
import { once } from 'typed-dom';

describe('Integration: Config', function () {
  afterEach(() => {
    Pjax['resources'].clear();
  });

  describe('update.rewrite', function () {
    it('', function (done) {
      const url = '/base/test/integration/fixture/basic/2.html';
      const document = parse('').extract();
      new Pjax({
        memory: new Cache(100),
        update: {
          rewrite(url, doc, area, memory) {
            switch (url.split('/').at(-1)) {
              case '2.html':
                memory && doc.querySelector(area)?.replaceWith(memory.querySelector(area)!.cloneNode(true));
            }
          },
        },
      }, { document, router })
        .assign(url);
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 2');
        assert(document.querySelector('#primary')!.textContent === 'Primary 2');
        document.querySelector('#primary')!.textContent = 'PRIMARY 2';
        once(document, 'pjax:ready', () => {
          assert(window.location.pathname !== url);
          assert(document.title === 'Title 1');
          assert(document.querySelector('#primary')!.textContent === 'Primary 1');
          once(document, 'pjax:ready', () => {
            assert(window.location.pathname === url);
            assert(document.title === 'Title 2');
            assert(document.querySelector('#primary')!.textContent === 'PRIMARY 2');
            done();
          });
          window.history.go(1);
        });
        window.history.back();
      });
    });

  });

});
