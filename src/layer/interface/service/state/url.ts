import { StandardURL, standardizeURL } from '../../../../lib/url';
import { bind } from 'typed-dom';

void bind(window, 'hashchange', () =>
  void docurl.sync());

export const docurl = new class {
  private url: StandardURL = standardizeURL(window.location.href);
  public get href(): StandardURL {
    return this.url;
  }
  public sync(): void {
    this.url = standardizeURL(window.location.href);
  }
};
