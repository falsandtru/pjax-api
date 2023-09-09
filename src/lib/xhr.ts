import { AtomicPromise } from 'spica/promise';
import { clock } from 'spica/chrono';

export class FakeXMLHttpRequest extends XMLHttpRequest {
  public static create(url: string, response: Document | PromiseLike<Document>): FakeXMLHttpRequest {
    const xhr = new FakeXMLHttpRequest();
    AtomicPromise.resolve(response)
      .then(
        response => {
          if (xhr.readyState === 4) return;
          Object.defineProperties(xhr, {
            responseURL: {
              value: url,
            },
            responseXML: {
              value: response,
            },
          });
          xhr.send();
        },
        reason => {
          if (xhr.readyState === 4) return;
          const response = reason instanceof Response
            ? reason
            : new Response(null, xhr);
          Object.defineProperties(xhr, {
            responseURL: {
              value: url,
            },
            readyState: {
              value: 4,
            },
            status: {
              value: response.status || 400,
            },
            statusText: {
              value: response.statusText || 'Bad Request',
            },
          });
          xhr.dispatchEvent(new ProgressEvent('error'));
        });
    return xhr;
  }
  constructor() {
    super();
    this.responseType = 'document';
  }
  public override send(_?: Document | XMLHttpRequestBodyInit | null | undefined): void {
    if (this.readyState === 4) return;
    Object.defineProperties(this, {
      readyState: {
        configurable: true,
        value: 3,
      },
    });
    this.dispatchEvent(new ProgressEvent('loadstart'));
    clock.now(() => {
      if (this.readyState === 4) return;
      Object.defineProperties(this, {
        response: {
          get: () =>
            this.responseType === 'document'
              ? this.responseXML
              : this.responseText,
        },
        readyState: {
          value: 4,
        },
        status: {
          value: 200,
        },
        statusText: {
          value: 'OK',
        },
      });
      this.dispatchEvent(new ProgressEvent('loadend'));
      this.dispatchEvent(new ProgressEvent('load'));
    });
  }
  public override abort(): void {
    if (this.readyState === 4) return;
    Object.defineProperties(this, {
      readyState: {
        value: 4,
      },
      status: {
        value: 400,
      },
      statusText: {
        value: 'Bad Request',
      },
    });
    this.dispatchEvent(new ProgressEvent('abort'));
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
