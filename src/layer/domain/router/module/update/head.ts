import { sync, pair } from './sync';
import { find } from '../../../../../lib/dom';

export function head(
  scope: {
    src: HTMLHeadElement;
    dst: HTMLHeadElement;
  },
  selector: string,
  ignore: string
): undefined {
  ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
  return void sync(
    pair(
      find(scope.src, selector)
        .filter(el => !el.matches(ignore.trim() || '_')),
      find(scope.dst, selector)
        .filter(el => !el.matches(ignore.trim() || '_')),
      (a, b) => a.outerHTML === b.outerHTML),
    scope.dst);
}
