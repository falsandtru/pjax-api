import { LocalPortObject } from 'localsocket';

export const VERSION: number = 1;

export interface VersionSchema extends LocalPortObject { }
export class VersionSchema {
  public get event() {
    return this.__event;
  }
  public version: number = VERSION;
}
