import { Cancelable, Either, Left, Right, concat } from 'spica';
import { find } from '../../../../../lib/dom';
import { canonicalizeUrl, CanonicalUrl } from '../../../../data/model/canonicalization/url';
import { validateUrl } from '../../../../data/model/validation/url';

type Response = [HTMLScriptElement, string];

export function script(
  document: {
    src: Document;
    dst: Document;
  },
  skip: CanonicalUrl[],
  selector: {
    ignore: string;
    reload: string;
    logger: string;
  },
  cancelable: Cancelable<Error>,
  io = {
    request,
    evaluate,
    log
  }
): Promise<Either<Error, HTMLScriptElement[]>> {
  const scripts: HTMLScriptElement[] = find<HTMLScriptElement>(document.src, 'script')
    .filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script/i.test(el.type))
    .filter(el => !el.matches(selector.ignore.trim() || '_'))
    .filter(el =>
      el.hasAttribute('src')
        ? skip.indexOf(canonicalizeUrl(validateUrl(el.src))) === -1 || el.matches(selector.reload.trim() || '_')
        : true);
  return new Promise<Either<Error, HTMLScriptElement[]>>((resolve, reject) => (
    void Promise.all(
      scripts
        .reduce<Promise<Either<Error, Response>>[]>((rs, script) =>
          concat(rs, [io.request(script)])
        , []))
      .then(rs =>
        rs
          .reduce<Either<Error, HTMLScriptElement[]>>((acc, m) =>
            m.bind(res => run(acc, res))
          , Right([])))
      .then(resolve, reject)));

  function run(
    state: Either<Error, HTMLScriptElement[]>,
    response: Response
  ): Either<Error, HTMLScriptElement[]> {
    return state
      .bind(cancelable.either)
      .bind<HTMLScriptElement[]>(scripts =>
        io.evaluate(response)
          .fmap(script => (
            script.parentElement.matches(selector.logger.trim() || '_')
              ? void io.log(script, document.dst)
              : void 0,
            scripts.concat([script]))));
  }
}

export function escape(script: HTMLScriptElement): () => undefined {
  const src: string | null = script.hasAttribute('src') ? script.getAttribute('src') : null;
  const code = script.innerHTML;
  void script.removeAttribute('src');
  script.innerHTML = '';
  return () => (
    script.innerHTML = ' ',
    script.innerHTML = code,
    typeof src === 'string'
      ? void script.setAttribute('src', src)
      : void 0);
}

function request(script: HTMLScriptElement): Promise<Either<Error, Response>> {
  if (script.hasAttribute('src')) {
    const xhr = new XMLHttpRequest();
    void xhr.open('GET', script.src, true);
    void xhr.send();
    return new Promise<Either<Error, Response>>(resolve =>
      ['load', 'abort', 'error', 'timeout']
        .forEach(type => {
          switch (type) {
            case 'load':
              return void xhr.addEventListener(
                type,
                () => void resolve(Right<Response>([script, <string>xhr.response])));
            default:
              return void xhr.addEventListener(
                type,
                () => void resolve(Left(new Error(`${script.src}: ${xhr.statusText}`))));
          }
        }));
  }
  else {
    return Promise.resolve(Right<Response>([script, script.innerHTML]));
  }
}
export { request as _request }

function evaluate([script, code]: Response): Either<Error, HTMLScriptElement> {
  try {
    void eval(code);

    if (script.hasAttribute('src')) {
      void script.dispatchEvent(new Event('load'));
    }
    return Right(script);
  }
  catch (err) {
    if (script.hasAttribute('src')) {
      void script.dispatchEvent(new Event('error'));
    }
    return Left(err);
  }
}
export { evaluate as _evaluate }

function log(script: HTMLScriptElement, document: Document): boolean {
  return find(document, script.parentElement.id ? `#${script.parentElement.id}` : script.parentElement.tagName)
    .slice(-1)
    .reduce((_, parent) => {
      script = <HTMLScriptElement>document.importNode(script.cloneNode(true), true);
      const unescape = escape(script);
      void parent.appendChild(script);
      void unescape();
      return true;
    }, false);
}
export { log as _log }
