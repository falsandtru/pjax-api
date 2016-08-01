import { Cancelable, Either } from 'spica';
import { RouterEvent } from '../../../event/router';
import { FetchValue } from '../../model/eav/value/fetch';
import { xhr } from '../../module/fetch/xhr';

export function fetch(
  {
    method,
    url,
    data,
  }: RouterEvent.Request,
  setting: {
    timeout: number;
    wait: number;
  },
  cancelable: Cancelable<Error>
): Promise<Either<Error, FetchValue>> {
  const promise = xhr(method, url, data, setting, cancelable);
  void window.dispatchEvent(new Event('pjax:fetch'));
  return promise;
}
