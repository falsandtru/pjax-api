import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { Config } from '../../data/config';
import { RouterEventRequest } from '../../event/router';
import { FetchResult } from '../model/eav/value/fetch';
import { SequenceData } from '../../data/config';
import { xhr } from '../module/fetch/xhr';
import { DomainError } from '../../data/error';
import { URL } from '../../../../lib/url';

type Result = Either<Error, ResultData>;
type ResultData = [FetchResult, SequenceData.Fetch];

export async function fetch(
  {
    method,
    url,
    data,
  }: RouterEventRequest,
  {
    fetch: {
      timeout,
      wait
    },
    sequence
  }: Config,
  process: Cancellee<Error>
): Promise<Result> {
  const req = xhr(method, url, data, timeout, process);
  void window.dispatchEvent(new Event('pjax:fetch'));
  const [res, seq] = await Promise.all([
    req,
    sequence.fetch(void 0, {
      host: '',
      path: new URL(url).path,
      method,
      data
    }),
    new Promise<void>(resolve => void setTimeout(resolve, wait))
  ]);
  return res
    .bind(process.either)
    .bind<ResultData>(result =>
      result.response.url === '' || new URL(result.response.url).origin === new URL(url).origin
        ? Right<ResultData>([result, seq])
        : Left(new DomainError(`Request is redirected to the different domain url ${new URL(result.response.url).href}`)));
}
