import { ObjectKeys } from 'spica/alias';
import { Config as Option } from '../../../../../';
import { Config } from '../../../domain/data/config';
import { compare } from 'spica/router';
import { URL, StandardURL } from 'spica/url';
import { Sequence } from 'spica/sequence';
import { Maybe, Just, Nothing } from 'spica/maybe';
import { extend, overwrite } from 'spica/assign';

export function scope(
  config: Config,
  path: {
    orig: URL.Pathname<StandardURL>;
    dest: URL.Pathname<StandardURL>;
  }
): Maybe<Config> {
  const scope = { '/': {}, ...config.scope };
  return Sequence.from(ObjectKeys(scope).sort().reverse())
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
        ? Just(new Config(extend({
            scope: option.scope && overwrite(config.scope, option.scope)
          }, config, option)))
        : Nothing)
    .extract()[0] ?? Nothing;
}
