import { Config as Option } from '../../../../../';
import { Config } from '../../../domain/data/config';
import { router } from 'spica/router';
import { URL, StandardURL } from 'spica/url';
import { Maybe, Just, Nothing } from 'spica/maybe';
import { extend, overwrite } from 'spica/assign';

const { match } = router.helpers();

export function scope(
  option: Option,
  path: {
    orig: URL.Pathname<StandardURL>;
    dest: URL.Pathname<StandardURL>;
  }
): Maybe<Config> {
  const record = { '/': {}, ...option.scope };
  for (const pattern of Object.keys(record).reverse()) {
    const opt: Option | undefined = record[pattern];
    switch (+match(pattern, path.orig) + +match(pattern, path.dest)) {
      case 0:
        continue;
      case 1:
        if (opt === undefined || opt.isolation) return Nothing;
        continue;
    }
    return opt
      ? opt.scope
        ? scope(overwrite({}, { ...option, scope: undefined }, opt), path)
        : Just(new Config({ ...extend({}, option, opt), scope: undefined }))
      : Nothing;
  }
  return Nothing;
}
