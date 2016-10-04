import { scripts } from './script';

export const init = new Promise<void>(setTimeout)
  .then(() =>
    Promise.all([
      scripts
    ]));
