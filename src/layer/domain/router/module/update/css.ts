import { find } from '../../../../../lib/dom';
import { sync, pair } from './sync';

export function css(
  documents: {
    src: Document;
    dst: Document;
  },
  ignore: string
): undefined {
  const selector: string = 'link[rel~="stylesheet"], style';
  return void ['head' as 'head', 'body' as 'body']
    .map(query => [
      documents.src.querySelector(query)!,
      documents.dst.querySelector(query)!,
    ])
    .forEach(([src, dst]) =>
      void sync(
        pair(
          list(src),
          list(dst),
          (a, b) => a.outerHTML === b.outerHTML),
        dst));

  function list(source: HTMLElement): HTMLElement[] {
    return find(source, selector)
      .filter(el => !el.matches(ignore.trim() || '_'));
  }
}
