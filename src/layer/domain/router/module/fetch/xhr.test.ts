import { xhr, match } from './xhr';
import { RouterEventMethod } from '../../../event/router';
import { canonicalizeUrl } from '../../../../data/model/canonicalization/url';
import { validateUrl } from '../../../../data/model/validation/url';
import { Sequence, Cancellation } from 'spica';

describe('Unit: layer/domain/router/module/fetch/xhr', () => {
  describe('xhr', () => {
    it('success', done => {
      xhr(
        RouterEventMethod.GET,
        canonicalizeUrl(validateUrl('')),
        null,
        0,
        new Cancellation<Error>())
        .then(m => m.fmap(res => {
          assert(res.xhr instanceof XMLHttpRequest);
          assert(res.response.url === canonicalizeUrl(validateUrl('')));
          assert(res.response.headers['Content-Type'] === 'text/html');
          assert(res.response.document instanceof Document);
          done();
        }).extract());
    });

    it.skip('timeout', done => {
      xhr(
        RouterEventMethod.GET,
        canonicalizeUrl(validateUrl('?timeout')),
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
        canonicalizeUrl(validateUrl('')),
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
        canonicalizeUrl(validateUrl('')),
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
        .filter(types => !types.every(type => !type))
        .extract()
        .forEach(([a, b]) =>
          assert(!match(a, b || '')));
    });

  });

});
