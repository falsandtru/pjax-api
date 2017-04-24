import { PjaxError } from '../../../lib/error';

export class DomainError extends PjaxError {
  constructor(msg: string) {
    super(`Domain: ${msg}`);
  }
}
assert(new DomainError('') instanceof Error);
