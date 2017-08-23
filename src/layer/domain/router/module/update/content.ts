import { Maybe, Just, Nothing} from 'spica/maybe';
import { concat} from 'spica/concat';
import { once } from 'typed-dom';
import { find } from '../../../../../lib/dom';
import { escape } from './script';

type DocumentRecord = { src: Document; dst: Document; };
type AreaRecord = { src: HTMLElement[]; dst: HTMLElement[]; };

export function content(
  documents: DocumentRecord,
  areas: string[],
  io = {
    replace: (src: Node, dst: Node): void => void dst.parentNode!.replaceChild(src, dst)
  }
): Maybe<[HTMLElement[], Promise<Event>[]]> {
  return separate(documents, areas)
    .fmap<[HTMLElement[], Promise<Event>[]]>(([, areas]) => [
      areas
        .map(a => a.dst)
        .reduce<HTMLElement[]>(concat, []),
      areas
        .map(load)
        .reduce<Promise<Event>[]>(concat, [])
    ]);

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
        , () => void 0);
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
    .reduce<Maybe<[string, AreaRecord[]]>>((m, area) =>
      Maybe.mplus(
        m,
        sep(documents, area)
          .fmap<[string, AreaRecord[]]>(as =>
            [area, as]))
    , Nothing)

  function sep(documents: DocumentRecord, area: string): Maybe<AreaRecord[]> {
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
          src: find(documents.src, area),
          dst: find(documents.dst, area)
        };
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
