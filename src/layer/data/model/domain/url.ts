import { Encoded } from '../attribute/encode';
import { Normalized } from '../attribute/normalize';

namespace Identifier {
  declare class Identity<T> {
    private static readonly IDENTITY: unique symbol;
    private readonly [Identity.IDENTITY]: T;
  }

  export type URL<T> = Identity<T> & string;
}

type URL<T> = Identifier.URL<T>;


// https://www.ietf.org/rfc/rfc3986.txt

export type StandardURL = URL<Encoded & Normalized>;

export function standardizeURL(url: URL<any>): void
export function standardizeURL(url: string): StandardURL
export function standardizeURL(url: string): StandardURL {
  return encode(normalize(url));
}


type EncodedURL<T = Encoded> = URL<Encoded & T>;

function encode(url: EncodedURL): void
function encode<T>(url: URL<T>): EncodedURL<T>
function encode(url: string): EncodedURL
function encode(url: string): EncodedURL {
  return url
    // Trim
    .trim()
    // Percent-encoding
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str =>
      str.length === 2
        ? str
        : '')
    .replace(/%(?![0-9A-F]{2})|[^%\[\]]+/ig, encodeURI)
    .replace(/\?[^#]+/, query =>
      '?' +
      query.slice(1)
        .replace(/%[0-9A-F]{2}|[^=&]/ig, str =>
          str.length < 3
            ? encodeURIComponent(str)
            : str))
    .replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase())
    .replace(/#.+/, url.slice(url.indexOf('#'))) as EncodedURL;
}
export { encode as _encode }


type NormalizedURL = URL<Normalized>;

function normalize(url: URL<any>): void
function normalize(url: string): NormalizedURL
function normalize(url: string): NormalizedURL {
  // Absolute path
  url = new window.URL(url, window.location.href).href;
  return url
    // Remove the default port
    .replace(/^([^:/?#]+:\/\/[^/?#]*?):(?:80)?(?=$|[/?#])/, '$1')
    // Fill the root path
    .replace(/^([^:/?#]+:\/\/[^/?#]*)\/?/, '$1/')
    // Use uppercase letters within percent-encoding triplets
    .replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase())
    .replace(/#.+/, url.slice(url.indexOf('#'))) as NormalizedURL;
}
