import { script, escape, _log, _request, _evaluate } from './script';
import { parse } from '../../../../../lib/html';
import { find } from '../../../../../lib/dom';
import { Cancelable, Left, Right } from 'spica';
import DOM from 'typed-dom';

describe('Unit: layer/domain/router/module/update/script', () => {
  describe('script', () => {
    it('empty', done => {
      script(
        {
          src: parse('').extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: ''
        },
        new Cancelable<Error>(),
        {
          request: script => Promise.resolve(Right<[HTMLScriptElement, string]>([script, ''])),
          evaluate: ([script]) => Right(script),
          log: () => true
        })
        .then(m => {
          assert.deepStrictEqual(m.extract(), []);
          done();
        });
    });

    it('success', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script({ class: 'test' }, [])]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        new Cancelable<Error>(),
        {
          request: script => {
            assert(++cnt === 1);
            assert(script.className === 'test');
            return Promise.resolve(Right<[HTMLScriptElement, string]>([script, '']));
          },
          evaluate: ([script, code]) => {
            assert(++cnt === 3);
            assert(script.className === 'test');
            assert(script.innerHTML === code);
            return Right(script);
          },
          log: (script) => {
            assert(++cnt === 4);
            assert(script.className === 'test');
            return true;
          }
        })
        .then(m => {
          assert(++cnt === 2);
          assert(m.extract().reduce((a, s) => a && s instanceof HTMLScriptElement, true) === true);
          done();
        });
    });

    it('failure request', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script({ class: 'test' }, [])]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        new Cancelable<Error>(),
        {
          request: script => {
            assert(++cnt === 1);
            assert(script.className === 'test');
            return Promise.reject(new Error());
          },
          evaluate: ([script]) => {
            assert(++cnt === NaN);
            return Right(script);
          },
          log: () => {
            assert(++cnt === NaN);
            return true;
          }
        })
        .catch(reason => {
          assert(++cnt === 2);
          assert(reason instanceof Error);
          done();
        });
    });

    it('failure evaluate', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script({ class: 'test' }, [])]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        new Cancelable<Error>(),
        {
          request: script => {
            assert(++cnt === 1);
            assert(script.className === 'test');
            return Promise.resolve(Right<[HTMLScriptElement, string]>([script, '']));
          },
          evaluate: ([]) => {
            assert(++cnt === 3);
            return Left(new Error());
          },
          log: () => {
            assert(++cnt === NaN);
            return true;
          }
        })
        .then(m => {
          assert(++cnt === 2);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
    });

    it('failure cancel', done => {
      let cnt = 0;
      const cancelable = new Cancelable<Error>();
      script(
        {
          src: parse(DOM.head([DOM.script({ class: 'test' }, [])]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        cancelable,
        {
          request: script => {
            assert(++cnt === 1);
            assert(script.className === 'test');
            return Promise.resolve(Right<[HTMLScriptElement, string]>([script, '']));
          },
          evaluate: ([script]) => {
            assert(++cnt === NaN);
            return Right(script);
          },
          log: (_, document) => {
            assert(++cnt === NaN);
            assert(document instanceof Document);
            return true;
          }
        })
        .then(m => m.extract(err => {
          assert(++cnt === 2);
          assert(err instanceof Error);
          done();
        }));
      cancelable.cancel(new Error());
    });

  });

  describe('escape', () => {
    it('external', () => {
      const script = DOM.script().element;
      const src = '/';
      script.setAttribute('src', src);
      assert(script.getAttribute('src') === src);
      assert(script.innerHTML === '');
      const unescape = escape(script);
      assert(!script.hasAttribute('src'));
      assert(script.innerHTML === '');
      document.body.appendChild(script);
      unescape();
      assert(script.getAttribute('src') === src);
      assert(script.innerHTML === '');
      script.remove();
    });

    it('inline', () => {
      const script = DOM.script().element;
      const code = 'alert()';
      script.innerHTML = code;
      assert(!script.hasAttribute('src'));
      assert(script.innerHTML === code);
      const unescape = escape(script);
      assert(!script.hasAttribute('src'));
      assert(script.innerHTML === '');
      document.body.appendChild(script);
      unescape();
      assert(!script.hasAttribute('src'));
      assert(script.innerHTML === code);
      script.remove();
    });

  });

  describe('_request', () => {
    it('external', done => {
      const script = DOM.script([]).element;
      const src = '/base/test/unit/fixture/throw.js';
      script.setAttribute('src', src);
      _request(script)
        .then(m => m
          .fmap(([el, html]) => {
            assert(el === script);
            assert(el.getAttribute('src') === src);
            assert(html === 'throw 0');
            done();
          })
          .extract());
    });

    it('inline', done => {
      const script = DOM.script([]).element;
      const code = 'alert';
      script.innerHTML = code;
      _request(script)
        .then(m => m
          .fmap(([el, html]) => {
            assert(el === script);
            assert(el.innerHTML === html);
            assert(html === code);
            done();
          })
          .extract());
    });

  });

  describe('_evaluate', () => {
    it('external load', done => {
      const script = DOM.script().element;
      script.setAttribute('src', '');
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(++cnt === 1);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate([script, ''])
        .fmap(el => {
          assert(el === script);
          assert(++cnt === 2);
          done();
        })
        .extract();
    });

    it('external error', done => {
      const script = DOM.script().element;
      script.setAttribute('src', '');
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(++cnt === 1);
        assert(event instanceof Event);
      });
      _evaluate([script, 'throw new Error()'])
        .extract(e => {
          assert(e instanceof Error);
          assert(++cnt === 2);
          done();
        });
    });

    it('inline load', done => {
      const script = DOM.script().element;
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate([script, ''])
        .fmap(el => {
          assert(el === script);
          assert(++cnt === 1);
          done();
        })
        .extract();
    });

    it('inline error', done => {
      const script = DOM.script().element;
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate([script, 'throw new Error()'])
        .extract(e => {
          assert(e instanceof Error);
          assert(++cnt === 1);
          done();
        });
    });

  });

  describe('_log', () => {
    it('head', () => {
      const script = find<HTMLScriptElement>(parse(DOM.head([DOM.script()]).element.outerHTML).extract(), 'script')[0];
      const document = parse('').extract();
      assert(_log(script, document));
      assert(document.head.children.length === 1);
      assert(document.head.firstElementChild instanceof HTMLScriptElement);
    });

  });

});
