import { LocalSocketObject } from 'localsocket';
import { Url } from '../../../lib/url';

export interface HostSchema extends LocalSocketObject<Url.Host<string>> { }
export class HostSchema {
  public score: number = 0;
  public expiry: number = 0;
}
