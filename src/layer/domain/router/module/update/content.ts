import { Maybe, Just, Nothing, concat, Sequence } from 'spica';
import { find, once } from '../../../../../lib/dom';
import { escape } from './script';

type DocumentRecord = { src: Document; dst: Document; };
type AreaRecord = { src: HTMLElement[]; dst: HTMLElement[]; };

export function content(
  document: DocumentRecord,
  areas: string[],
  io = {
    replace: (src: Node, dst: Node): void => void dst.parentNode!.replaceChild(src, dst)
  }
): Maybe<Promise<[DocumentRecord, Event[]]>> {
  return separate(document, areas)
    .fmap<Promise<Event>[]>(([, as]) =>
      as.map(load).reduce<Promise<Event>[]>(concat, []))
    .fmap<Promise<[DocumentRecord, Event[]]>>(ps =>
      Promise.all(ps)
        .then<[DocumentRecord, Event[]]>(es =>
          [document, es]));

  function load(area: AreaRecord): Promise<Event>[] {
    return area.src
      .map((_, i) => ({
        src: <HTMLElement>window.document.importNode(area.src[i].cloneNode(true), true),
        dst: area.dst[i]
      }))
      .map(area => (
        void replace(area),
        find(area.src, 'img, iframe, frame')
          .map(wait)))
      .reduce<Promise<Event>[]>(concat, []);

    function replace(area: { src: HTMLElement, dst: HTMLElement; }): void {
      const unescape = find<HTMLScriptElement>(area.src, 'script')
        .map(escape)
        .reduce((f, g) => () => (
          void f(),
          void g())
        , () => void 0);
      void io.replace(area.src, area.dst);
      void unescape();
    }
  }
}

export function separate(
  document: DocumentRecord,
  areas: string[]
): Maybe<[string, AreaRecord[]]> {
  return areas
    .reduce<Maybe<[string, AreaRecord[]]>>((m, area) =>
      Maybe.mplus(
        m,
        sep(document, area)
          .fmap<[string, AreaRecord[]]>(as =>
            [area, as]))
    , Nothing)

  function sep(document: DocumentRecord, area: string): Maybe<AreaRecord[]> {
    return split(area)
      .reduce<Maybe<AreaRecord[]>>((acc, area) =>
        acc
          .bind(as =>
            pair(area)
              .fmap(a =>
                concat(as, [a])))
      , Just([]));

    function pair(area: string): Maybe<AreaRecord> {
      return maybeValid(cons(area));

      function maybeValid(area: AreaRecord): Maybe<AreaRecord> {
        return validate(area)
          ? Just(area)
          : Nothing;

        function validate(area: AreaRecord): boolean {
          return area.src.length > 0
            && area.src.length === area.dst.length;
        }
      }

      function cons(area: string): AreaRecord {
        return {
          src: find(document.src, area),
          dst: find(document.dst, area)
        };
      }
    }
  }
}

export function match(
  document: Document,
  areas: string[]
): Sequence<string, any> {
  return Sequence.from(areas)
    .bind(area =>
      Sequence.from(
        validate(document, area)
          .extract<string[]>(
            () => [],
            area => [area])));

  function validate(
    document: Document,
    area: string
  ): Maybe<string> {
    return split(area)
      .reduce<Maybe<string>>((m, area) =>
        m.bind(() =>
          find(document, area).length > 0
            ? m
            : Nothing)
      , Just(area));
  }
}

function split(area: string): string[] {
  return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || [])
    .map(a => a.trim());
}
export { split as _split }

function wait(el: HTMLElement): Promise<Event> {
  return Promise.race(
    ['load', 'abort', 'error']
      .map(type => new Promise<Event>(resolve => void once(el, type, resolve))));
}
export { wait as _wait }
