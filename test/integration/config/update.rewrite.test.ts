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
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({
        memory: new Cache(100),
        update: {
          rewrite(path, doc, area, memory) {
            switch (path) {
              case url:
                memory && doc.querySelector(area)?.replaceWith(memory.querySelector(area)!.cloneNode(true));
            }
          },
        }
      }, { document, router })
        .assign(url);
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 1');
        assert(document.querySelector('#primary')!.textContent === 'Primary 1');
        document.querySelector('#primary')!.textContent = 'PRIMARY 1';
        once(document, 'pjax:ready', () => {
          assert(window.location.pathname !== url);
          assert(document.title !== 'Title 1');
          once(document, 'pjax:ready', () => {
            assert(window.location.pathname === url);
            assert(document.title === 'Title 1');
            assert(document.querySelector('#primary')!.textContent === 'PRIMARY 1');
            done();
          });
          window.history.go(1);
        });
        window.history.back();
      });
    });

  });

});
