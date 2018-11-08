import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';

let url = standardizeUrl(location.href);

export const docurl = new class {
  public get href(): StandardUrl {
    return url;
  }
  public sync = (): void => {
    url = standardizeUrl(location.href);
  }
  public update = (url_: StandardUrl): void => {
    url = url_;
  }
}();
