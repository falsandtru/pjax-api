import { PjaxError } from '../../../lib/error';

export class InterfaceError extends PjaxError {
  constructor(msg: string) {
    super(`Interface: ${msg}`);
  }
}
