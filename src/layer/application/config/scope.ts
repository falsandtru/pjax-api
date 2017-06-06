import { Config as Option } from '../../../../';
import { compare } from '../../../lib/router';
import { Config } from '../../domain/data/config';
import { Url } from '../../../lib/url';
import { StandardUrl } from '../../data/model/domain/url';
import { Sequence, Maybe, Just, Nothing, extend } from 'spica';

export function scope(
  config: Config,
  path: {
    orig: Url.Pathname<StandardUrl>;
    dest: Url.Pathname<StandardUrl>;
  }
): Maybe<Config> {
  return Sequence.from(Object.keys(config.scope).sort().reverse())
    .dropWhile(pattern =>
      !! !compare(pattern, path.orig)
      && !compare(pattern, path.dest))
    .take(1)
    .filter(pattern =>
      !! compare(pattern, path.orig)
      && compare(pattern, path.dest))
    .map(pattern => config.scope[pattern])
    .map<Maybe<Config>>(option =>
      option
        ? Just(new Config(extend<Option>({}, config, option)))
        : Nothing)
    .extract()
    .reduce((_, m) => m, Nothing);
}
