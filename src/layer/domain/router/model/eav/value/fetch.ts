import { parse } from '../../../../../../lib/html';
import { standardizeUrl } from '../../../../../data/model/domain/url';

export class FetchResult {
  constructor(
    public readonly xhr: XMLHttpRequest,
    private readonly redirect: boolean,
  ) {
    assert(this.xhr instanceof XMLHttpRequest);
    assert(this.response.document instanceof Document);
    void Object.freeze(this);
  }
  public readonly response = new class {
    constructor(
      private readonly parent: FetchResult,
    ) {
      void Object.freeze(this);
    }
    public readonly url = this.parent.redirect && this.parent.xhr.responseURL
      ? standardizeUrl(this.parent.xhr.responseURL)
      : '';
    public readonly header = (name: string): string | null =>
      this.parent.xhr.getResponseHeader(name);
    public readonly document: Document = this.parent.xhr.responseType === 'document'
      ? this.parent.xhr.responseXML as Document
      : parse(this.parent.xhr.responseText).extract();
  }(this);
}
