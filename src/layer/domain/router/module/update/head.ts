import { sync, pair } from './sync';
import { find } from '../../../../../lib/dom';

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
      list(documents.src.head),
      list(documents.dst.head),
      (a, b) => a.outerHTML === b.outerHTML),
    documents.dst.head);

  function list(source: HTMLElement): HTMLElement[] {
    return find(source, selector)
      .filter(el => !el.matches(ignore.trim() || '_'));
  }
}
