import { script, _fetch, _evaluate, escape } from './script';
import { Cancellation } from 'spica/cancellation';
import { Left, Right } from 'spica/either';
import { parse } from '../../../../../lib/html';
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
        new Cancellation<Error>(),
        {
          fetch: script => Promise.resolve(Right<[HTMLScriptElement, string]>([script, ''])),
          evaluate: ([script]) => Right(script),
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
        new Cancellation<Error>(),
        {
          fetch: script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Promise.resolve(Right<[HTMLScriptElement, string]>([script, '']));
          },
          evaluate: ([script, code]) => {
            assert(cnt === 2 && ++cnt);
            assert(script.className === 'test');
            assert(script.text === code);
            return Right(script);
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          assert(m.extract().reduce((a, s) => a && s instanceof HTMLScriptElement, true) === true);
          done();
        });
    });

    it('failure fetch', done => {
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
        new Cancellation<Error>(),
        {
          fetch: script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Promise.reject(new Error());
          },
          evaluate: ([script]) => {
            assert(++cnt === NaN);
            return Right(script);
          },
        })
        .catch(reason => {
          assert(cnt === 1 && ++cnt);
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
        new Cancellation<Error>(),
        {
          fetch: script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Promise.resolve(Right<[HTMLScriptElement, string]>([script, '']));
          },
          evaluate: ([]) => {
            assert(cnt === 2 && ++cnt);
            return Left(new Error());
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
    });

    it('cancel', done => {
      let cnt = 0;
      const cancellation = new Cancellation<Error>();
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
        cancellation,
        {
          fetch: script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Promise.resolve(Right<[HTMLScriptElement, string]>([script, '']));
          },
          evaluate: ([script]) => {
            assert(++cnt === NaN);
            return Right(script);
          },
        })
        .then(m => m.extract(err => {
          assert(cnt === 1 && ++cnt);
          assert(err instanceof Error);
          done();
        }));
      cancellation.cancel(new Error());
    });

  });

  describe('_request', () => {
    it('external', done => {
      const src = '/base/test/unit/fixture/throw.js';
      const script = DOM.script({ src }).element;
      _fetch(script)
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
      const code = 'alert';
      const script = DOM.script(code).element;
      _fetch(script)
        .then(m => m
          .fmap(([el, html]) => {
            assert(el === script);
            assert(el.text === html);
            assert(html === code);
            done();
          })
          .extract());
    });

  });

  describe('_evaluate', () => {
    it('external load', done => {
      const script = DOM.script({ src: '404' }).element;
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate([script, `assert(this === window)`], '')
        .fmap(el => {
          assert(el.outerHTML === `<script src="404"></script>`);
          assert(el.parentElement === null);
          assert(cnt === 1 && ++cnt);
          done();
        })
        .extract();
    });

    it('external error', done => {
      const script = DOM.script({ src: '/' }).element;
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      _evaluate([script, 'throw new Error()'], '')
        .extract(e => {
          assert(e instanceof Error);
          assert(script.parentElement === null);
          assert(cnt === 1 && ++cnt);
          done();
        });
    });

    it('inline load', done => {
      const script = DOM.script(`assert(this === window)`).element;
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate([script, script.text], '')
        .fmap(el => {
          assert(el.hasAttribute('src') === false);
          assert(el.text.startsWith('assert'));
          assert(el.parentElement === null);
          assert(cnt === 0 && ++cnt);
          done();
        })
        .extract();
    });

    it('inline error', done => {
      const script = DOM.script('throw new Error()').element;
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate([script, script.text], '')
        .extract(e => {
          assert(e instanceof Error);
          assert(script.parentElement === null);
          assert(cnt === 0 && ++cnt);
          done();
        });
    });

  });

  describe('escape', () => {
    it('external', () => {
      const src = '/';
      const script = DOM.script({ src }).element;
      assert(script.getAttribute('src') === src);
      assert(script.text === '');
      const unescape = escape(script);
      assert(!script.hasAttribute('src'));
      assert(script.text === '');
      document.body.appendChild(script);
      unescape();
      assert(script.getAttribute('src') === src);
      assert(script.text === '');
      script.remove();
    });

    it('inline', () => {
      const code = 'assert(this === window)';
      const script = DOM.script(code).element;
      assert(!script.hasAttribute('src'));
      assert(script.text === code);
      const unescape = escape(script);
      assert(!script.hasAttribute('src'));
      assert(script.text === '');
      document.body.appendChild(script);
      unescape();
      assert(!script.hasAttribute('src'));
      assert(script.text === code);
      script.remove();
    });

  });

});
