export class PjaxError extends Error {
  constructor(msg: string) {
    super(`Pjax: ${msg}`);
  }
}
assert(new PjaxError('') instanceof Error);

export class FatalError extends PjaxError {
  constructor(msg: string) {
    super(`Pjax: Fatal: ${msg}`);
    this.name = 'FatalError';
  }
}
assert(new FatalError('') instanceof Error);
assert(new FatalError('').name === 'FatalError');
