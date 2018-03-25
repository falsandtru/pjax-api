import { script, _fetch as fetch, _evaluate as evaluate, escape } from './script';
import { Cancellation } from 'spica/cancellation';
import { Left, Right } from 'spica/either';
import { tuple } from 'spica/tuple';
import { parse } from '../../../../../lib/html';
import { html } from 'typed-dom';

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
        1e3,
        new Cancellation<Error>(),
        {
          fetch: async script => Right(tuple([script, script.text])),
          evaluate: script => Left(Promise.resolve(Right(script))),
        })
        .then(m => {
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss, []);
          return p;
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
          src: parse(html('head', [html('script', { class: 'test' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Right(tuple([script, script.text]));
          },
          evaluate: (script, code) => {
            assert(cnt === 1 && ++cnt);
            assert(script.className === 'test');
            assert(script.text === code);
            return Left(Promise.resolve(Right(script)));
          },
        })
        .then(m => {
          assert(cnt === 2 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss.map(s => s instanceof HTMLScriptElement), [true]);
          return p;
        })
        .then(m => {
          assert.deepStrictEqual(m.extract(), []);
          done();
        });
    });

    it('success over Same-origin policy', done => {
      script(
        {
          src: parse(html('head', [html('script', { src: 'https://platform.twitter.com/widgets.js', async: '' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        new Cancellation<Error>())
        .then(m => {
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(m => {
          assert.deepStrictEqual(m.extract().map(s => s instanceof HTMLScriptElement), [true]);
          done();
        });
    });

    it('failure fetch', done => {
      let cnt = 0;
      script(
        {
          src: parse(html('head', [html('script'), html('script')]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(++cnt);
            return cnt === 1
              ? Right(tuple([script, script.text]))
              : Left(new Error());
          },
          evaluate: script => {
            assert(++cnt === NaN);
            return Left(Promise.resolve(Right(script)));
          },
        })
        .then(m => {
          assert(cnt === 2 && ++cnt);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
    });

    it('failure evaluate', done => {
      let cnt = 0;
      script(
        {
          src: parse(html('head', [html('script', { class: 'test' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Right(tuple([script, '']));
          },
          evaluate: () => {
            assert(cnt === 1 && ++cnt);
            return Left(Promise.resolve(Left(new Error())));
          },
        })
        .then(m => {
          assert(cnt === 2 && ++cnt);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
    });

    it('cancel', done => {
      let cnt = 0;
      const cancellation = new Cancellation<Error>();
      script(
        {
          src: parse(html('head', [html('script', { class: 'test' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        cancellation,
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Right(tuple([script, '']));
          },
          evaluate: script => {
            assert(++cnt === NaN);
            return Left(Promise.resolve(Right(script)));
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
      cancellation.cancel(new Error());
    });

    it('success defer', done => {
      let cnt = 0;
      script(
        {
          src: parse(html('head', [html('script', { src: '/base/test/unit/fixture/empty.js', defer: '' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            return Right(tuple([script, script.text]));
          },
          evaluate: script => {
            assert(cnt === 3 && ++cnt);
            return Right(Promise.resolve(Right(script)));
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert(cnt === 2 && ++cnt);
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(m => {
          assert(cnt === 4 && ++cnt);
          assert.deepStrictEqual(m.extract().map(s => s instanceof HTMLScriptElement), [true]);
          done();
        });
    });

    it('failure defer evaluate', done => {
      let cnt = 0;
      script(
        {
          src: parse(html('head', [html('script', { src: '/base/test/unit/fixture/empty.js', defer: '' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            return Right(tuple([script, '']));
          },
          evaluate: () => {
            assert(cnt === 3 && ++cnt);
            return Right(Promise.resolve(Left(new Error())));
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert(cnt === 2 && ++cnt);
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(m => {
          assert(cnt === 4 && ++cnt);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
    });

    it('cancel defer', done => {
      let cnt = 0;
      const cancellation = new Cancellation<Error>();
      script(
        {
          src: parse(html('head', [html('script', { src: '/base/test/unit/fixture/empty.js', defer: '' })]).outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        cancellation,
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            return Right(tuple([script, '']));
          },
          evaluate: script => {
            assert(++cnt === NaN);
            return Right(Promise.resolve(Right(script)));
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert(cnt === 2 && ++cnt);
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(m => {
          assert(cnt === 3 && ++cnt);
          assert(m.extract(e => e) instanceof Error);
          done();
        });
      cancellation.cancel(new Error());
    });

  });

  describe('fetch', () => {
    it('external', done => {
      const src = '/base/test/unit/fixture/throw.js';
      const script = html('script', { src });
      fetch(script, 1e3)
        .then(m => m
          .fmap(([el, code]) => {
            assert(el === script);
            assert(el.getAttribute('src') === src);
            assert(code === 'throw 0');
            done();
          })
          .extract());
    });

    it('external module', done => {
      const src = '/base/test/unit/fixture/throw.js';
      const script = html('script', { type: 'module', src });
      fetch(script, 1e3)
        .then(m => m
          .fmap(([el, code]) => {
            assert(el === script);
            assert(el.getAttribute('src') === src);
            assert(code === '');
            done();
          })
          .extract());
    });

    it('inline', done => {
      const script = html('script', 'throw 0');
      fetch(script, 1e3)
        .then(m => m
          .fmap(([el, code]) => {
            assert(el === script);
            assert(el.text === code);
            assert(code === 'throw 0');
            done();
          })
          .extract());
    });

  });

  describe('evaluate', () => {
    it('external load', done => {
      const script = html('script', { src: '404' });
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      evaluate(script, `assert(this === window)`, '', new Set(), Promise.resolve(), new Cancellation())
        .extract(async p => (await p)
          .fmap(el => {
            assert(el.outerHTML === `<script src="404"></script>`);
            assert(el.parentElement === null);
            assert(cnt === 1 && ++cnt);
            done();
          })
          .extract());
    });

    it('external error', done => {
      const script = html('script', { src: '/' });
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      evaluate(script, `throw new Error()`, '', new Set(), Promise.resolve(), new Cancellation())
        .extract(async p => (await p)
          .extract(e => {
            assert(e instanceof Error);
            assert(script.parentElement === null);
            assert(cnt === 1 && ++cnt);
            done();
          }));
    });

    it('external defer load', done => {
      const script = html('script', { src: '404', defer: '' });
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      evaluate(script, `assert(this === window)`, '', new Set(), Promise.resolve(), new Cancellation())
        .extract(async p => (await p)
          .fmap(el => {
            assert(el.parentElement === null);
            assert(cnt === 1 && ++cnt);
            done();
          })
          .extract());
    });

    it('external defer error', done => {
      const script = html('script', { src: '/', defer: '' });
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      evaluate(script, `throw new Error()`, '', new Set(), Promise.resolve(), new Cancellation())
        .extract(async p => (await p)
          .extract(e => {
            assert(e instanceof Error);
            assert(script.parentElement === null);
            assert(cnt === 1 && ++cnt);
            done();
          }));
    });

    it.skip('external module load', done => {
      //if (typeof import !== 'function') return done();
      const script = html('script', { type: 'module', src: '404' });
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      evaluate(script, `assert(this === window)`, '', new Set(), Promise.resolve(), new Cancellation())
        .fmap(p => p
          .then(m => m
            .fmap(el => {
              assert(el.outerHTML === `<script type="module" src="404"></script>`);
              assert(el.parentElement === null);
              assert(cnt === 1 && ++cnt);
              done();
            })
            .extract()))
        .extract();
    });

    it.skip('external module error', done => {
      //if (typeof import !== 'function') return done();
      const script = html('script', { type: 'module', src: '/' });
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      evaluate(script, `throw new Error()`, '', new Set(), Promise.resolve(), new Cancellation())
        .fmap(p => p
          .then(m => m
            .extract(e => {
              assert(e instanceof Error);
              assert(script.parentElement === null);
              assert(cnt === 1 && ++cnt);
              done();
            })))
        .extract();
    });

    it('inline load', done => {
      const script = html('script', `assert(this === window)`);
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      evaluate(script, script.text, '', new Set(), Promise.resolve(), new Cancellation())
        .extract(async p => (await p)
          .fmap(el => {
            assert(el.hasAttribute('src') === false);
            assert(el.text.startsWith('assert'));
            assert(el.parentElement === null);
            assert(cnt === 0 && ++cnt);
            done();
          })
          .extract());
    });

    it('inline error', done => {
      const script = html('script', 'throw new Error()');
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      evaluate(script, script.text, '', new Set(), Promise.resolve(), new Cancellation())
        .extract(async p => (await p)
          .extract(e => {
            assert(e instanceof Error);
            assert(script.parentElement === null);
            assert(cnt === 0 && ++cnt);
            done();
          }));
    });

  });

  describe('escape', () => {
    it('external', () => {
      const src = '/';
      const script = html('script', { src });
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
      const script = html('script', code);
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
