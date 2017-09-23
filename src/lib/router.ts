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
  const [, rest, state] = [...pattern]
    .map<[string, string]>((p, i) =>
      p === '*'
        ? [p, pattern.slice(i + 1).match(/^[^?*/]*/)![0]]
        : [p, ''])
    .reduce<[string[], string[], boolean]>(([ls, [r = '', ...rs], s], [p, ps]) => {
      if (!s) return [ls, [r, ...rs], s];
      switch (p) {
        case '?':
          return [ls.concat([r]), rs, s];
        case '*':
          const seg = r.concat(rs.join(''));
          const ref = ps.split(/[?*]/, 1)[0];
          return seg.includes(ref)
            ? ref === ''
              ? [ls.concat([...seg.replace(/\/$/, '')]), [...seg.replace(/.*?(?=\/?$)/, '')], s]
              : [ls.concat([...seg.slice(0, seg.indexOf(ref))]), [...seg.slice(seg.indexOf(ref))], s]
            : [ls, [r, ...rs], !s];
        default:
          return r === p
            ? [ls.concat([r]), rs, s]
            : [ls, [r, ...rs], !s];
      }
    }, [[''], [...segment], true]);
  return rest.length === 0
      && state;
}
