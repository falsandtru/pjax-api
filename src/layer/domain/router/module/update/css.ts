import { sync, pair } from './sync';

export function css(
  documents: {
    src: Document;
    dst: Document;
  },
  ignore: string
): undefined {
  const selector: string = 'link[rel~="stylesheet"], style';
  return void (['head', 'body'] as const)
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
    assert(selector);
    return [...source.querySelectorAll<HTMLElement>(selector)]
      .filter(el => !ignore || !el.matches(ignore));
  }
}
