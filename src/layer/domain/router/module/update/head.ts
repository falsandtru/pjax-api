import { sync, pair } from './sync';
import { apply } from 'typed-dom';

export function head(
  documents: {
    src: Document;
    dst: Document;
  },
  selector: string,
  ignore: string
): undefined {
  ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
  return void sync(
    pair(
      list(documents.src.head!),
      list(documents.dst.head!),
      (a, b) => a.outerHTML === b.outerHTML),
    documents.dst.head!);

  function list(source: HTMLElement): HTMLElement[] {
    assert(selector);
    return [...apply<HTMLElement>(source, selector)]
      .filter(el => !ignore || !el.matches(ignore));
  }
}
