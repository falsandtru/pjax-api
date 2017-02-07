import { port } from 'localsocket';
import { VersionSchema } from '../schema/version';

export const link: VersionSchema = port('pjax:version', {
  schema() {
    return new VersionSchema();
  }
}).link();
