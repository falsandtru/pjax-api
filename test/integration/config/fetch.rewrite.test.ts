import { Pjax } from '../../../index';
import { route as router } from '../../../src/layer/interface/service/router';
import { parse } from '../../../src/lib/html';
import { once } from 'typed-dom';

describe('Integration: Config', function () {
  afterEach(() => {
    Pjax['resources'].clear();
  });

  describe('fetch.rewrite', function () {
    it('', function (done) {
      const FakeXMLHttpRequest = XMLHttpRequest;
      const url = '/base/test/integration/fixture/basic/1.html';
      const document = parse('').extract();
      new Pjax({
        fetch: {
          rewrite: (path, method, headers, timeout, body) => {
            const xhr = new FakeXMLHttpRequest();
            xhr.open(method, path.replace('1', '2'), true);
            for (const [name, value] of headers) {
              xhr.setRequestHeader(name, value);
            }

            xhr.responseType = 'document';
            xhr.timeout = timeout;
            xhr.send(body);

            Object.defineProperties(xhr, {
              responseURL: {
                value: url,
              },
              responseXML: {
                value: parse('<title>Title 2</title><div id="primary">Primary 2</div>').extract(),
              },
            });
            return xhr;
          },
        }
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
