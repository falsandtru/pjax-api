import { Config } from '../../data/config';
import { RouterEvent, RouterEventType } from '../../event/router';
import { FetchResponse } from '../model/eav/value/fetch';
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
    lock,
    fetch: {
      rewrite,
      cache,
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
): Promise<Either<Error, readonly [FetchResponse, 'fetch']>> {
  void window.dispatchEvent(new Event('pjax:fetch'));
  const { scrollX, scrollY } = window;
  if (type === RouterEventType.Popstate) {
    // 小さな画面でもチラつかない
    style.textContent = lock();
    io.document.documentElement.appendChild(style);
  }
  const [seq, res] = await Promise.all([
    await sequence.fetch(void 0, {
      path: url.path,
      method,
      headers,
      body,
    }),
    xhr(method, url, location.orig, headers, body, timeout, rewrite, cache, process),
    delay(wait),
  ]);
  if (type === RouterEventType.Popstate) {
    style.parentNode?.removeChild(style);
    window.scrollTo(scrollX, scrollY);
  }
  return res
    .bind(process.either)
    .fmap(res => [res, seq] as const);
}
