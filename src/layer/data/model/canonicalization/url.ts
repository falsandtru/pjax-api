import { Canonical } from './canonical';
import { ValidUrl } from '../validation/url';

export type CanonicalUrl = Canonical & string;

export function canonicalizeUrl(url: ValidUrl): CanonicalUrl {
  // Fix case of percent encoding
  return <any>url.replace(/(?:%\w{2})+/g, str => str.toUpperCase());
}
