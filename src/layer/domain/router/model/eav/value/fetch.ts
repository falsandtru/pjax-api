import { parse } from '../../../../../../lib/html';
import { StandardUrl } from '../../../../../data/model/domain/url';

export class FetchResponse {
  constructor(
    public readonly url: StandardUrl,
    private readonly xhr: XMLHttpRequest,
  ) {
    assert(this.xhr instanceof XMLHttpRequest);
    assert(this.document instanceof Document);
    void Object.freeze(this);
  }
  public readonly header: (name: string) => string | null = name =>
    this.xhr.getResponseHeader(name);
  public readonly document: Document = this.xhr.responseType === 'document'
    ? this.xhr.responseXML as Document
    : parse(this.xhr.responseText).extract();
}
