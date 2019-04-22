import { AtomicPromise } from 'spica/promise';
import { Cancellee } from 'spica/cancellation';
import { Sequence } from 'spica/sequence';
import { Either, Left, Right } from 'spica/either';
import { Cache } from 'spica/cache';
import { RouterEventMethod } from '../../../event/router';
import { FetchResponse } from '../../model/eav/value/fetch';
import { DomainError } from '../../../data/error';
import { URL, StandardURL, standardizeURL } from '../../../../../lib/url';

const memory = new Cache<string, (displayURL: URL<StandardURL>, requestURL: URL<StandardURL>) => FetchResponse>(99);

export function xhr(
  method: RouterEventMethod,
  displayURL: URL<StandardURL>,
  headers: Headers,
  body: FormData | null,
  timeout: number,
  rewrite: (path: URL.Path<StandardURL>) => string,
  cache: (path: string, headers: Headers) => string,
  cancellation: Cancellee<Error>
): AtomicPromise<Either<Error, FetchResponse>> {
  void headers.set('Accept', headers.get('Accept') || 'text/html');
  const requestURL = new URL(standardizeURL(rewrite(displayURL.path)));
  const key = method === 'GET'
    ? cache(requestURL.path, headers) || undefined
    : undefined;
  return new AtomicPromise<Either<Error, FetchResponse>>(resolve => {
    if (key && memory.has(key)) return resolve(Right(memory.get(key)!(displayURL, requestURL)));
    const xhr = new XMLHttpRequest();
    void xhr.open(method, requestURL.path, true);
    for (const [name, value] of headers) {
      void xhr.setRequestHeader(name, value);
    }

    xhr.responseType = 'document';
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
          (overriddenDisplayURL: URL<StandardURL>, overriddenRequestURL: URL<StandardURL>) =>
            new FetchResponse(
              !xhr.responseURL || standardizeURL(xhr.responseURL) === overriddenRequestURL.href
                ? overriddenDisplayURL
                : overriddenRequestURL.href === requestURL.href || !key
                    ? new URL(standardizeURL(xhr.responseURL))
                    : overriddenDisplayURL,
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
        : Left(new DomainError(`Failed to validate the status of response.`)))
    .bind(xhr =>
      match(xhr.getResponseHeader('Content-Type'), 'text/html')
        ? Right(xhr)
        : Left(new DomainError(`Failed to validate the content type of response.`)));
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
