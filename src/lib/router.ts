import { StandardUrl, standardizeUrl } from '../layer/data/model/domain/url';
import { URL } from './url';
import { Sequence } from 'spica/sequence';
import { flip } from 'spica/flip';
import { Maybe, Just, Nothing } from 'spica/maybe';

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
    .filter(([patterns, segments]) =>
      Sequence
        .zip(
          Sequence.from(patterns),
          Sequence.from(segments))
        .takeWhile(([p, s]) => match(p, s))
        .extract()
        .length === patterns.length)
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
  return [...optimize(pattern)]
    .map<[string, string]>((p, i, ps) =>
      p === '*'
        ? [p, ps.slice(i + 1).join('').split(/[?*]/, 1)[0]]
        : [p, ''])
    .reduce<Maybe<string[]>>((m, [p, ref]) => m
      .bind(([r = '', ...rs]) => {
        switch (p) {
          case '?':
            return r === ''
              ? Nothing
              : Just(rs);
          case '*':
            assert(!ref.match(/[?*]/));
            const seg = r.concat(rs.join(''));
            return seg.includes(ref)
              ? ref === ''
                ? Just([...seg.slice(seg.search(/\/|$/))])
                : Just([...seg.slice(seg.indexOf(ref))])
              : Nothing;
          default:
            return r === p
              ? Just(rs)
              : Nothing;
        }
      })
    , Just([...segment]))
    .bind(rest =>
      rest.length === 0
        ? Just(void 0)
        : Nothing)
    .extract(
      () => false,
      () => true);
  
  function optimize(pattern: string): string {
    const pat = pattern
      .replace(/\*(\?+)\*?/g, '$1*');
    return pat === pattern
      ? pat
      : optimize(pat);
  }
}
