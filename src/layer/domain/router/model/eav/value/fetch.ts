import { StandardUrl } from '../../../../../data/model/domain/url';
import { fix } from '../../../../../../lib/html';

export class FetchResponse {
  constructor(
    public readonly url: StandardUrl,
    private readonly xhr: XMLHttpRequest,
  ) {
    assert(this.xhr.responseType === 'document');
    assert(this.document instanceof Document);
    void fix(this.document);
    void Object.freeze(this);
  }
  public readonly header: (name: string) => string | null =
    name => this.xhr.getResponseHeader(name);
  public readonly document: Document =
    this.xhr.response;
}
