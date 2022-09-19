import { undefined, Object } from 'spica/global';
import { FatalError } from '../../../../../lib/error';
import { AtomicPromise } from 'spica/promise';
import { Cancellee } from 'spica/cancellation';
import { Either, Left, Right } from 'spica/either';
import { URL, StandardURL, standardize } from 'spica/url';
import { push } from 'spica/array';
import { tuple } from 'spica/tuple';
import { wait } from 'spica/timer';
import { html } from 'typed-dom/dom';

type Result = Either<Error, readonly [HTMLScriptElement[], Promise<Either<Error, HTMLScriptElement[]>>]>;
type FetchData = readonly [HTMLScriptElement, string];

export function script(
  documents: {
    src: Document;
    dst: Document;
  },
  skip: ReadonlySet<URL.Href<StandardURL>>,
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
): AtomicPromise<Result> {
  const scripts = [...documents.src.querySelectorAll('script')]
    .filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type))
    .filter(el => !el.matches(selector.ignore.trim() || '_'))
    .filter(el =>
      el.hasAttribute('src')
        ? !skip.has(new URL(standardize(el.src)).href) || el.matches(selector.reload.trim() || '_')
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
  return AtomicPromise.all([
    AtomicPromise.all(request(ss)).then(run),
    AtomicPromise.all(request(as)).then(run),
  ])
    .then(async ([sm, am]) =>
      sm.fmap(async p => (await p)
        .fmap(([ss1, ap1]) =>
          [
            ss1,
            ap1.then(async as1 =>
              am.fmap(async p => (await p)
                .fmap(([ss2, ap2]) =>
                  AtomicPromise.all([as1, Right<Error, HTMLScriptElement[]>(ss2), ap2])
                    .then(sst =>
                      sst.reduce((m1, m2) =>
                        m1.bind(s1 =>
                          m2.fmap(s2 =>
                            push(s1, s2))))))
                .extract<Either<Error, HTMLScriptElement[]>>(Left))
                .extract<Either<Error, HTMLScriptElement[]>>(Left)),
          ] as const))
        .extract<Result>(Left));

  function request(scripts: HTMLScriptElement[]): Promise<Either<Error, FetchData>>[] {
    return scripts
      .map(script =>
        io.fetch(script, timeout));
  }

  function run(responses: Either<Error, FetchData>[]): Either<Error, AtomicPromise<Result>> {
    return responses
      .reduce(
        (results, m) => m.bind(() => results),
        responses
          .reduce((results, m) =>
            results
              .bind(cancellation.either)
              .bind(([sp, ap]) => m
                .fmap(([script, code]) =>
                  io.evaluate(script, code, selector.logger, skip, AtomicPromise.all(sp), cancellation))
                .bind(m =>
                  m.extract(
                    p => Right(tuple(push(sp, [p]), ap)),
                    p => Right(tuple(sp, push(ap, [p]))))))
        , Right<Error, [AtomicPromise<Either<Error, HTMLScriptElement>>[], AtomicPromise<Either<Error, HTMLScriptElement>>[]]>([[], []])))
      .fmap(([sp, ap]) =>
        AtomicPromise.all(sp)
          .then(m => Either.sequence(m))
          .then(sm =>
            sm.fmap(ss =>
              tuple(
                ss,
                Promise.all(ap)
                  .then(m => Either.sequence(m))))));
  }
}

async function fetch(
  script: HTMLScriptElement,
  timeout: number,
): Promise<Either<Error, FetchData>> {
  if (!script.hasAttribute('src')) return Right<FetchData>([script, script.text]);
  if (script.type.toLowerCase() === 'module') return Right<FetchData>([script, '']);
  return AtomicPromise.race([
    window.fetch(script.src, {
      headers: new Headers({
        Accept: 'application/javascript',
      }),
      integrity: script.integrity,
    }),
    wait(timeout).then(() => AtomicPromise.reject(new Error(`${script.src}: Timeout.`))),
  ])
    .then(
      async res =>
        res.ok
          ? Right<FetchData>([script, await res.text()])
          : script.matches('[src][async]')
            ? retry(script)
                .then(
                  () => Right<FetchData>([script, '']),
                  () => Left(new Error(`${script.src}: ${res.statusText}`)))
            : Left(new Error(res.statusText)),
      (error: Error) => Left(error));
}
export { fetch as _fetch }

function evaluate(
  script: HTMLScriptElement,
  code: string,
  logger: string,
  skip: ReadonlySet<URL.Href<StandardURL>>,
  wait: Promise<any>,
  cancellation: Cancellee<Error>,
): Either<AtomicPromise<Either<Error, HTMLScriptElement>>, AtomicPromise<Either<Error, HTMLScriptElement>>> {
  assert(script.hasAttribute('src') ? script.childNodes.length === 0 : script.text === code);
  assert(script.textContent === script.text);
  assert(cancellation.isAlive());
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
  const result = AtomicPromise.resolve(wait).then(evaluate);
  return script.matches('[src][async]')
    ? Right(result)
    : Left(result);

  function evaluate(): AtomicPromise<Either<Error, HTMLScriptElement>> {
    if (!cancellation.isAlive()) throw new FatalError('Expired.');
    if (script.matches('[type="module"][src]')) {
      return AtomicPromise.resolve(import(script.src))
        .catch((reason: Error) =>
          reason.message.startsWith('Failed to load ') && script.matches('[src][async]')
            ? retry(script).catch(() => AtomicPromise.reject(reason))
            : AtomicPromise.reject(reason))
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
        if (skip.has(new URL(standardize(window.location.href)).href)) throw new FatalError('Expired.');
        void (0, eval)(code);
        script.hasAttribute('src') && void script.dispatchEvent(new Event('load'));
        return AtomicPromise.resolve(Right(script));
      }
      catch (reason) {
        script.hasAttribute('src') && void script.dispatchEvent(new Event('error'));
        return AtomicPromise.resolve(Left(new FatalError(reason instanceof Error ? reason.message : reason + '')));
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
      : void 0);
}

function retry(script: HTMLScriptElement): AtomicPromise<undefined> {
  if (new URL(standardize(script.src)).origin === new URL(standardize(window.location.href)).origin) return AtomicPromise.reject(new Error());
  script = html('script', Object.values(script.attributes).reduce((o, { name, value }) => (o[name] = value, o), {}), [...script.childNodes]);
  return new AtomicPromise((resolve, reject) => (
    void script.addEventListener('load', () => void resolve(undefined)),
    void script.addEventListener('error', reject),
    void document.body.appendChild(script),
    void script.remove()));
}
