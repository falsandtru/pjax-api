import { StandardURL, standardize } from 'spica/url';
import { bind } from 'typed-dom';

void bind(window, 'hashchange', () =>
  void docurl.sync());

export const docurl = new class {
  private url: StandardURL = standardize(window.location.href);
  public get href(): StandardURL {
    return this.url;
  }
  public sync(): void {
    this.url = standardize(window.location.href);
  }
}();
