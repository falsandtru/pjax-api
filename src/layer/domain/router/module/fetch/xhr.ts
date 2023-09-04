import { RouterEventMethod } from '../../../event/router';
import { Response } from '../../model/eav/value/fetch';
import { Dict } from 'spica/dict';
import { AtomicPromise } from 'spica/promise';
import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { URL, StandardURL, standardize } from 'spica/url';

export function xhr(
  method: RouterEventMethod,
  displayURL: URL<StandardURL>,
  base: URL<StandardURL>,
  headers: Headers,
  body: FormData | null,
  timeout: number,
  cache: Dict<URL.Path<StandardURL>, { etag: string; expiry: number; xhr: XMLHttpRequest; }>,
  cancellation: Cancellee<Error>,
  rewrite = request,
): AtomicPromise<Either<Error, Response>> {
  headers = new Headers(headers);
  headers.set('Accept', headers.get('Accept') || 'text/html');
  if (method === 'GET' &&
      !headers.has('If-None-Match') &&
      Date.now() > (cache.get(displayURL.path)?.expiry ?? Infinity)) {
    headers.set('If-None-Match', cache.get(displayURL.path)!.etag);
  }
  return new AtomicPromise<Either<Error, Response>>(resolve => {
    const xhr = rewrite(displayURL.path, method, headers, timeout, body);

    if (xhr.responseType !== 'document') throw new Error(`Response type must be 'document'`);

    xhr.addEventListener("abort", () =>
      void resolve(Left(new Error(`Failed to request a page by abort`))));

    xhr.addEventListener("error", () =>
      void resolve(Left(new Error(`Failed to request a page by error`))));

    xhr.addEventListener("timeout", () =>
      void resolve(Left(new Error(`Failed to request a page by timeout`))));

    xhr.addEventListener("load", () =>
      void verify(base, method, xhr, cache)
        .fmap(xhr => {
          const responseURL: URL<StandardURL> = new URL(standardize(xhr.responseURL, base.href));
          assert(responseURL.origin === new URL('', window.location.origin).origin);
          if (method === 'GET') {
            const cc = new Map<string, string>(
              xhr.getResponseHeader('Cache-Control')
                // eslint-disable-next-line redos/no-vulnerable
                ? xhr.getResponseHeader('Cache-Control')!.trim().split(/\s*,\s*/)
                    .filter(v => v.length > 0)
                    .map(v => v.split('=').concat('') as [string, string])
                : []);
            for (const path of new Set([displayURL.path, responseURL.path])) {
              if (xhr.getResponseHeader('ETag') && !cc.has('no-store')) {
                cache.set(path, {
                  etag: xhr.getResponseHeader('ETag')!,
                  expiry: cc.has('max-age') && !cc.has('no-cache')
                    ? Date.now() + +cc.get('max-age')! * 1000 || 0
                    : 0,
                  xhr,
                });
              }
              else {
                cache.delete(path);
              }
            }
          }
          return new Response(responseURL, xhr);
        })
        .extract(
          err => void resolve(Left(err)),
          res => void resolve(Right(res))));

    cancellation.register(() => void xhr.abort());
  });
}

function request(
  path: URL.Path<StandardURL>,
  method: RouterEventMethod,
  headers: Headers,
  timeout: number,
  body: FormData | null,
): XMLHttpRequest {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path, true);
  for (const [name, value] of headers) {
    xhr.setRequestHeader(name, value);
  }

  xhr.responseType = 'document';
  xhr.timeout = timeout;
  xhr.send(body);
  return xhr;
}

function verify(
  base: URL<StandardURL>,
  method: RouterEventMethod,
  xhr: XMLHttpRequest,
  cache: Dict<URL.Path<StandardURL>, { etag: string; expiry: number; xhr: XMLHttpRequest; }>,
): Either<Error, XMLHttpRequest> {
  const url = new URL(standardize(xhr.responseURL, base.href));
  switch (true) {
    case !xhr.responseURL:
      return Left(new Error(`Failed to get the response URL`));
    case url.origin !== new URL('', window.location.origin).origin:
      return Left(new Error(`Redirected to another origin`));
    case !/2..|304/.test(`${xhr.status}`):
      return Left(new Error(`Failed to validate the status of response`));
    case !xhr.response:
      return method === 'GET' && xhr.status === 304 && cache.has(url.path)
        ? Right(cache.get(url.path)!.xhr)
        : Left(new Error(`Failed to get the response body`));
    case !match(xhr.getResponseHeader('Content-Type'), 'text/html'):
      return Left(new Error(`Failed to validate the content type of response`));
    default:
      return Right(xhr);
  }
}

function match(actualContentType: string | null, expectedContentType: string): boolean {
  assert(actualContentType === null || actualContentType.split(':').length === 1);
  const as = parse(actualContentType || '').sort();
  const es = parse(expectedContentType).sort();
  for (let i = 0, j = 0; i < as.length && j < es.length;) {
    switch (as[i].localeCompare(es[j])) {
      case 0:
        return true;
      case -1:
        ++i;
        continue;
      case 1:
        ++j;
        continue;
      default:
        throw new Error('Unreachable');
    }
  }
  return false;

  function parse(headerValue: string): string[] {
    // eslint-disable-next-line redos/no-vulnerable
    return headerValue.split(/\s*;\s*/)
      .filter(v => v.length > 0);
  }
}
export { match as match_ }
