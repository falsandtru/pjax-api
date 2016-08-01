import { Cancelable } from 'spica';
import { Config } from '../../../data/config';
import { RouterEvent } from '../../../event/router';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';

export class RouterEntity {
  constructor(
    public readonly event: RouterEvent,
    public readonly config: Config,
    public readonly state: RouterEntity.State
  ) {
    void Object.freeze(this);
  }
}

export namespace RouterEntity {
  export class State {
    constructor(
      public readonly script: CanonicalUrl[],
      public readonly cancelable: Cancelable<Error>
    ) {
      void Object.freeze(this);
    }
  }
}
