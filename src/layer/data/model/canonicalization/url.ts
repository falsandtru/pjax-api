import { Canonical } from './canonical';
import { ValidUrl } from '../validation/url';

export type CanonicalUrl = Canonical & string;

export function canonicalizeUrl(url: ValidUrl): CanonicalUrl {
  // Fix case of percent-encoding
  url = <ValidUrl>url.replace(/(?:%\w{2})+/g, str => str.toUpperCase());
  // Remove default port
  url = <ValidUrl>url.replace(/^([^:/?#]+:\/\/[^/?#]*?):(?:80)?(?=$|[/?#])/, '$1');
  // Fill root path
  //url = <ValidUrl>url.replace(/^([^/]+\/\/[^/?#]+)\/?/, '$1/');
  return <CanonicalUrl><string>url;
}
