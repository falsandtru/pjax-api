import { script, _fetch, _evaluate, escape } from './script';
import { Cancellation } from 'spica/cancellation';
import { Left, Right } from 'spica/either';
import { tuple } from 'spica/tuple';
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
        1e3,
        fallback,
        new Cancellation<Error>(),
        {
          fetch: async script => Right(tuple([script, script.text])),
          evaluate: script => Left(Right(script)),
        })
        .then(m => {
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(ss => {
          assert.deepStrictEqual(ss, []);
          done();
        });
    });

    it('success', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script({ class: 'test' })]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Right(tuple([script, script.text]));
          },
          evaluate: (script, code) => {
            assert(cnt === 2 && ++cnt);
            assert(script.className === 'test');
            assert(script.text === code);
            return Left(Right(script));
          },
        })
        .then(m => {
          assert(cnt === 1 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss.map(s => s instanceof HTMLScriptElement), [true]);
          return p;
        })
        .then(ss => {
          assert.deepStrictEqual(ss, []);
          done();
        });
    });

    it('success over Same-origin policy', done => {
      script(
        {
          src: parse(DOM.head([DOM.script({ src: 'https://platform.twitter.com/widgets.js', async: '' })]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
        new Cancellation<Error>())
        .then(m => {
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(ss => {
          assert.deepStrictEqual(ss.map(s => s instanceof HTMLScriptElement), [true]);
          done();
        });
    });

    it('failure fetch', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script(), DOM.script()]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
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
            return Left(Right(script));
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
          src: parse(DOM.head([DOM.script({ class: 'test' })]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Right(tuple([script, '']));
          },
          evaluate: () => {
            assert(cnt === 2 && ++cnt);
            return Left(Left(new Error()));
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
          src: parse(DOM.head([DOM.script({ class: 'test' })]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
        cancellation,
        {
          fetch: async script => {
            assert(cnt === 0 && ++cnt);
            assert(script.className === 'test');
            return Right(tuple([script, '']));
          },
          evaluate: script => {
            assert(++cnt === NaN);
            return Left(Right(script));
          },
        })
        .then(m => m.extract(err => {
          assert(cnt === 1 && ++cnt);
          assert(err instanceof Error);
          done();
        }));
      cancellation.cancel(new Error());
    });

    it('success defer', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script({ type: 'module' }), DOM.script({ defer: '' })]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            return Right(tuple([script, script.text]));
          },
          evaluate: script => {
            assert(cnt > 0 && ++cnt);
            return Right(Promise.resolve(Right(script)));
          },
        })
        .then(m => {
          assert(cnt === 0 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .then(ss => {
          assert.deepStrictEqual(ss.map(s => s instanceof HTMLScriptElement), [true, true]);
          done();
        });
    });

    it('failure defer evaluate', done => {
      let cnt = 0;
      script(
        {
          src: parse(DOM.head([DOM.script({ type: 'module' }), DOM.script({ defer: '' })]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
        new Cancellation<Error>(),
        {
          fetch: async script => {
            return Right(tuple([script, '']));
          },
          evaluate: () => {
            assert(cnt > 0 && ++cnt);
            return Right(Promise.resolve(Left(new Error())));
          },
        })
        .then(m => {
          assert(cnt === 0 && ++cnt);
          return m.extract();
        })
        .then(([ss, p]) => {
          assert.deepStrictEqual(ss, []);
          return p;
        })
        .catch(error => {
          assert(error instanceof Error);
          done();
        });
    });

    it('cancel defer', done => {
      let cnt = 0;
      const cancellation = new Cancellation<Error>();
      script(
        {
          src: parse(DOM.head([DOM.script()]).element.outerHTML).extract(),
          dst: parse('').extract()
        },
        new Set([]),
        {
          ignore: '',
          reload: '',
          logger: 'head'
        },
        1e3,
        fallback,
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
        .then(m => m.extract(err => {
          assert(cnt === 1 && ++cnt);
          assert(err instanceof Error);
          done();
        }));
      cancellation.cancel(new Error());
    });

  });

  describe('request', () => {
    it('external', done => {
      const src = '/base/test/unit/fixture/throw.js';
      const script = DOM.script({ src }).element;
      _fetch(script, 1e3, fallback)
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
      const script = DOM.script({ type: 'module', src }).element;
      _fetch(script, 1e3, fallback)
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
      const script = DOM.script('throw 0').element;
      _fetch(script, 1e3, fallback)
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
      const script = DOM.script({ src: '404' }).element;
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate(script, `assert(this === window)`, '', new Set(), Promise.resolve(), fallback, new Cancellation())
        .extract(m => m
          .fmap(el => {
            assert(el.outerHTML === `<script src="404"></script>`);
            assert(el.parentElement === null);
            assert(cnt === 1 && ++cnt);
            done();
          })
          .extract());
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
      _evaluate(script, `throw new Error()`, '', new Set(), Promise.resolve(), fallback, new Cancellation())
        .extract(m => m
          .extract(e => {
            assert(e instanceof Error);
            assert(script.parentElement === null);
            assert(cnt === 1 && ++cnt);
            done();
          }));
    });

    it('external defer load', done => {
      const script = DOM.script({ src: '404', defer: '' }).element;
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate(script, `assert(this === window)`, '', new Set(), Promise.resolve(), fallback, new Cancellation())
        .fmap(p => p
          .then(m => m
            .fmap(el => {
              assert(el.parentElement === null);
              assert(cnt === 1 && ++cnt);
              done();
            })
            .extract()))
        .extract();
    });

    it('external defer error', done => {
      const script = DOM.script({ src: '/', defer: '' }).element;
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      _evaluate(script, `throw new Error()`, '', new Set(), Promise.resolve(), fallback, new Cancellation())
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

    it.skip('external module load', done => {
      //if (typeof import !== 'function') return done();
      const script = DOM.script({ type: 'module', src: '404' }).element;
      let cnt = 0;
      script.addEventListener('load', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate(script, `assert(this === window)`, '', new Set(), Promise.resolve(), fallback, new Cancellation())
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
      const script = DOM.script({ type: 'module', src: '/' }).element;
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', event => {
        assert(cnt === 0 && ++cnt);
        assert(event instanceof Event);
      });
      _evaluate(script, `throw new Error()`, '', new Set(), Promise.resolve(), fallback, new Cancellation())
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
      const script = DOM.script(`assert(this === window)`).element;
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate(script, script.text, '', new Set(), Promise.resolve(), fallback, new Cancellation())
        .extract(m => m
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
      const script = DOM.script('throw new Error()').element;
      assert(!script.hasAttribute('src'));
      let cnt = 0;
      script.addEventListener('load', () => {
        assert(--cnt === NaN);
      });
      script.addEventListener('error', () => {
        assert(--cnt === NaN);
      });
      _evaluate(script, script.text, '', new Set(), Promise.resolve(), fallback, new Cancellation())
        .extract(m => m
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

  function fallback(target: HTMLScriptElement) {
    return new Promise<HTMLScriptElement>((resolve, reject) => (
      void target.addEventListener('load', () => void resolve(target)),
      void target.addEventListener('error', reject),
      void document.body.appendChild(target)));
  }

});
