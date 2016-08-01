import { ValidUrl } from '../validation/url';

export declare class CanonicalUrl extends ValidUrl {
  private CANONICAL;
}

export function canonicalizeUrl(url: ValidUrl): CanonicalUrl {
  // Fix case of percent encoding
  return <any>url.replace(/(?:%\w{2})+/g, str => str.toUpperCase());
}
