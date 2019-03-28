import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { wait as sleep } from 'spica/clock';
import { Config } from '../../data/config';
import { RouterEventRequest } from '../../event/router';
import { FetchResponse } from '../model/eav/value/fetch';
import { xhr } from '../module/fetch/xhr';
import { DomainError } from '../../data/error';
import { URL } from '../../../../lib/url';

export async function fetch(
  {
    method,
    url,
    body,
  }: RouterEventRequest,
  {
    fetch: {
      rewrite,
      cache,
      headers,
      timeout,
      wait,
    },
    sequence,
  }: Config,
  process: Cancellee<Error>
): Promise<Either<Error, readonly [FetchResponse, 'fetch']>> {
  const req = xhr(method, url, headers, body, timeout, rewrite, cache, process);
  void window.dispatchEvent(new Event('pjax:fetch'));
  const [res, seq] = await Promise.all([
    req,
    sequence.fetch(undefined, {
      path: new URL(url).path,
      method,
      headers,
      body,
    }),
    sleep(wait),
  ]);
  return res
    .bind(process.either)
    .bind(res =>
      new URL(res.url).origin === new URL(url).origin
        ? Right([res, seq] as const)
        : Left(new DomainError(`Request is redirected to the different domain url ${new URL(res.url).href}`)));
}
