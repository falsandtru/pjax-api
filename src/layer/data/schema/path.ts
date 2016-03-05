import { LocalSocketObject } from 'localsocket';
import { Url } from '../../../lib/url';

export interface PathSchema extends LocalSocketObject<Url.Path<string>> { }
export class PathSchema {
  public host: Url.Host<string> = new Url('').host;
  public title: string = '';
  public position: {
    top: number | undefined;
    left: number | undefined;
  } = {
    top: void 0,
    left: void 0
  };
}
