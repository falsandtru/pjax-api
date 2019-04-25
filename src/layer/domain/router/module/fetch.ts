import { Config } from '../../data/config';
import { RouterEventRequest } from '../../event/router';
import { FetchResponse } from '../model/eav/value/fetch';
import { xhr } from '../module/fetch/xhr';
import { Cancellee } from 'spica/cancellation';
import { Either } from 'spica/either';
import { wait as sleep } from 'spica/clock';

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
  void window.dispatchEvent(new Event('pjax:fetch'));
  const [seq, res] = await Promise.all([
    sequence.fetch(undefined, {
      path: url.path,
      method,
      headers,
      body,
    }),
    xhr(method, url, headers, body, timeout, rewrite, cache, process),
    sleep(wait),
  ]);
  return res
    .bind(process.either)
    .fmap(res => [res, seq] as const);
}
