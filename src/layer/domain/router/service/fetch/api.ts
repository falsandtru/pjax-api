import { Cancelable, Either, Left, Right } from 'spica';
import { RouterEntity } from '../../model/eav/entity';
import { FetchResult } from '../../model/eav/value/fetch';
import { xhr } from '../../module/fetch/xhr';
import { DomainError } from '../../../data/error';
import { Url } from '../../../../../lib/url';

type Result = Either<Error, [FetchResult, void]>;

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
  const state = await sequence.fetch(void 0, {
    host: '',
    path: new Url(url).path,
    method,
    data
  });
  return (await req)
    .bind<[FetchResult, void]>(result =>
      result.response.url === '' || new Url(result.response.url).domain === new Url(url).domain
        ? Right<[FetchResult, void]>([result, state])
        : Left(new DomainError(`Request is redirected to the different domain url ${new Url(result.response.url).href}`)));
}
