import { Cancelable, Either, Left, Right, HNil } from 'spica';
import { RouterEntity } from '../../model/eav/entity';
import { FetchValue } from '../../model/eav/value/fetch';
import { xhr } from '../../module/fetch/xhr';
import { DomainError } from '../../../data/error';
import { Url } from '../../../../../lib/url';

type Result = Either<Error, [FetchValue, void]>;

export function fetch(
  {
    method,
    url,
    data,
  }: RouterEntity.Event.Request,
  {
    fetch: setting,
    sequence
  }: RouterEntity.Config,
  cancelable: Cancelable<Error>
): Promise<Result> {
  return new HNil()
    .push(xhr(method, url, data, setting, cancelable))
    .modify(p => (
      void window.dispatchEvent(new Event('pjax:fetch')),
      sequence.fetch(void 0, {
        host: '',
        path: new Url(url).path,
        method,
        data
      })
        .then(
          s => p.then<Result>(m => m
            .bind(v =>
              v.response.url === '' || new Url(v.response.url).domain === new Url(url).domain
                ? Right(v)
                : Left(new DomainError(`Request is redirected to the different domain url ${new Url(v.response.url).href}`)))
            .fmap<[FetchValue, void]>(v =>
              [v, s])),
          e => Left<Error>(e instanceof Error ? e : new Error(e)))))
    .head();
}
