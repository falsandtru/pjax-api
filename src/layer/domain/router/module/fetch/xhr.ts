import { Cancellee } from 'spica/cancellation';
import { Sequence } from 'spica/sequence';
import { Either, Left, Right } from 'spica/either';
import { RouterEventMethod } from '../../../event/router';
import { FetchResult } from '../../model/eav/value/fetch';
import { StandardUrl } from '../../../../data/model/domain/url';
import { DomainError } from '../../../data/error';

const ContentType = 'text/html';

export function xhr(
  method: RouterEventMethod,
  url: StandardUrl,
  data: FormData | null,
  timeout: number,
  cancellation: Cancellee<Error>
): Promise<Either<Error, FetchResult>> {
  const xhr = new XMLHttpRequest();
  return new Promise<Either<Error, FetchResult>>(resolve => (
    void xhr.open(method, url, true),

    xhr.responseType = /chrome|firefox/i.test(window.navigator.userAgent) && !/edge/i.test(window.navigator.userAgent)
      ? 'document'
      : 'text',
    xhr.timeout = timeout,
    void xhr.setRequestHeader('X-Pjax', '1'),
    void xhr.send(data),

    void xhr.addEventListener("abort", () =>
      void resolve(Left(new DomainError(`Failed to request by abort.`)))),

    void xhr.addEventListener("error", () =>
      void resolve(Left(new DomainError(`Failed to request by error.`)))),

    void xhr.addEventListener("timeout", () =>
      void resolve(Left(new DomainError(`Failed to request by timeout.`)))),

    void xhr.addEventListener("load", () =>
      void verify(xhr)
        .extract(
          err => void resolve(Left(err)),
          xhr => void resolve(Right(new FetchResult(xhr))))),

    void cancellation.register(() => void xhr.abort())));
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
