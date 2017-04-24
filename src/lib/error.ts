export class PjaxError extends Error {
  constructor(msg: string) {
    super(`Pjax: ${msg}`);
  }
}
assert(new PjaxError('') instanceof Error);
