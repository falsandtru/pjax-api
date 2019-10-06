export class FatalError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
Error.prototype.name = 'Error';
FatalError.prototype.name = 'FatalError';
assert(new FatalError('') instanceof Error);
assert(new FatalError('') instanceof FatalError);
assert(new FatalError('').name === 'FatalError');
