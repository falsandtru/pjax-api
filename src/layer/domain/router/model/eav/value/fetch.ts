import { parse } from '../../../../../../lib/html';
import { standardizeUrl } from '../../../../../data/model/domain/url';

export class FetchResponse {
  constructor(
    private readonly xhr: XMLHttpRequest,
    private readonly redirect: boolean,
  ) {
    assert(this.xhr instanceof XMLHttpRequest);
    assert(this.document instanceof Document);
    void Object.freeze(this);
  }
  public readonly url = this.redirect && this.xhr.responseURL
    ? standardizeUrl(this.xhr.responseURL)
    : '';
  public readonly header = (name: string): string | null =>
    this.xhr.getResponseHeader(name);
  public readonly document: Document = this.xhr.responseType === 'document'
    ? this.xhr.responseXML as Document
    : parse(this.xhr.responseText).extract();
}
