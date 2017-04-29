import { Cancelable, Either, Left, Right } from 'spica';
import { RouterEntity } from '../model/eav/entity';
import { FetchResult } from '../model/eav/value/fetch';
import { Sequence } from '../../data/config';
import { xhr } from '../module/fetch/xhr';
import { DomainError } from '../../data/error';
import { Url } from '../../../../lib/url';

type Result = Either<Error, ResultData>;
type ResultData = [FetchResult, Sequence.Data.Fetch];

export async function fetch(
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
  const req = xhr(method, url, data, setting, cancelable);
  void window.dispatchEvent(new Event('pjax:fetch'));
  const seq = await sequence.fetch(void 0, {
    host: '',
    path: new Url(url).path,
    method,
    data
  });
  return (await req)
    .bind(cancelable.either)
    .bind<ResultData>(result =>
      result.response.url === '' || new Url(result.response.url).domain === new Url(url).domain
        ? Right<ResultData>([result, seq])
        : Left(new DomainError(`Request is redirected to the different domain url ${new Url(result.response.url).href}`)));
}
