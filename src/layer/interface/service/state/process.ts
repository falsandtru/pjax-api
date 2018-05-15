import { Supervisor } from 'spica/supervisor.legacy';

export const process = new class extends Supervisor<'', Error> { }();
