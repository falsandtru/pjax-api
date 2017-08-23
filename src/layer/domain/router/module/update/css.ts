import { find } from '../../../../../lib/dom';
import { sync, pair } from './sync';

export function css<T extends HTMLHeadElement | HTMLBodyElement>(
  scope: {
    src: T;
    dst: T;
  },
  ignore: string
): undefined {
  assert(scope.src.tagName === scope.dst.tagName);
  const selector: string = 'link[rel~="stylesheet"], style';
  return void sync(
    pair(
      find(scope.src, selector)
        .filter(el => !el.matches(ignore.trim() || '_')),
      find(scope.dst, selector)
        .filter(el => !el.matches(ignore.trim() || '_')),
      compare),
    scope.dst);
}

function compare<T extends HTMLLinkElement | HTMLStyleElement>(a: T, b: T): boolean {
  assert(a.tagName.toLowerCase() === b.tagName.toLowerCase());
  switch (a.tagName.toLowerCase()) {
    case 'link':
      return (a as HTMLLinkElement).href === (b as HTMLLinkElement).href;
    case 'style':
      return a.innerHTML.trim() === b.innerHTML.trim();
    default:
      return false;
  }
}
