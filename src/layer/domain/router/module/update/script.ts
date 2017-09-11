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
    request,
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
  const requests = scripts
    .reduce<Promise<Either<Error, Response>>[]>((rs, script) =>
      concat(rs, [io.request(script)])
    , []);
  return (await Promise.all(requests))
    .reduce<Either<Error, HTMLScriptElement[]>>((acc, m) =>
      m.bind(res => run(acc, res))
    , Right([]));

  function run(
    state: Either<Error, HTMLScriptElement[]>,
    response: Response
  ): Either<Error, HTMLScriptElement[]> {
    return state
      .bind(cancellation.either)
      .bind<HTMLScriptElement[]>(scripts =>
        io.evaluate(response, selector.logger)
          .fmap(script =>
            scripts.concat([script])));
  }
}

async function request(script: HTMLScriptElement): Promise<Either<Error, Response>> {
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
export { request as _request }

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
