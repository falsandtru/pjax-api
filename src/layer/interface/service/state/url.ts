import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';
import { bind } from 'typed-dom';

let url = standardizeUrl(location.href);

void bind(window, 'hashchange', () =>
  void currentUrl.sync());

export const currentUrl = new class {
  public get href(): StandardUrl {
    return url;
  }
  public sync = (): void => {
    url = standardizeUrl(location.href);
  }
}();
