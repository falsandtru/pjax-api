import { RouterEvent } from '../../../event/router';
import { Config } from '../../../data/config';
import { Cancellee } from 'spica/cancellation';
import { URL, StandardURL } from 'spica/url';

export class RouterEntity {
  constructor(
    public readonly config: Config,
    public readonly event: RouterEvent,
    public readonly state: RouterEntityState
  ) {
    Object.freeze(this);
  }
}

export class RouterEntityState {
  constructor(
    public readonly process: Cancellee<Error>,
    public readonly scripts: ReadonlySet<URL.Href<StandardURL>>,
  ) {
    Object.freeze(this);
  }
}
