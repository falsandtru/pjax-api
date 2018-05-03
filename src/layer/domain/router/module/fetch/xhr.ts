import { Cancellee } from 'spica/cancellation';
import { Sequence } from 'spica/sequence';
import { Either, Left, Right } from 'spica/either';
import { RouterEventMethod } from '../../../event/router';
import { FetchResponse } from '../../model/eav/value/fetch';
import { StandardUrl, standardizeUrl } from '../../../../data/model/domain/url';
import { DomainError } from '../../../data/error';
import { URL } from '../../../../../lib/url';

export function xhr(
  method: RouterEventMethod,
  url: StandardUrl,
  headers: Headers,
  body: FormData | null,
  timeout: number,
  redirect: (path: URL.Path<StandardUrl>) => string,
  cancellation: Cancellee<Error>
): Promise<Either<Error, FetchResponse>> {
  const url_ = standardizeUrl(redirect(new URL(url).path));
  const xhr = new XMLHttpRequest();
  return new Promise<Either<Error, FetchResponse>>(resolve => (
    void xhr.open(method, new URL(url_).path, true),
    void [...headers.entries()]
      .forEach(([name, value]) =>
        void xhr.setRequestHeader(name, value)),

    xhr.responseType = 'document',
    xhr.timeout = timeout,
    void xhr.send(body),

    void xhr.addEventListener("abort", () =>
      void resolve(Left(new DomainError(`Failed to request a page by abort.`)))),

    void xhr.addEventListener("error", () =>
      void resolve(Left(new DomainError(`Failed to request a page by error.`)))),

    void xhr.addEventListener("timeout", () =>
      void resolve(Left(new DomainError(`Failed to request a page by timeout.`)))),

    void xhr.addEventListener("load", () =>
      void verify(xhr)
        .fmap(xhr =>
          new FetchResponse(
            xhr.responseURL && url === url_
              ? standardizeUrl(xhr.responseURL)
              : url,
            xhr))
        .extract(
          err => void resolve(Left(err)),
          res => void resolve(Right(res)))),

    void cancellation.register(() => void xhr.abort())));
}

function verify(xhr: XMLHttpRequest): Either<Error, XMLHttpRequest> {
  return Right<Error, XMLHttpRequest>(xhr)
    .bind(xhr =>
      /2..|304/.test(`${xhr.status}`)
        ? Right(xhr)
        : Left(new DomainError(`Faild to validate the status of response.`)))
    .bind(xhr =>
      match(xhr.getResponseHeader('Content-Type'), 'text/html')
        ? Right(xhr)
        : Left(new DomainError(`Faild to validate the content type of response.`)));
}

function match(actualContentType: string | null, expectedContentType: string): boolean {
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
export { match as match_ }
