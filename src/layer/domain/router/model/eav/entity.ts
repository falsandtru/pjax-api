import { Cancelable } from 'spica';
import { RouterEvent } from '../../../event/router';
import { Config as RouterConfig } from '../../../data/config';
import { CanonicalUrl } from '../../../../data/model/canonicalization/url';

export class RouterEntity {
  constructor(
    public readonly config: RouterEntity.Config,
    public readonly event: RouterEntity.Event,
    public readonly state: RouterEntity.State
  ) {
    void Object.freeze(this);
  }
}

export namespace RouterEntity {
  export import Event = RouterEvent;
  export type Config = RouterConfig;
  export class State {
    constructor(
      public readonly scripts: Set<CanonicalUrl>,
      public readonly cancelable: Cancelable<Error>
    ) {
      void Object.freeze(this);
    }
  }
}
