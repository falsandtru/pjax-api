import { Maybe, Just, Nothing} from 'spica/maybe';
import { concat} from 'spica/concat';
import { tuple } from 'spica/tuple';
import { once } from 'typed-dom';
import { find } from '../../../../../lib/dom';
import { escape } from './script';

type DocumentRecord = { src: Document; dst: Document; };
type AreaRecord = { src: HTMLElement[]; dst: HTMLElement[]; };

export function content(
  documents: DocumentRecord,
  areas: AreaRecord[],
  io = {
    replace: (src: Node, dst: Node): void => void dst.parentNode!.replaceChild(src, dst)
  }
): [HTMLElement[], Promise<Event>[]] {
  return [
    areas
      .map(r => r.dst)
      .reduce<HTMLElement[]>(concat, []),
    areas
      .map(load)
      .reduce<Promise<Event>[]>(concat, []),
  ];

  function load(area: AreaRecord): Promise<Event>[] {
    return area.src
      .map((_, i) => ({
        src: documents.dst.importNode(area.src[i].cloneNode(true), true) as HTMLElement,
        dst: area.dst[i]
      }))
      .map(area => (
        void replace(area),
        find(area.src, 'img, iframe, frame')
          .map(wait)))
      .reduce(concat, []);

    function replace(area: { src: HTMLElement, dst: HTMLElement; }): void {
      const unescape = find(area.src, 'script')
        .map(escape)
        .reduce((f, g) => () => (
          void f(),
          void g())
        , () => undefined);
      void io.replace(area.src, area.dst);
      void unescape();
    }
  }
}

export function separate(
  documents: DocumentRecord,
  areas: string[]
): Maybe<[string, AreaRecord[]]> {
  return areas
    .reduce((m, area) =>
      Maybe.mplus(
        m,
        sep(documents, area)
          .fmap(as =>
            tuple([area, as])))
    , Nothing)

  function sep(documents: DocumentRecord, area: string): Maybe<AreaRecord[]> {
    return split(area)
      .map(area => ({
        src: find(documents.src, area),
        dst: find(documents.dst, area)
      }))
      .reduce<Maybe<AreaRecord[]>>((acc, area) =>
        acc
          .bind(as =>
            pair(area)
              .fmap(a =>
                concat(as, [a])))
      , Just([]));

    function pair(area: AreaRecord): Maybe<AreaRecord> {
      return Just(area)
        .guard(validate(area));

      function validate(area: AreaRecord): boolean {
        return area.src.length > 0
            && area.src.length === area.dst.length;
      }
    }
  }
}

function split(area: string): string[] {
  return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || [])
    .map(a => a.trim());
}
export { split as _split }

function wait(el: HTMLElement): Promise<Event> {
  return Promise.race([
    new Promise<Event>(resolve => void once(el, 'load', resolve)),
    new Promise<Event>(resolve => void once(el, 'abort', resolve)),
    new Promise<Event>(resolve => void once(el, 'error', resolve)),
  ]);
}
export { wait as _wait }
