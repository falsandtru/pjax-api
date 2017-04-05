import { Config as Option } from '../../../../';
import { Sequence, Maybe, Just, Nothing, extend } from 'spica';
import { Config } from '../../domain/data/config';
import { Url } from '../../../lib/url';
import { CanonicalUrl } from '../../data/model/canonicalization/url';

export function scope(
  config: Config,
  path: {
    orig: Url.Pathname<CanonicalUrl>;
    dest: Url.Pathname<CanonicalUrl>;
  }
): Maybe<Config> {
  return Sequence.from(Object.keys(config.scope).sort().reverse())
    .dropWhile(pattern =>
      !! !compare(path.orig, pattern)
      && !compare(path.dest, pattern))
    .take(1)
    .filter(pattern =>
      !! compare(path.orig, pattern)
      && compare(path.dest, pattern))
    .map(pattern => config.scope[pattern])
    .map<Maybe<Config>>(option =>
      option
        ? Just(new Config(extend<Option>({}, config, option)))
        : Nothing)
    .extract()
    .reduce((_, m) => m, Nothing);
}

export function compare(path: Url.Pathname<CanonicalUrl>, pattern: string): boolean {
  const regSegment = /\/|[^/]+\/?/g;
  return Sequence
    .zip(
      Sequence.cycle([path]),
      Sequence.from(expand(pattern)))
    .map(([path, pattern]) =>
      [path.match(regSegment) || [], pattern.match(regSegment) || []])
    .filter(([path, pattern]) =>
      path.length >= pattern.length)
    .filter(([path, pattern]) =>
      Sequence
        .zip(
          Sequence.from(path),
          Sequence.from(pattern))
        .takeWhile(([s, p]) => match(s, p))
        .extract()
        .length === pattern.length)
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

export function match(segment: string, pattern: string): boolean {
  pattern = pattern
    .replace(/[?]*[*]+[?]*/g, '*')
    .replace(/[*]+/g, '*');
  const [, rest, state] = Array.from(pattern)
    .map<[string, string]>((p, i) =>
      p === '*'
        ? [p, pattern.slice(i + 1).match(/^[^?*/]*/)![0]]
        : [p, ''])
    .reduce<[string[], string[], boolean]>(([ls, [r, ...rs], s], [p, ps]) => {
      if (!s) return [ls, [r].concat(rs), s];
      switch (p) {
        case '?':
          return [ls.concat([r]), rs, s];
        case '*':
          const seg = r.concat(rs.join(''));
          return seg.includes(ps)
            ? ps === ''
              ? [ls.concat(Array.from(seg.replace(/\/$/, ''))), Array.from(seg.replace(/.*?(?=\/?$)/, '')), s]
              : [ls.concat(Array.from(seg.split(ps, 1).pop()!)), Array.from(ps + seg.split(ps, 2).pop()!), s]
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
