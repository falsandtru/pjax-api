import { canonicalizeUrl, CanonicalUrl } from '../layer/data/model/canonicalization/url';
import { validateUrl } from '../layer/data/model/validation/url';
import { Url } from './url';
import { Sequence, flip } from 'spica';

export function router<T>(config: { [pattern: string]: (path: string) => T; }): (url: string) => T {
  return (url: string) => {
    const { path, pathname } = new Url(canonicalizeUrl(validateUrl(url)));
    return Sequence.from(Object.keys(config).sort().reverse())
      .filter(flip(compare)(pathname))
      .map(pattern => config[pattern])
      .take(1)
      .extract()
      .pop()!
      (path);
  };
}

export function compare(pattern: string, path: Url.Pathname<CanonicalUrl>): boolean {
  const regSegment = /\/|[^/]+\/?/g;
  const regTrailingSlash = /\/(?=$|[?#])/;
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
  pattern = pattern
    .replace(/[*]+/g, '*')
    .replace(/[*]+[?]/g, '?');
  const [, rest, state] = Array.from(pattern)
    .map<[string, string]>((p, i) =>
      p === '*'
        ? [p, pattern.slice(i + 1).match(/^[^?*/]*/)![0]]
        : [p, ''])
    .reduce<[string[], string[], boolean]>(([ls, [r = '', ...rs], s], [p, ps]) => {
      if (!s) return [ls, [r].concat(rs), s];
      switch (p) {
        case '?':
          return [ls.concat([r]), rs, s];
        case '*':
          const seg = r.concat(rs.join(''));
          const ref = ps.split(/[?*]/, 1)[0];
          return seg.includes(ref)
            ? ref === ''
              ? [ls.concat(Array.from(seg.replace(/\/$/, ''))), Array.from(seg.replace(/.*?(?=\/?$)/, '')), s]
              : [ls.concat(Array.from(seg.slice(0, seg.indexOf(ref)))), Array.from(seg.slice(seg.indexOf(ref))), s]
            : [ls, [r].concat(rs), !s];
        default:
          return r === p
            ? [ls.concat([r]), rs, s]
            : [ls, [r].concat(rs), !s];
      }
    }, [Array.from(''), Array.from(segment), true]);
  return rest.length === 0
      && state;
}
