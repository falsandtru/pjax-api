import { Cancellatee } from 'spica';
import { RouterEvent } from '../../../event/router';
import { Config } from '../../../data/config';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';

export class RouterEntity {
  constructor(
    public readonly config: Config,
    public readonly event: RouterEvent,
    public readonly state: RouterEntityState
  ) {
    void Object.freeze(this);
  }
}

export class RouterEntityState {
  constructor(
    public readonly scripts: ReadonlySet<CanonicalUrl>,
    public readonly cancellation: Cancellatee<Error>
  ) {
    void Object.freeze(this);
  }
}
