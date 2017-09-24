import { Cancellee } from 'spica/cancellation';
import { RouterEvent } from '../../../event/router';
import { Config } from '../../../data/config';
import { StandardUrl } from '../../../../data/model/domain/url';
import { URL } from '../../../../../lib/url';

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
    public readonly scripts: ReadonlySet<URL.Absolute<StandardUrl>>,
  ) {
    void Object.freeze(this);
  }
}
