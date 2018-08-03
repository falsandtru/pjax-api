import { scripts } from './script';

export const env = Promise.all([
  scripts,
  new Promise<void>(r => void setTimeout(r)),
]);
