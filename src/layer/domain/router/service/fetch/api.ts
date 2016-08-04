import { Cancelable, Either, Left, HNil } from 'spica';
import { Sequence } from 'pjax-api';
import { RouterEvent } from '../../../event/router';
import { FetchValue } from '../../model/eav/value/fetch';
import { xhr } from '../../module/fetch/xhr';
import { Url } from '../../../../../lib/url';

type Result = Either<Error, [FetchValue, void]>;

export function fetch(
  {
    method,
    url,
    data,
  }: RouterEvent.Request,
  setting: {
    timeout: number;
    wait: number;
  },
  sequence: Sequence<void, void, void>,
  cancelable: Cancelable<Error>
): Promise<Result> {
  return new HNil()
    .push(xhr(method, url, data, setting, cancelable))
    .modify(p => (
      void window.dispatchEvent(new Event('pjax:fetch')),
      sequence.fetch(void 0, {
        host: '',
        path: new Url(url).path + '',
        method,
        data
      })
        .then<Result>(
          s => p.then<Result>(m => m
            .fmap<[FetchValue, void]>(v =>
              [v, s])),
          e => Left<Error>(e instanceof Error ? e : new Error(e)))))
    .head();
}
