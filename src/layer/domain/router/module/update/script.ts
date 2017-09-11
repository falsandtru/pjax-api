import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { concat } from 'spica/concat';
import { find } from '../../../../../lib/dom';
import { FatalError } from '../../../../../lib/error';
import { StandardUrl, standardizeUrl } from '../../../../data/model/domain/url';

type Response = [HTMLScriptElement, string];

export async function script(
  documents: {
    src: Document;
    dst: Document;
  },
  skip: ReadonlySet<StandardUrl>,
  selector: {
    ignore: string;
    reload: string;
    logger: string;
  },
  cancellation: Cancellee<Error>,
  io = {
    fetch,
    evaluate,
  }
): Promise<Either<Error, HTMLScriptElement[]>> {
  const scripts = find(documents.src, 'script')
    .filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script/i.test(el.type))
    .filter(el => !el.matches(selector.ignore.trim() || '_'))
    .filter(el =>
      el.hasAttribute('src')
        ? !skip.has(standardizeUrl(el.src)) || el.matches(selector.reload.trim() || '_')
        : true);
  return run(await Promise.all(request(scripts)));

  function request(scripts: HTMLScriptElement[]): Promise<Either<Error, Response>>[] {
    return scripts
      .reduce<Promise<Either<Error, Response>>[]>((rs, script) =>
        concat(rs, [io.fetch(script)])
      , []);
  }

  function run(responses: Either<Error, Response>[]): Either<Error, HTMLScriptElement[]> {
    return responses
      .reduce<Either<Error, HTMLScriptElement[]>>((acc, m) =>
        acc
          .bind(cancellation.either)
          .bind(scripts =>
            m
              .bind(res =>
                io.evaluate(res, selector.logger))
              .fmap(script =>
                concat(scripts, [script])))
      , Right([]));
  }
}

async function fetch(script: HTMLScriptElement): Promise<Either<Error, Response>> {
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
                () => void resolve(Right<Response>([script, xhr.response as string])));
            default:
              return void xhr.addEventListener(
                type,
                () => void resolve(Left(new Error(`${script.src}: ${xhr.statusText}`))));
          }
        }));
  }
  else {
    return Right<Response>([script, script.text]);
  }
}
export { fetch as _fetch }

function evaluate([script, code]: Response, logger: string): Either<Error, HTMLScriptElement> {
  assert(script.hasAttribute('src') ? script.childNodes.length === 0 : script.text === code);
  assert(script.textContent === script.text);
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
  try {
    void (0, eval)(code);
    script.hasAttribute('src') && void script.dispatchEvent(new Event('load'));
    return Right(script);
  }
  catch (reason) {
    script.hasAttribute('src') && void script.dispatchEvent(new Event('error'));
    return Left(new FatalError(reason instanceof Error ? reason.message : reason + ''));
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
      : void 0);
}
