import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';

let url = standardizeUrl(location.href);

export const currentUrl = new class {
  public get href(): StandardUrl {
    return url;
  }
  public sync = (): void => {
    url = standardizeUrl(location.href);
  }
}();
