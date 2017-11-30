import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { tuple } from 'spica/tuple';
import { Config } from '../../data/config';
import { RouterEventRequest } from '../../event/router';
import { FetchResult } from '../model/eav/value/fetch';
import { SequenceData } from '../../data/config';
import { xhr } from '../module/fetch/xhr';
import { DomainError } from '../../data/error';
import { URL } from '../../../../lib/url';

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
): Promise<Either<Error, [FetchResult, SequenceData.Fetch]>> {
  const req = xhr(method, url, data, timeout, process);
  void window.dispatchEvent(new Event('pjax:fetch'));
  const [res, seq] = await Promise.all([
    req,
    sequence.fetch(undefined, {
      path: new URL(url).path,
      method,
      data
    }),
    new Promise<void>(resolve => void setTimeout(resolve, wait))
  ]);
  return res
    .bind(process.either)
    .bind(result =>
      result.response.url === '' || new URL(result.response.url).origin === new URL(url).origin
        ? Right(tuple([result, seq]))
        : Left(new DomainError(`Request is redirected to the different domain url ${new URL(result.response.url).href}`)));
}
