import { parse } from '../../../../../../lib/html';
import { standardizeUrl } from '../../../../../data/model/domain/url';

export class FetchResult {
  constructor(
    public readonly xhr: XMLHttpRequest
  ) {
    assert(this.xhr instanceof XMLHttpRequest);
    assert(this.response.document instanceof Document);
    void Object.freeze(this);
  }
  public readonly response = new class {
    constructor(
      private readonly xhr: XMLHttpRequest
    ) {
      void Object.freeze(this);
    }
    public readonly url = this.xhr.responseURL
      ? standardizeUrl(this.xhr.responseURL)
      : '';
    public header = (name: string): string | null =>
      this.xhr.getResponseHeader(name);
    public readonly document: Document = this.xhr.responseType === 'document'
      ? <Document>this.xhr.responseXML
      : parse(this.xhr.responseText).extract();
  }(this.xhr);
}
