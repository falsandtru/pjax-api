import { Config } from '../../data/config';
import { RouterEvent, RouterEventType } from '../../event/router';
import { Response } from '../model/eav/value/fetch';
import { xhr } from '../module/fetch/xhr';
import { Cancellee } from 'spica/cancellation';
import { Either } from 'spica/either';
import { wait as delay } from 'spica/timer';

export async function fetch(
  {
    type,
    location,
    request: {
      method,
      url,
      body,
    },
  }: RouterEvent,
  {
    areas,
    memory,
    fetch: {
      rewrite,
      headers,
      timeout,
      wait,
    },
    sequence,
  }: Config,
  process: Cancellee<Error>,
): Promise<Either<Error, readonly [Response, 'seq:fetch']>> {
  headers = new Headers(headers);
  headers.has('Accept') || headers.set('Accept', 'text/html');
  headers.has('X-Pjax') || headers.set('X-Pjax', JSON.stringify(areas));
  const mem = type === RouterEventType.Popstate
    ? memory?.get(location.dest.path)
    : undefined;
  const [seq, res] = await Promise.all([
    sequence.fetch(undefined, {
      path: url.path,
      method,
      headers,
      body,
    }),
    xhr(method, url, location.orig, headers, body, timeout, process, rewrite, mem),
    delay(wait),
    window.dispatchEvent(new Event('pjax:fetch')),
  ]);
  return res
    .bind(process.either)
    .fmap(res => [res, seq] as const);
}
