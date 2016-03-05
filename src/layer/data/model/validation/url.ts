export declare class ValidUrl extends String {
  private VALID;
}

const parser = document.createElement('a');

export function validateUrl(url: string): ValidUrl {
  // Trim
  url = url.trim();
  // Convert to absolute path
  url = (parser.href = url || location.href, parser.href);
  // Convert to UTF-8 encoded string
  url = encodeURI(decodeURI(url)).replace(/%25/g, '%');
  // Remove string of starting with an invalid character
  url = url.replace(/["`^|\\<>{}\[\]\s].*/, '');
  return <any>url;
}
