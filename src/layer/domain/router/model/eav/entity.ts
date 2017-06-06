import { Cancellee } from 'spica';
import { RouterEvent } from '../../../event/router';
import { Config } from '../../../data/config';
import { StandardUrl } from '../../../../data/model/domain/url';

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
    public readonly scripts: ReadonlySet<StandardUrl>,
    public readonly cancellation: Cancellee<Error>
  ) {
    void Object.freeze(this);
  }
}
