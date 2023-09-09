import { Pjax, FakeXMLHttpRequest } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Config', function () {
  afterEach(() => {
    Pjax['resources'].clear();
  });

  describe('fetch.rewrite', function () {
    it('', function (done) {
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({
        fetch: {
          rewrite: url =>
            FakeXMLHttpRequest.create(
              url,
              fetch(url)
                .then(res => res.text())
                .then(html =>
                  new DOMParser().parseFromString(
                    html.replace(/>(\w+) 1</g, '>$1 2<'),
                    'text/html'))),
        },
      }, { document, router })
        .assign(url);
      once(document, 'pjax:ready', () => {
        assert(window.location.pathname === url);
        assert(document.title === 'Title 2');
        assert(document.querySelector('#primary')!.textContent === 'Primary 2');
        done();
      });
    });

  });

});
