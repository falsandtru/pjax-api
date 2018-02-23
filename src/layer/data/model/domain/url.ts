import { Encoded } from '../attribute/encode';
import { Normalized } from '../attribute/normalize';

namespace Identifier {
  declare class Url<T> {
    private static readonly IDENTITY: unique symbol;
    private readonly [Url.IDENTITY]: T;
  }

  export type URL<T> = Url<T> & string;
}

type Url<T> = Identifier.URL<T>;


// https://www.ietf.org/rfc/rfc3986.txt

export type StandardUrl = Url<Encoded & Normalized>;

export function standardizeUrl(url: Url<any>): void
export function standardizeUrl(url: string): StandardUrl
export function standardizeUrl(url: string): StandardUrl {
  return encode(normalize(url));
}


type EncodedUrl<T = Encoded> = Url<Encoded & T>;

function encode(url: EncodedUrl): void
function encode<T>(url: Url<T>): EncodedUrl<T>
function encode(url: string): EncodedUrl
function encode(url: string): EncodedUrl {
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
    .replace(/#.+/, url.slice(url.indexOf('#'))) as EncodedUrl;
}
export { encode as _encode }


type NormalizedUrl = Url<Normalized>;

const parser = document.createElement('a');

function normalize(url: Url<any>): void
function normalize(url: string): NormalizedUrl
function normalize(url: string): NormalizedUrl {
  // Absolute path
  parser.href = url || location.href;
  assert(parser.href.startsWith(parser.protocol));
  return parser.href
    // Remove the default port
    .replace(/^([^:/?#]+:\/\/[^/?#]*?):(?:80)?(?=$|[/?#])/, '$1')
    // Fill the root path
    .replace(/^([^:/?#]+:\/\/[^/?#]*)\/?/, '$1/')
    // Use uppercase letters within percent-encoding triplets
    .replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase())
    .replace(/#.+/, url.slice(url.indexOf('#'))) as NormalizedUrl;
}
