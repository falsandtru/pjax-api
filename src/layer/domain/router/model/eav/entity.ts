import { Cancellee } from 'spica/cancellation';
import { RouterEvent } from '../../../event/router';
import { Config } from '../../../data/config';
import { URL, StandardURL } from '../../../../../lib/url';

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
    public readonly process: Cancellee<Error>,
    public readonly scripts: ReadonlySet<URL.Absolute<StandardURL>>,
  ) {
    void Object.freeze(this);
  }
}
