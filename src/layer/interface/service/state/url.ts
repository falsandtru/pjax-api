import { StandardUrl, standardizeUrl } from '../../../data/model/domain/url';

export const documentUrl = new class {
  href = standardizeUrl(location.href);
  sync(): StandardUrl {
    return this.href = standardizeUrl(location.href);
  }
};
