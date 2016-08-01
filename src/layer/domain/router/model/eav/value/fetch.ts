import { parse } from '../../../module/fetch/html';

export class FetchValue {
  constructor(
    public readonly xhr: XMLHttpRequest
  ) {
    void Object.freeze(this);
  }
  public readonly response = new class {
    constructor(
      private readonly xhr: XMLHttpRequest
    ) {
      const separator = ':';
      const regHeaderName = /^[0-9A-z\-]+$/;
      void this.xhr.getAllResponseHeaders().split('\n')
        .filter(s => s.indexOf(separator) > 0)
        .map(s => [s.slice(0, s.indexOf(separator)).trim(), s.slice(s.indexOf(separator) + 1).trim()])
        .filter(([k]) => regHeaderName.test(k))
        .reduce<{ [name: string]: string; }>((h, [k, v]) => (h[k] = v, h), this.headers);
      void Object.freeze(this.headers);
      void Object.freeze(this);
    }
    public readonly headers: { [name: string]: string; } = {};
    public readonly document: Document = this.xhr.responseType === 'document'
      ? this.xhr.responseXML
      : parse(this.xhr.responseText).extract();
  }(this.xhr);
}
