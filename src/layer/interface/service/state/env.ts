import { scripts } from './script';

export const env = Promise.all([
  scripts,
  new Promise<void>(setTimeout),
]);
