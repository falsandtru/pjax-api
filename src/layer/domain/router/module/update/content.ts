import { escape } from './script';
import { AtomicPromise } from 'spica/promise';
import { Maybe, Just, Nothing} from 'spica/maybe';
import { concat} from 'spica/concat';
import { once, apply } from 'typed-dom';

type DocumentRecord = { src: Document; dst: Document; };
type AreaRecord = { src: HTMLElement[]; dst: HTMLElement[]; };

export function content(
  documents: DocumentRecord,
  areas: AreaRecord[],
  io = {
    replace: (src: Node, dst: Node): void => void dst.parentNode!.replaceChild(src, dst)
  }
): [HTMLElement[], AtomicPromise<Event>[]] {
  return [
    areas
      .map(r => r.dst)
      .reduce<HTMLElement[]>(concat, []),
    areas
      .map(load)
      .reduce<AtomicPromise<Event>[]>(concat, []),
  ];

  function load(area: AreaRecord): AtomicPromise<Event>[] {
    return area.src
      .map((_, i) => ({
        src: documents.dst.importNode(area.src[i].cloneNode(true), true) as HTMLElement,
        dst: area.dst[i]
      }))
      .map(area => (
        void replace(area),
        [...apply(area.src, 'img, iframe, frame')]
          .map(wait)))
      .reduce(concat, []);

    function replace(area: { src: HTMLElement, dst: HTMLElement; }): void {
      const unescape = [...apply(area.src, 'script')]
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
  documents: DocumentRecord,
  areas: string[]
): Maybe<readonly [string, AreaRecord[]]> {
  return areas
    .reduce((m, area) =>
      Maybe.mplus(
        m,
        sep(documents, area)
          .fmap(rs =>
            [area, rs] as const))
    , Nothing)

  function sep(documents: DocumentRecord, area: string): Maybe<AreaRecord[]> {
    return split(area)
      .bind(areas =>
        areas.reduce((m, area) =>
          m.bind(acc => {
            const record = {
              src: [...apply<HTMLElement>(documents.src, area)],
              dst: [...apply<HTMLElement>(documents.dst, area)],
            };
            return record.src.length > 0
                && record.src.length === record.dst.length
              ? Just(concat(acc, [record]))
              : Nothing;
          })
        , Just([])));
  }
}

function split(area: string): Maybe<string[]> {
  return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || [])
    .map(area => area.trim())
    .reduce((m, area) =>
      area
        ? m.fmap(acc => concat(acc, [area]))
        : Nothing
    , Just([]));
}
export { split as _split }

function wait(el: HTMLElement): AtomicPromise<Event> {
  return AtomicPromise.race([
    new AtomicPromise<Event>(resolve => void once(el, 'load', resolve)),
    new AtomicPromise<Event>(resolve => void once(el, 'abort', resolve)),
    new AtomicPromise<Event>(resolve => void once(el, 'error', resolve)),
  ]);
}
export { wait as _wait }
