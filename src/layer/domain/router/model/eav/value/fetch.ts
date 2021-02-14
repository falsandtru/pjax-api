import { ObjectDefineProperty, ObjectFreeze } from 'spica/alias';
import { fix } from '../../../../../../lib/html';
import { URL, StandardURL } from 'spica/url';

export class FetchResponse {
  constructor(
    public readonly url: URL<StandardURL>,
    private readonly xhr: XMLHttpRequest,
  ) {
    assert(this.document instanceof Document);
    assert([...this.document.querySelectorAll('link')].every(el => !el.href.startsWith('about:')));
    assert([...this.document.querySelectorAll('script')].every(el => !el.src.startsWith('about:')));
    if (url.origin !== new URL(xhr.responseURL, window.location.href).origin) throw new Error(`Redirected to another origin.`);
    void ObjectDefineProperty(this.document, 'URL', {
      configurable: true,
      enumerable: true,
      value: url.href,
      writable: false,
    });
    void fix(this.document);
    assert(this.document.URL === url.href);
    void ObjectFreeze(this);
  }
  public readonly header: (name: string) => string | null =
    name => this.xhr.getResponseHeader(name);
  public readonly document: Document = this.xhr.responseXML!.cloneNode(true) as Document;
}
