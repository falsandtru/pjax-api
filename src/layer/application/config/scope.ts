import { Config as Option } from 'pjax-api';
import { Sequence, Maybe, Just, Nothing, extend, concat } from 'spica';
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
  return Sequence.from(segment.split(''))
    .map<[string, number]>((c, i) => [c, i])
    .scan<[string, string[]]>(([s, [p, ...ps]], [c, i]) => {
      switch (p) {
        case '?':
          return [s + c, ps];
        case '*':
          return ps.length === 0
            ? [s + c, i + 1 === segment.length ? [] : [p]]
            : c === ps[0]
              ? [s + c, ps.slice(1)]
              : [s + c, concat([p], ps)];
        default:
          return c === p
            ? [s + c, ps]
            : [s, []];
      }
    }, ['', pattern.split('')])
    .dropWhile(([, ps]) => ps.length > 0)
    .map(([s]) => s)
    .take(1)
    .filter(s => s === segment)
    .extract()
    .length > 0;
}
