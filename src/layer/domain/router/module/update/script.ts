import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { tuple } from 'spica/tuple';
import { concat } from 'spica/concat';
import { find } from '../../../../../lib/dom';
import { FatalError } from '../../../../../lib/error';
import { URL } from '../../../../../lib/url';
import { StandardUrl, standardizeUrl } from '../../../../data/model/domain/url';
import { html } from 'typed-dom';

type Result = Either<Error, [HTMLScriptElement[], Promise<Either<Error, HTMLScriptElement[]>>]>;
type FetchData = [HTMLScriptElement, string];

export function script(
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
  cancellation: Cancellee<Error>,
  io = {
    fetch,
    evaluate,
  }
): Promise<Result> {
  const scripts = find(documents.src, 'script')
    .filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type))
    .filter(el => !el.matches(selector.ignore.trim() || '_'))
    .filter(el =>
      el.hasAttribute('src')
        ? !skip.has(new URL(standardizeUrl(el.src)).href) || el.matches(selector.reload.trim() || '_')
        : true);
  const { ss, as } = scripts.reduce((o, script) => {
    switch (true) {
      case script.matches('[src][async], [src][defer]'):
        void o.as.push(script);
        break;
      default:
        void o.ss.push(script);
    }
    return o;
  }, {
      ss: [] as HTMLScriptElement[],
      as: [] as HTMLScriptElement[],
    });
  return Promise.all([
    Promise.all(request(ss)).then(run),
    Promise.all(request(as)).then(run),
  ])
    .then(async ([sm, am]) =>
      sm.fmap(async p => (await p)
        .fmap(([ss1, ap1]) =>
          tuple([
            ss1,
            ap1.then(async as1 =>
              am.fmap(async p => (await p)
                .fmap(([ss2, ap2]) =>
                  Promise.all([as1, Right<Error, HTMLScriptElement[]>(ss2), ap2])
                    .then(sst =>
                      sst.reduce((m1, m2) =>
                        m1.bind(s1 =>
                          m2.fmap(s2 =>
                            concat(s1, s2))))))
                .extract<Either<Error, HTMLScriptElement[]>>(Left))
                .extract<Either<Error, HTMLScriptElement[]>>(Left)),
          ])))
        .extract<Result>(Left));

  function request(scripts: HTMLScriptElement[]): Promise<Either<Error, FetchData>>[] {
    return scripts
      .map(script =>
        io.fetch(script, timeout));
  }

  function run(responses: Either<Error, FetchData>[]): Either<Error, Promise<Result>> {
    return responses
      .reduce(
        (results, m) => m.bind(() => results),
        responses
          .reduce((results, m) =>
            results
              .bind(cancellation.either)
              .bind(([sp, ap]) => m
                .fmap(([script, code]) =>
                  io.evaluate(script, code, selector.logger, skip, Promise.all(sp), cancellation))
                .bind(m =>
                  m.extract(
                    p => Right(tuple([concat(sp, [p]), ap])),
                    p => Right(tuple([sp, concat(ap, [p])])))))
        , Right<Error, [Promise<Either<Error, HTMLScriptElement>>[], Promise<Either<Error, HTMLScriptElement>>[]]>([[], []])))
      .fmap(([sp, ap]) =>
        Promise.all(sp)
          .then(Either.sequence)
          .then(sm =>
            sm.fmap(ss => tuple([
              ss,
              Promise.all(ap)
                .then(Either.sequence)
            ]))));
  }
}

async function fetch(
  script: HTMLScriptElement,
  timeout: number,
): Promise<Either<Error, FetchData>> {
  if (!script.hasAttribute('src')) return Right<FetchData>([script, script.text]);
  if (script.type.toLowerCase() === 'module') return Right<FetchData>([script, '']);
  const xhr = new XMLHttpRequest();
  void xhr.open('GET', script.src, true);
  xhr.timeout = timeout;
  void xhr.send();
  return new Promise<Either<Error, FetchData>>(resolve =>
    ['load', 'abort', 'error', 'timeout']
      .forEach(type => {
        switch (type) {
          case 'load':
            return void xhr.addEventListener(
              type,
              () => void resolve(Right<FetchData>([script, xhr.response as string])));
          default:
            return void xhr.addEventListener(
              type,
              () =>
                type === 'error' && script.matches('[src][async]')
                  ? void resolve(retry(script).then(() => Right<FetchData>([script, '']), () => Left(new Error(`${script.src}: ${xhr.statusText}`))))
                  : void resolve(Left(new Error(`${script.src}: ${xhr.statusText}`))));
        }
      }));
}
export { fetch as _fetch }

function evaluate(
  script: HTMLScriptElement,
  code: string,
  logger: string,
  skip: ReadonlySet<URL.Absolute<StandardUrl>>,
  wait: Promise<any>,
  cancellation: Cancellee<Error>,
): Either<Promise<Either<Error, HTMLScriptElement>>, Promise<Either<Error, HTMLScriptElement>>> {
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
  const result = wait.then(cancellation.promise).then(evaluate);
  return script.matches('[src][async]')
    ? Right(result)
    : Left(result);

  async function evaluate(): Promise<Either<Error, HTMLScriptElement>> {
    if (script.matches('[type="module"][src]')) {
      return import(script.src)
        .catch(reason =>
          reason.message.startsWith('Failed to load ') && script.matches('[src][async]')
            ? retry(script).catch(() => Promise.reject(reason))
            : Promise.reject(reason))
        .then(
          () => (
            void script.dispatchEvent(new Event('load')),
            Right(script)),
          reason => (
            void script.dispatchEvent(new Event('error')),
            Left(new FatalError(reason instanceof Error ? reason.message : reason + ''))));
    }
    else {
      try {
        if (new URL(standardizeUrl(window.location.href)).path !== new URL(standardizeUrl(window.location.href)).path) throw new FatalError('Expired.');
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

function retry(script: HTMLScriptElement): Promise<undefined> {
  if (new URL(standardizeUrl(script.src)).origin === new URL(standardizeUrl(window.location.href)).origin) return Promise.reject(new Error());
  script = html('script', Object.values(script.attributes).reduce((o, { name, value }) => (o[name] = value, o), {}), [...script.childNodes]);
  return new Promise((resolve, reject) => (
    void script.addEventListener('load', () => void resolve()),
    void script.addEventListener('error', reject),
    void document.body.appendChild(script),
    void script.remove()));
}
