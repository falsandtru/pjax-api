import { Tick } from 'spica';
import './script';

export const initialization = new Promise<void>(resolve =>
  void Tick(resolve));
