import { Supervisor } from 'spica/supervisor';

export const process = new class extends Supervisor<'', Error> { }();
