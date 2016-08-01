import { socket } from 'localsocket';
import { PathSchema } from '../schema/path';
import { Url } from '../../../lib/url';
import { CanonicalUrl } from '../model/canonicalization/url';

const sock = socket<Url.Path<string>, PathSchema>('pjax:path', {
  schema() {
    return new PathSchema();
  }
});

void sock.recent(100, keys =>
  void sock.sync(keys));

export const store = {
  link: (path: Url.Path<CanonicalUrl>) =>
    sock.link(new Url(path + '').path, 3 * 24 * 3600 * 1e3)
}
