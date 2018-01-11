import { xhr, match } from './xhr';
import { RouterEventMethod } from '../../../event/router';
import { standardizeUrl } from '../../../../data/model/domain/url';
import { Cancellation } from 'spica/cancellation';
import { Sequence } from 'spica/sequence';

describe('Unit: layer/domain/router/module/fetch/xhr', () => {
  describe('xhr', () => {
    it('success', done => {
      xhr(
        RouterEventMethod.GET,
        standardizeUrl(''),
        null,
        0,
        p => p,
        new Cancellation<Error>())
        .then(m => m.fmap(res => {
          assert(res.xhr instanceof XMLHttpRequest);
          assert(res.response.url === standardizeUrl(''));
          assert(res.response.header('Content-Type') === 'text/html');
          assert(res.response.document instanceof Document);
          done();
        }).extract());
    });

    it.skip('timeout', done => {
      xhr(
        RouterEventMethod.GET,
        standardizeUrl('?timeout'),
        null,
        1,
        p => p,
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
        standardizeUrl(''),
        null,
        0,
        p => p,
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
        standardizeUrl(''),
        null,
        0,
        p => p,
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
