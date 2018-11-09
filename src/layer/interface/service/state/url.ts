import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { bind } from 'typed-dom';

void bind(window, 'hashchange', () =>
  void docurl.sync());

export const docurl = new class {
  private url: StandardUrl = standardizeUrl(location.href);
  public get href(): StandardUrl {
    return this.url;
  }
  public sync(): void {
    this.url = standardizeUrl(location.href);
  }
};
