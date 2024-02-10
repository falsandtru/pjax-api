import { Config as Options } from '../../../../../';
import { Config } from '../../../domain/data/config';
import { router } from 'spica/router';
import { URL, StandardURL } from 'spica/url';
import { Maybe, Just, Nothing } from 'spica/maybe';
import { extend, overwrite } from 'spica/assign';

const { match } = router.helpers();

export function scope(
  options: Options,
  path: {
    orig: URL.Pathname<StandardURL>;
    dest: URL.Pathname<StandardURL>;
  }
): Maybe<Config> {
  const record = { '/': {}, ...options.scope };
  for (const pattern of Object.keys(record).reverse()) {
    const opts: Options | undefined = record[pattern];
    switch (+match(pattern, path.orig) + +match(pattern, path.dest)) {
      case 0:
        continue;
      case 1:
        if (opts === undefined || opts.isolation) return Nothing;
        continue;
    }
    return opts
      ? opts.scope
        ? scope(overwrite({}, { ...options, scope: undefined }, opts), path)
        : Just(new Config({ ...extend({}, options, opts), scope: undefined }))
      : Nothing;
  }
  return Nothing;
}
