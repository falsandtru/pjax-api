import { socket } from 'localsocket';
import { HostSchema } from '../schema/host';
import { Url } from '../../../lib/url';
import { CanonicalUrl } from '../model/canonicalization/url';

const sock = socket<Url.Host<string>, HostSchema>('pjax:host', {
  schema() {
    return new HostSchema();
  }
});

void sock.recent(100, keys =>
  void sock.sync(keys));

export const store = {
  link: (host: Url.Host<CanonicalUrl>, expiry: number) =>
    sock.link(new Url(host + '').host, expiry)
}
