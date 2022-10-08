import { sync, pair } from './sync';

export function head(
  documents: {
    src: Document;
    dst: Document;
  },
  selector: string,
  ignore: string
): void {
  ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
  return void sync(
    pair(
      list(documents.src.head!),
      list(documents.dst.head!),
      (a, b) => a.outerHTML === b.outerHTML),
    documents.dst.head!);

  function list(source: HTMLElement): HTMLElement[] {
    assert(selector);
    return [...source.querySelectorAll<HTMLElement>(selector)]
      .filter(el => !ignore || !el.matches(ignore));
  }
}
