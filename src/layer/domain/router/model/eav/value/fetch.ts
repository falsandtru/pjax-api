import { URL } from '../../../../../../lib/url';
import { StandardURL } from '../../../../../data/model/domain/url';
import { parse } from '../../../../../../lib/html';

export class FetchResponse {
  constructor(
    public readonly url: URL<StandardURL>,
    private readonly xhr: XMLHttpRequest,
  ) {
    assert(this.document instanceof Document);
    void Object.freeze(this);
  }
  public readonly header: (name: string) => string | null =
    name => this.xhr.getResponseHeader(name);
  public readonly document: Document =
    parse(this.xhr.responseText).extract();
}
