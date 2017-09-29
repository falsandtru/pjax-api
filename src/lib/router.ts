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
  const [, rest, state] = [...optimize(pattern)]
    .map<[string, string]>((p, i, ps) =>
      p === '*'
        ? [p, ps.slice(i + 1).join('').split(/[?*]/, 1)[0]]
        : [p, ''])
    .reduce<[string[], string[], boolean]>(([ls, [r = '', ...rs], state], [p, ref]) => {
      if (!state) return [ls, [r, ...rs], state];
      switch (p) {
        case '?':
          return [ls.concat([r]), rs, state];
        case '*':
          assert(!ref.match(/[?*]/));
          const seg = r.concat(rs.join(''));
          return seg.includes(ref)
            ? ref === ''
              ? [ls.concat([...seg.slice(0, seg.search(/\/|$/))]), [...seg.slice(seg.search(/\/|$/))], state]
              : [ls.concat([...seg.slice(0, seg.indexOf(ref))]), [...seg.slice(seg.indexOf(ref))], state]
            : [ls, [r, ...rs], !state];
        default:
          return r === p
            ? [ls.concat([r]), rs, state]
            : [ls, [r, ...rs], !state];
      }
    }, [[''], [...segment], true]);
  return rest.length === 0
      && state;
  
  function optimize(pattern: string): string {
    const pat = pattern
      .replace(/\*(\?+)\*?/g, '$1*');
    return pat === pattern
      ? pat
      : optimize(pat);
  }
}
