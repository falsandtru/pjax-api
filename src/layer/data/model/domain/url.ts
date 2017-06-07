import { Encoded } from '../attribute/encode';
import { Normalized } from '../attribute/normalize';
import { Cache } from 'spica';

namespace Identifier {
  declare class Url<T> {
    private IDENTITY: T;
  }

  export type URL<T> = Url<T> & string;
}

type Url<T> = Identifier.URL<T>;


// https://www.ietf.org/rfc/rfc3986.txt

export type StandardUrl = Url<Normalized & Encoded>;

const cache = new Cache<string, StandardUrl>(32);

export function standardizeUrl(url: Url<any>): void
export function standardizeUrl(url: string): StandardUrl
export function standardizeUrl(url: string): StandardUrl {
  return cache.has(url)
    ? cache.get(url)!
    : cache.set(url, encode(normalize(url)));
}


type EncodedUrl = Url<Encoded>;

function encode(url: EncodedUrl): void
function encode<T>(url: Url<T>): Url<T & Encoded>
function encode(url: string): EncodedUrl
function encode(url: string): EncodedUrl {
  return <EncodedUrl>url
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
    .replace(/#.+/, fragment =>
      '#' +
      fragment.slice(1)
        .replace(/%[0-9A-F]{2}|./ig, str =>
          str.length < 3
            ? encodeURIComponent(str)
            : str))
    .replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase());
}
export { encode as encode_ };


type NormalizedUrl = Url<Normalized>;

function normalize(url: string): NormalizedUrl
function normalize(url: string): NormalizedUrl {
  // Absolute path
  const parser = document.createElement('a');
  parser.href = url || location.href;
  return <NormalizedUrl>parser.href
    // Remove the default port
    .replace(/^([^:/?#]+:\/\/[^/?#]*?):(?:80)?(?=$|[/?#])/, '$1')
    // Fill the root path
    .replace(/^([^:/?#]+:\/\/[^/?#]*)\/?/, '$1/')
    // Use uppercase letters within percent-encoding triplets
    .replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase());
}
