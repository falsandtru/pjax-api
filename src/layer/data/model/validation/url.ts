import { Valid } from './valid';

export type ValidUrl = Valid & string;

const parser = document.createElement('a');

export function validateUrl(url: string): ValidUrl {
  // Trim
  url = url.trim();
  // Remove invalid surrogate pairs
  url = url.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '');
  // Convert to absolute path
  url = (parser.href = url || location.href, parser.href);
  assert(url.startsWith(`${parser.protocol}//`));
  // Encode
  url = url.replace(/%[0-9a-fA-F]{2}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^0-9a-zA-Z;/?:@&=+$,\-_.!~*'()\[\]]/g, str =>
    str.startsWith('%') && str.length === 3
      ? str
      : encodeURI(str));
  return <any>url;
}
