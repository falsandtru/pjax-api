import { RouterEntity } from '../model/eav/entity';
import { RouterEventType } from '../../event/router';
import { Response } from '../model/eav/value/fetch';
import { xhr } from '../module/fetch/xhr';
import { Either } from 'spica/either';
import { wait } from 'spica/timer';

export async function fetch(
  {
    event,
    config,
    state,
  }: RouterEntity,
): Promise<Either<Error, readonly [Response, 'seq:fetch']>> {
  const headers = new Headers(config.fetch.headers);
  headers.has('Accept') || headers.set('Accept', 'text/html');
  headers.has('X-Pjax') || headers.set('X-Pjax', JSON.stringify(config.areas));
  const memory = event.type === RouterEventType.Popstate
    ? config.memory?.get(event.location.dest.path)
    : undefined;
  const [seq, res] = await Promise.all([
    config.sequence.fetch(undefined, {
      path: event.request.url.path,
      method: event.request.method,
      headers,
      body: event.request.body,
    }),
    xhr(
      event.request.method,
      event.request.url,
      event.location.orig,
      headers,
      event.request.body,
      config.fetch.timeout,
      state.process,
      config.fetch.rewrite,
      // 遷移成功後に遷移可能性が自然に壊れることはないため検査不要
      memory),
    wait(config.fetch.wait),
    window.dispatchEvent(new Event('pjax:fetch')),
  ]);
  return res
    .bind(state.process.either)
    .fmap(res => [res, seq] as const);
}
