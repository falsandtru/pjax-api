import { Config } from '../../data/config';
import { RouterEvent, RouterEventType } from '../../event/router';
import { Response } from '../model/eav/value/fetch';
import { xhr } from '../module/fetch/xhr';
import { Cancellee } from 'spica/cancellation';
import { Either } from 'spica/either';
import { wait as delay } from 'spica/timer';
import { html } from 'typed-dom/dom';

const style = html('style');

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
    cache,
    fetch: {
      rewrite,
      headers,
      timeout,
      wait,
    },
    sequence,
  }: Config,
  process: Cancellee<Error>,
  io: {
    document: Document;
  }
): Promise<Either<Error, readonly [Response, 'seq:fetch']>> {
  const { scrollX, scrollY } = window;
  if (type === RouterEventType.Popstate) {
    io.document.documentElement.appendChild(style);
  }
  headers = new Headers(headers);
  headers.has('Accept') || headers.set('Accept', 'text/html');
  headers.has('X-Requested-With') || headers.set('X-Requested-With', 'XMLHttpRequest');
  headers.has('X-Pjax') || headers.set('X-Pjax', '1');
  const [seq, res] = await Promise.all([
    sequence.fetch(undefined, {
      path: url.path,
      method,
      headers,
      body,
    }),
    xhr(method, url, location.orig, headers, body, timeout, cache, process, rewrite),
    delay(wait),
    window.dispatchEvent(new Event('pjax:fetch')),
  ]);
  if (type === RouterEventType.Popstate) {
    style.parentNode?.removeChild(style);
    window.scrollTo(scrollX, scrollY);
  }
  return res
    .bind(process.either)
    .fmap(res => [res, seq] as const);
}
