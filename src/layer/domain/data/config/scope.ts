import { Config as Option } from '../../../../../';
import { Config } from '../../../domain/data/config';
import { router } from 'spica/router';
import { URL, StandardURL } from 'spica/url';
import { Maybe, Just, Nothing } from 'spica/maybe';
import { extend, overwrite } from 'spica/assign';

const { match } = router.helpers();

export function scope(
  config: Config,
  path: {
    orig: URL.Pathname<StandardURL>;
    dest: URL.Pathname<StandardURL>;
  }
): Maybe<Config> {
  const scope = { '/': {}, ...config.scope };
  for (const pattern of Object.keys(scope).reverse()) {
    switch (+match(pattern, path.orig) + +match(pattern, path.dest)) {
      case 0:
        continue;
      case 1:
        return Nothing;
    }
    const option: Option | undefined = scope[pattern];
    return option
      ? Just(new Config(extend({
        scope: option.scope && overwrite({}, config.scope, option.scope)
      }, config, option)))
      : Nothing;
  }
  return Nothing;
}
