import { Config as Option } from '../../../../../';
import { compare } from '../../../../lib/router';
import { Config } from '../../../domain/data/config';
import { URL } from '../../../../lib/url';
import { StandardUrl } from '../../../data/model/domain/url';
import { Sequence } from 'spica/sequence';
import { Maybe, Just, Nothing } from 'spica/maybe';
import { extend } from 'spica/assign';

export function scope(
  config: Config,
  path: {
    orig: URL.Pathname<StandardUrl>;
    dest: URL.Pathname<StandardUrl>;
  }
): Maybe<Config> {
  const scope = { '/': {}, ...config.scope };
  return Sequence.from(Object.keys(scope).sort().reverse())
    .dropWhile(pattern =>
      !! !compare(pattern, path.orig)
      && !compare(pattern, path.dest))
    .take(1)
    .filter(pattern =>
      !! compare(pattern, path.orig)
      && compare(pattern, path.dest))
    .map<Option | undefined>(pattern => scope[pattern])
    .map<Maybe<Config>>(option =>
      option
        ? Just(new Config(extend<Option>({}, config, option)))
        : Nothing)
    .extract()
    .reduce((_, m) => m, Nothing);
}
