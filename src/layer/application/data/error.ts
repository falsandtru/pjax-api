import { PjaxError } from '../../../lib/error';

export class ApplicationError extends PjaxError {
  constructor(msg: string) {
    super(`Application: ${msg}`);
  }
}
assert(new ApplicationError('') instanceof Error);
