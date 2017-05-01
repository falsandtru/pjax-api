import { Cancelable, Sequence, Either, Left, Right } from 'spica';
import { RouterEventMethod } from '../../../event/router';
import { FetchResult } from '../../model/eav/value/fetch';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';
import { DomainError } from '../../../data/error';

const ContentType = 'text/html';

export function xhr(
  method: RouterEventMethod,
  url: CanonicalUrl,
  data: FormData | null,
  setting: {
    timeout: number;
    wait: number;
  },
  cancelable: Cancelable<Error>
): Promise<Either<Error, FetchResult>> {
  const xhr = new XMLHttpRequest();
  const wait = new Promise<void>(resolve => setTimeout(resolve, setting.wait));
  return new Promise<Either<Error, FetchResult>>(resolve => (
    void xhr.open(method, url, true),
    xhr.responseType = /chrome|firefox/i.test(window.navigator.userAgent) && !/edge/i.test(window.navigator.userAgent)
      ? 'document'
      : 'text',
    xhr.timeout = setting.timeout,
    void xhr.setRequestHeader('X-Pjax', '1'),
    void xhr.send(data),

    void xhr.addEventListener("abort", () =>
      void handle(
        cancelable,
        () => void resolve(Left(new DomainError(`Failed to request by abort.`))),
        err => void resolve(Left(err)))),

    void xhr.addEventListener("error", () =>
      void handle(
        cancelable,
        () => void resolve(Left(new DomainError(`Failed to request by error.`))),
        err => void resolve(Left(err)))),

    void xhr.addEventListener("timeout", () =>
      void handle(
        cancelable,
        () => void resolve(Left(new DomainError(`Failed to request by timeout.`))),
        err => void resolve(Left(err)))),

    void xhr.addEventListener("load", () =>
      void handle(
        cancelable,
        () =>
          void verify(xhr)
            .extract(
              err => void resolve(Left(err)),
              xhr => void resolve(Right(new FetchResult(xhr)))),
        err => void resolve(Left(err)))),

    void cancelable.listeners.add(() => void xhr.abort())))
    .then(v => wait.then(() => v));

  function handle<e>(state: Cancelable<e>, done: () => void, fail: (e: e) => void): undefined {
    return void state.either(0)
      .extract(fail, done);
  }
}

function verify(xhr: XMLHttpRequest): Either<Error, XMLHttpRequest> {
  return Right(xhr)
    .bind(xhr =>
      /2..|304/.test(`${xhr.status}`)
        ? Right(xhr)
        : Left(new DomainError(`Faild to validate a content type of response.`)))
    .bind(xhr =>
      match(xhr.getResponseHeader('Content-Type'), ContentType)
        ? Right(xhr)
        : Left(new DomainError(`Faild to validate a content type of response.`)));
}

export function match(actualContentType: string | null, expectedContentType: string): boolean {
  assert(actualContentType === null || actualContentType.split(':').length === 1);
  return Sequence
    .intersect(
      Sequence.from(parse(actualContentType || '').sort()),
      Sequence.from(parse(expectedContentType).sort()),
      (a, b) => a.localeCompare(b))
    .take(1)
    .extract()
    .length > 0;

  function parse(headerValue: string): string[] {
    return headerValue.split(';')
      .map(type => type.trim())
      .filter(type => type.length > 0);
  }
}
