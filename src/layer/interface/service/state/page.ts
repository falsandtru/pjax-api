import { window } from 'spica/global';
import { isTransitable } from '../../../data/store/state';
import { StandardURL, standardize } from 'spica/url';
import { bind } from 'typed-dom/listener';

void bind(window, 'hashchange', () =>
  void page.sync());

void bind(window, 'popstate', () =>
  isTransitable(page.state) && isTransitable(window.history.state) || void page.sync());

export const page = new class {
  private url: StandardURL = standardize(window.location.href);
  private state_: any = window.history.state;
  public get href(): StandardURL {
    return this.url;
  }
  public get state(): any {
    return this.state_;
  }
  public sync(): void {
    this.url = standardize(window.location.href);
    this.state_ = window.history.state;
  }
}();
