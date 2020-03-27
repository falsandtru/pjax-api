import { URL, StandardURL, standardize } from 'spica/url';
import { Sequence } from 'spica/sequence';
import { curry } from 'spica/curry';
import { flip } from 'spica/flip';
import { memoize } from 'spica/memoize';

export function router<T>(config: Record<string, (path: string) => T>): (url: string) => T {
  return (url: string) => {
    const { path, pathname } = new URL(standardize(url));
    return Sequence.from(Object.keys(config).filter(p => p[0] === '/').sort().reverse())
      .filter(curry(flip(compare))(pathname))
      .map(pattern => config[pattern])
      .take(1)
      .extract()
      .pop()!
      .call(config, path);
  };
}

export function compare(pattern: string, path: URL.Pathname<StandardURL>): boolean {
  assert(path[0] === '/');
  assert(!path.includes('?'));
  const regSegment = /\/|[^/]+\/?/g;
  const regTrailingSlash = /\/$/;
  assert(expand(pattern).every(pat => pat.match(regSegment)!.join('') === pat));
  return Sequence
    .zip(
      Sequence.from(expand(pattern)),
      Sequence.cycle([path]))
    .map(([pattern, path]) =>
      [
        pattern.match(regSegment) || [],
        pattern.match(regTrailingSlash)
          ? path.match(regSegment) || []
          : path.replace(regTrailingSlash, '').match(regSegment) || []
      ])
    .filter(([ps, ss]) =>
      ps.length <= ss.length &&
      Sequence
        .zip(
          Sequence.from(ps),
          Sequence.from(ss))
        .dropWhile(([a, b]) => match(a, b))
        .take(1)
        .extract()
        .length === 0)
    .take(1)
    .extract()
    .length > 0;
}

const expand = memoize((pattern: string): string[] => {
  if (pattern.match(/\*\*|[\[\]]/)) throw new Error(`Invalid pattern: ${pattern}`);
  assert(pattern === '' || pattern.match(/{[^{}]*}|.[^{]*/g)!.join('') === pattern);
  return pattern === ''
    ? [pattern]
    : Sequence.from(pattern.match(/{[^{}]*}|.[^{]*/g)!)
        .map(p =>
          p.match(/^{[^{}]*}$/)
            ? p.slice(1, -1).split(',')
            : [p])
        .mapM(Sequence.from)
        .map(ps => ps.join(''))
        .bind(p =>
          p === pattern
            ? Sequence.from([p])
            : Sequence.from(expand(p)))
        .unique()
        .extract();
});
export { expand as _expand }

const match = memoize((pattern: string, segment: string): boolean => {
  assert(segment === '/' || !segment.startsWith('/'));
  if (segment[0] === '.' && [...'?*'].includes(pattern[0])) return false;
  return match(optimize(pattern), segment);

  function match(pattern: string, segment: string): boolean {
    const [p = '', ...ps] = [...pattern];
    const [s = '', ...ss] = [...segment];
    assert(typeof p === 'string');
    assert(typeof s === 'string');
    switch (p) {
      case '':
        return s === '';
      case '?':
        return s !== ''
            && s !== '/'
            && match(ps.join(''), ss.join(''));
      case '*':
        return s === '/'
          ? match(ps.join(''), segment)
          : Sequence
              .zip(
                Sequence.cycle([ps.join('')]),
                Sequence.from(segment)
                  .tails()
                  .map(ss => ss.join('')))
            .filter(([a, b]) => match(a, b))
              .take(1)
              .extract()
              .length > 0;
      default:
        return s === p
            && match(ps.join(''), ss.join(''));
    }
  }

  function optimize(pattern: string): string {
    const pat = pattern.replace(/\*(\?+)\*?/g, '$1*');
    return pat === pattern
      ? pat
      : optimize(pat);
  }
}, (pat, seg) => `${pat} ${seg}`);
export { match as _match }
