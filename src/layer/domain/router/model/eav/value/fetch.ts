import { parse } from '../../../../../../lib/html';
import { standardizeUrl } from '../../../../../data/model/domain/url';

export class FetchResult {
  constructor(
    public readonly xhr: XMLHttpRequest
  ) {
    assert(this.xhr instanceof XMLHttpRequest);
    assert(this.response.headers instanceof Object);
    assert(this.response.document instanceof Document);
    void Object.freeze(this);
  }
  public readonly response = new class {
    constructor(
      private readonly xhr: XMLHttpRequest
    ) {
      const separator = ':';
      const regHeaderName = /^[0-9a-zA-Z\-]+$/;
      void this.xhr.getAllResponseHeaders().split('\n')
        .filter(s => s.indexOf(separator) > 0)
        .map(s => [s.slice(0, s.indexOf(separator)).trim(), s.slice(s.indexOf(separator) + 1).trim()])
        .filter(([k]) => regHeaderName.test(k))
        .reduce<{ [field: string]: string; }>((h, [k, v]) => (h[k] = v, h), this.headers);
      void Object.freeze(this.headers);
      void Object.freeze(this);
    }
    public readonly url = this.xhr.responseURL
      ? standardizeUrl(this.xhr.responseURL)
      : '';
    public readonly headers: { [field: string]: string; } = {};
    public readonly document: Document = this.xhr.responseType === 'document'
      ? <Document>this.xhr.responseXML
      : parse(this.xhr.responseText).extract();
  }(this.xhr);
}
