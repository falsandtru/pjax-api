import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { tuple } from 'spica/tuple';
import { find } from '../../../../../lib/dom';
import { FatalError } from '../../../../../lib/error';
import { URL } from '../../../../../lib/url';
import { StandardUrl, standardizeUrl } from '../../../../data/model/domain/url';
import { html } from 'typed-dom';

type Response = [HTMLScriptElement, string];

export async function script(
  documents: {
    src: Document;
    dst: Document;
  },
  skip: ReadonlySet<URL.Absolute<StandardUrl>>,
  selector: {
    ignore: string;
    reload: string;
    logger: string;
  },
  timeout: number,
  fallback: (target: HTMLScriptElement) => Promise<HTMLScriptElement>,
  cancellation: Cancellee<Error>,
  io = {
    fetch,
    evaluate,
  }
): Promise<Either<Error, [HTMLScriptElement[], Promise<HTMLScriptElement[]>]>> {
  const scripts = find(documents.src, 'script')
    .filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type))
    .filter(el => !el.matches(selector.ignore.trim() || '_'))
    .filter(el =>
      el.hasAttribute('src')
        ? !skip.has(new URL(standardizeUrl(el.src)).href) || el.matches(selector.reload.trim() || '_')
        : true);
  return run(await Promise.all(request(scripts)));

  function request(scripts: HTMLScriptElement[]): Promise<Either<Error, Response>>[] {
    return scripts
      .map(script =>
        io.fetch(script, timeout, fallback));
  }

  function run(responses: Either<Error, Response>[]): Either<Error, [HTMLScriptElement[], Promise<HTMLScriptElement[]>]> {
    return responses
      .reduce(
        (results, m) => m.bind(() => results),
        responses
          .reduce((results, m) =>
            results
              .bind(cancellation.either)
              .bind(([ss, ps]) => m
                .fmap(([script, code]) =>
                  io.evaluate(script, code, selector.logger, skip, Promise.all(ps), fallback, cancellation))
                .bind(m =>
                  m.extract(
                    m => m.fmap(s => tuple([ss.concat([s]), ps])),
                    p => Right(tuple([ss, ps.concat([p])])))))
          , Right<Error, [HTMLScriptElement[], Promise<Either<Error, HTMLScriptElement>>[]]>([[], []])))
      .fmap(([ss, ps]) =>
        [
          ss,
          Promise.all(ps)
            .then(ms => ms
              .reduce((acc, m) => acc
                .bind(scripts => m
                  .fmap(script =>
                    scripts.concat([script])))
              , Right([]) as Either<Error, HTMLScriptElement[]>)
              .extract()),
        ]);
  }
}

async function fetch(script: HTMLScriptElement, timeout: number, fallback: (target: HTMLScriptElement) => Promise<HTMLScriptElement>): Promise<Either<Error, Response>> {
  if (script.hasAttribute('src')) {
    if (script.type.toLowerCase() === 'module') return Right<Response>([script, '']);
    const xhr = new XMLHttpRequest();
    void xhr.open('GET', script.src, true);
    xhr.timeout = timeout;
    void xhr.send();
    return new Promise<Either<Error, Response>>(resolve =>
      ['load', 'abort', 'error', 'timeout']
        .forEach(type => {
          switch (type) {
            case 'load':
              return void xhr.addEventListener(
                type,
                () => void resolve(Right<Response>([script, xhr.response as string])));
            default:
              return void xhr.addEventListener(
                type,
                () =>
                  type === 'error' && script.matches('[src][async]')
                    ? void resolve(retry(script, fallback).catch(() => Left(new Error(`${script.src}: ${xhr.statusText}`))))
                    : void resolve(Left(new Error(`${script.src}: ${xhr.statusText}`))));
          }
        }));
  }
  else {
    return Right<Response>([script, script.text]);
  }
}
export { fetch as _fetch }

function evaluate(
  script: HTMLScriptElement,
  code: string,
  logger: string,
  skip: ReadonlySet<URL.Absolute<StandardUrl>>,
  wait: Promise<any>,
  fallback: (target: HTMLScriptElement) => Promise<HTMLScriptElement>,
  cancellation: Cancellee<Error>,
): Either<Either<Error, HTMLScriptElement>, Promise<Either<Error, HTMLScriptElement>>> {
  assert(script.hasAttribute('src') ? script.childNodes.length === 0 : script.text === code);
  assert(script.textContent === script.text);
  assert(!cancellation.canceled);
  script = script.ownerDocument === document
    ? script // only for testing
    : document.importNode(script.cloneNode(true), true) as HTMLScriptElement;
  const logging = !!script.parentElement && script.parentElement.matches(logger.trim() || '_');
  const container = document.querySelector(
    logging
      ? script.parentElement!.id
        ? `#${script.parentElement!.id}`
        : script.parentElement!.tagName
      : '_') || document.body;
  assert(container.closest('html') === document.documentElement);
  const unescape = escape(script);
  void container.appendChild(script);
  void unescape();
  !logging && void script.remove();
  const url = new URL(standardizeUrl(window.location.href));
  if (script.type.toLowerCase() === 'module') {
    return Right(wait.then(() => import(script.src))
      .catch(reason =>
        reason.message.startsWith('Failed to load ') && script.matches('[src][async]')
          ? retry(script, fallback)
          : Promise.reject(reason))
      .then(
        () => (
          void script.dispatchEvent(new Event('load')),
          Right(script)),
        reason => (
          void script.dispatchEvent(new Event('error')),
          Left(new FatalError(reason instanceof Error ? reason.message : reason + '')))));
  }
  else {
    if (script.hasAttribute('defer')) return Right(wait.then(evaluate));
    if (script.hasAttribute('async')) return Right(Promise.resolve().then(evaluate));
    return Left(evaluate());
  }

  function evaluate(): Either<Error, HTMLScriptElement> {
    if (cancellation.canceled) return cancellation.either(script);
    try {
      if (new URL(standardizeUrl(window.location.href)).path !== url.path) throw new FatalError('Expired.');
      if (skip.has(new URL(standardizeUrl(window.location.href)).href)) throw new FatalError('Expired.');
      void (0, eval)(code);
      script.hasAttribute('src') && void script.dispatchEvent(new Event('load'));
      return Right(script);
    }
    catch (reason) {
      script.hasAttribute('src') && void script.dispatchEvent(new Event('error'));
      return Left(new FatalError(reason instanceof Error ? reason.message : reason + ''));
    }
  }
}
export { evaluate as _evaluate }

export function escape(script: HTMLScriptElement): () => undefined {
  const src: string | null = script.hasAttribute('src') ? script.getAttribute('src') : null;
  const code = script.text;
  void script.removeAttribute('src');
  script.text = '';
  return () => (
    script.text = ' ',
    script.text = code,
    typeof src === 'string'
      ? void script.setAttribute('src', src)
      : undefined);
}

function retry(script: HTMLScriptElement, fallback: (target: HTMLScriptElement) => Promise<HTMLScriptElement>): Promise<Either<Error, Response>> {
  return fallback(html('script', Object.values(script.attributes).reduce((o, { name, value }) => (o[name] = value, o), {}), [...script.childNodes]))
    .then(() => Right<Response>([script, '']));
}
