import { StandardUrl, standardizeUrl } from '../layer/data/model/domain/url';
import { URL } from './url';
import { Sequence } from 'spica/sequence';
import { flip } from 'spica/flip';

export function router<T>(config: { [pattern: string]: (path: string) => T; }): (url: string) => T {
  return (url: string) => {
    const { path, pathname } = new URL(standardizeUrl(url));
    return Sequence.from(Object.keys(config).sort().reverse())
      .filter(flip(compare)(pathname))
      .map(pattern => config[pattern])
      .take(1)
      .extract()
      .pop()!
      .call(config, path);
  };
}

export function compare(pattern: string, path: URL.Pathname<StandardUrl>): boolean {
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
      ps.length <= ss.length)
    .filter(([ps, ss]) =>
      Sequence
        .zip(
          Sequence.from(ps),
          Sequence.from(ss))
        .dropWhile(([p, s]) =>
          match(p, s))
        .take(1)
        .extract()
        .length === 0)
    .take(1)
    .extract()
    .length > 0;
}

export function expand(pattern: string): string[] {
  return Sequence
    .from(
      (pattern.match(/{.*?}|[^{]*/g) || [])
        .map(p =>
          p[0] === '{'
            ? p.slice(1, -1).split(',')
            : [p]))
    .mapM(Sequence.from)
    .map(ps => ps.join(''))
    .extract();
}

export function match(pattern: string, segment: string): boolean {
  if (pattern.includes('**')) throw new Error(`Invalid pattern: ${pattern}`);
  if (segment[0] === '.' && pattern[0] === '*') return false;
  return match(optimize(pattern), segment);

  function match(pattern: string, segment: string): boolean {
    const [p = '', ...ps] = [...pattern];
    const [s = '', ...ss] = [...segment];
    switch (p) {
      case '':
        return s === '';
      case '?':
        return s !== ''
            && match(ps.join(''), ss.join(''));
      case '*':
        return s === '/'
          ? match(ps.join(''), segment)
          : Sequence.zip(
              Sequence.cycle([ps.join('')]),
              Sequence.from(segment)
                .tails()
                .map(ss =>
                  ss.join('')))
              .filter(([pattern, segment]) =>
                match(pattern, segment))
              .take(1)
              .extract()
              .length > 0;
      default:
        return s === p
            && match(ps.join(''), ss.join(''));
    }
  }
  
  function optimize(pattern: string): string {
    const pat = pattern
      .replace(/\*(\?+)\*?/g, '$1*');
    return pat === pattern
      ? pat
      : optimize(pat);
  }
}
