import { xhr, match_ as match } from './xhr';
import { RouterEventMethod } from '../../../event/router';
import { Cancellation } from 'spica/cancellation';
import { Sequence } from 'spica/sequence';
import { URL, standardize } from 'spica/url';

describe('Unit: layer/domain/router/module/fetch/xhr', () => {
  describe('xhr', () => {
    it('success', done => {
      xhr(
        RouterEventMethod.GET,
        new URL(standardize('#', window.location.href)),
        new URL(standardize(window.location.href)),
        new Headers(),
        null,
        0,
        new Cancellation<Error>())
        .then(m => m.fmap(res => {
          assert(res.url.href === standardize('#', window.location.href));
          assert(res.header('Content-Type') === 'text/html');
          assert(res.document instanceof Document);
          done();
        }).extract());
    });

    it.skip('timeout', done => {
      xhr(
        RouterEventMethod.GET,
        new URL(standardize('?timeout', window.location.href)),
        new URL(standardize(window.location.href)),
        new Headers(),
        null,
        1,
        new Cancellation<Error>())
        .then(m => m.extract(err => {
          assert(err instanceof Error);
          done();
        }));
    });

    it.skip('wait', done => {
      const time = Date.now();
      xhr(
        RouterEventMethod.GET,
        new URL(standardize('', window.location.href)),
        new URL(standardize(window.location.href)),
        new Headers(),
        null,
        0,
        new Cancellation<Error>())
        .then(m => m.fmap(() => {
          assert(Date.now() - time > 1000 - 10);
          done();
        }).extract());
    });

    it('cancel', done => {
      const cancellation = new Cancellation<Error>();
      xhr(
        RouterEventMethod.GET,
        new URL(standardize('', window.location.href)),
        new URL(standardize(window.location.href)),
        new Headers(),
        null,
        0,
        cancellation)
        .then(m => m.extract(err => {
          assert(err instanceof Error);
          done();
        }));
      cancellation.cancel(new Error());
    });

  });

  describe('match', () => {
    it('match', () => {
      Sequence.from(['text/html', 'text/html'])
        .mapM(type =>
          Sequence.from([type, type + ';']))
        .extract()
        .forEach(([a, b]) =>
          assert(match(a, b)));

      Sequence.from(['text/plain', 'text/html'])
        .permutations()
        .bind(types =>
          Sequence.from([types[0], types.join('; ')])
            .permutations())
        .extract()
        .forEach(([a, b]) =>
          assert(match(a, b)));
    });

    it('mismatch', () => {
      Sequence.from(['text/plain', 'text/html'])
        .mapM(type =>
          Sequence.from([null, '', type, type + ';']))
        .map(types => types.slice(-2))
        .unique()
        .filter(types => types.some(type => !!type))
        .extract()
        .forEach(([a, b]) =>
          assert(!match(a, b || '')));
    });

  });

});
