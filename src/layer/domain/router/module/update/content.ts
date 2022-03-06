import { escape } from './script';
import { AtomicPromise } from 'spica/promise';
import { Maybe, Just, Nothing} from 'spica/maybe';
import { push } from 'spica/array';
import { once } from 'typed-dom';

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
      .reduce<HTMLElement[]>(push, []),
    areas
      .map(load)
      .reduce<AtomicPromise<Event>[]>(push, []),
  ];

  function load(area: AreaRecord): AtomicPromise<Event>[] {
    return area.src
      .map((_, i) => ({
        src: documents.dst.importNode(area.src[i].cloneNode(true), true) as HTMLElement,
        dst: area.dst[i]
      }))
      .map(area => (
        void replace(area),
        [...area.src.querySelectorAll('img, iframe, frame')]
          .map(wait)))
      .reduce<AtomicPromise<Event>[]>(push, []);

    function replace(area: { src: HTMLElement, dst: HTMLElement; }): void {
      const unescape = [...area.src.querySelectorAll('script')]
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
              src: [...documents.src.querySelectorAll<HTMLElement>(area)],
              dst: [...documents.dst.querySelectorAll<HTMLElement>(area)],
            };
            return record.src.length > 0
                && record.src.length === record.dst.length
              ? Just(push(acc, [record]))
              : Nothing;
          })
        , Just([])));
  }
}

function split(area: string): Maybe<string[]> {
  // eslint-disable-next-line redos/no-vulnerable
  return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || [])
    .map(area => area.trim())
    .reduce((m, area) =>
      area
        ? m.fmap(acc => push(acc, [area]))
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
