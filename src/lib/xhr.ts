import { AtomicPromise } from 'spica/promise';

export class FakeXMLHttpRequest extends XMLHttpRequest {
  public static create(url: string, response: Document | PromiseLike<Document>): FakeXMLHttpRequest {
    const xhr = new FakeXMLHttpRequest();
    AtomicPromise.resolve(response)
      .then(response => {
        Object.defineProperties(xhr, {
          responseURL: {
            value: url,
          },
          responseXML: {
            value: response,
          },
        });
        xhr.send();
      });
    return xhr;
  }
  constructor() {
    super();
    this.responseType = 'document';
  }
  public override send(_?: Document | XMLHttpRequestBodyInit | null | undefined): void {
    let state = 3;
    Object.defineProperties(this, {
      readyState: {
        get: () => state,
      },
    });
    setTimeout(() => {
      Object.defineProperties(this, {
        status: {
          value: 200,
        },
        statusText: {
          value: 'OK',
        },
        response: {
          get: () =>
            this.responseType === 'document'
              ? this.responseXML
              : this.responseText,
        },
      });
      this.dispatchEvent(new ProgressEvent('loadstart'));
      state = 4;
      this.dispatchEvent(new ProgressEvent('loadend'));
      this.dispatchEvent(new ProgressEvent('load'));
    });
  }
  public override getResponseHeader(name: string): string | null {
    switch (name.toLowerCase()) {
      case 'content-type':
        return 'text/html';
      default:
        return null;
    }
  }
}
