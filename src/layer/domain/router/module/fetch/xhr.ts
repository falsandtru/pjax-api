import { RouterEventMethod } from '../../../event/router';
import { Response } from '../../model/eav/value/fetch';
import { AtomicPromise } from 'spica/promise';
import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { URL, StandardURL, standardize } from 'spica/url';
import { noop } from 'spica/function';

export function xhr(
  method: RouterEventMethod,
  displayURL: URL<StandardURL>,
  base: URL<StandardURL>,
  headers: Headers,
  body: FormData | null,
  timeout: number,
  cancellation: Cancellee<Error>,
  rewrite: (url: string, method: string, headers: Headers, timeout: number, body: FormData | null, memory?: Document | undefined) => XMLHttpRequest | undefined = noop,
  memory?: Document,
): AtomicPromise<Either<Error, Response>> {
  return new AtomicPromise<Either<Error, Response>>(resolve => {
    const xhr = rewrite(displayURL.href, method, headers, timeout, body, memory) ??
                request(displayURL.href, method, headers, timeout, body);

    if (xhr.responseType !== 'document') throw new Error(`Response type must be 'document'`);

    cancellation.register(() => void xhr.abort());
    timeout && setTimeout(() => xhr.readyState < 3 && xhr.abort(), timeout + 100);

    xhr.addEventListener("abort", () =>
      void resolve(Left(new Error(`Failed to request a page by abort`))));

    xhr.addEventListener("error", () =>
      void resolve(Left(new Error(`Failed to request a page by error`))));

    xhr.addEventListener("timeout", () =>
      void resolve(Left(new Error(`Failed to request a page by timeout`))));

    xhr.addEventListener("load", () =>
      void verify(base, xhr)
        .fmap(xhr => {
          const responseURL: URL<StandardURL> = new URL(
            standardize(restore(xhr.responseURL, displayURL.href), base.href));
          assert(responseURL.origin === new URL('', window.location.origin).origin);
          return new Response(responseURL, xhr);
        })
        .extract(
          err => void resolve(Left(err)),
          res => void resolve(Right(res))));
  });
}

function request(
  url: URL.Href<StandardURL>,
  method: RouterEventMethod,
  headers: Headers,
  timeout: number,
  body: FormData | null,
): XMLHttpRequest {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  for (const [name, value] of headers) {
    xhr.setRequestHeader(name, value);
  }

  xhr.responseType = 'document';
  xhr.timeout = timeout;
  xhr.send(body);
  return xhr;
}

function restore(res: string, req: string): string {
  return !res.includes('#') && req.includes('#')
    ? res + req.slice(req.indexOf('#'))
    : res;
}

function verify(
  base: URL<StandardURL>,
  xhr: XMLHttpRequest,
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
      return Left(new Error(`Failed to get the response body`));
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
