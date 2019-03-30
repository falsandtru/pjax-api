import { AtomicPromise } from 'spica/promise';
import { Cancellee } from 'spica/cancellation';
import { Sequence } from 'spica/sequence';
import { Either, Left, Right } from 'spica/either';
import { Cache } from 'spica/cache';
import { RouterEventMethod } from '../../../event/router';
import { FetchResponse } from '../../model/eav/value/fetch';
import { StandardUrl, standardizeUrl } from '../../../../data/model/domain/url';
import { DomainError } from '../../../data/error';
import { URL } from '../../../../../lib/url';

const memory = new Cache<string, (displayURL: URL<StandardUrl>, requestURL: URL<StandardUrl>) => FetchResponse>(99);

export function xhr(
  method: RouterEventMethod,
  url: URL.Absolute<StandardUrl>,
  headers: Headers,
  body: FormData | null,
  timeout: number,
  rewrite: (path: URL.Path<StandardUrl>) => string,
  cache: (path: string, headers: Headers) => string,
  cancellation: Cancellee<Error>
): AtomicPromise<Either<Error, FetchResponse>> {
  void headers.set('Accept', headers.get('Accept') || 'text/html');
  const displayURL = new URL(url);
  const requestURL = new URL(standardizeUrl(rewrite(displayURL.path)));
  const key = method === 'GET'
    ? cache(requestURL.path, headers) || undefined
    : undefined;
  if (key && memory.has(key)) return AtomicPromise.resolve(Right(memory.get(key)!(displayURL, requestURL)));
  const xhr = new XMLHttpRequest();
  return new AtomicPromise<Either<Error, FetchResponse>>(resolve => {
    void xhr.open(method, requestURL.path, true);
    for (const [name, value] of headers) {
      void xhr.setRequestHeader(name, value);
    }

    xhr.timeout = timeout;
    void xhr.send(body);

    void xhr.addEventListener("abort", () =>
      void resolve(Left(new DomainError(`Failed to request a page by abort.`))));

    void xhr.addEventListener("error", () =>
      void resolve(Left(new DomainError(`Failed to request a page by error.`))));

    void xhr.addEventListener("timeout", () =>
      void resolve(Left(new DomainError(`Failed to request a page by timeout.`))));

    void xhr.addEventListener("load", () =>
      void verify(xhr)
        .fmap(xhr =>
          (overriddenDisplayURL: URL<StandardUrl>, overriddenRequestURL: URL<StandardUrl>) =>
            new FetchResponse(
              !xhr.responseURL || standardizeUrl(xhr.responseURL) === overriddenRequestURL.href
                ? overriddenDisplayURL.href
                : overriddenRequestURL.href === requestURL.href || !key
                    ? new URL(standardizeUrl(xhr.responseURL)).href
                    : overriddenDisplayURL.href,
              xhr))
        .fmap(f => {
          if (key) {
            void memory.set(key, f);
          }
          return f(displayURL, requestURL);
        })
        .extract(
          err => void resolve(Left(err)),
          res => void resolve(Right(res))));

    void cancellation.register(() => void xhr.abort());
  });
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
