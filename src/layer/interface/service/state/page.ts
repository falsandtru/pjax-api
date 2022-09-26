import { window } from 'spica/global';
import { isTransitable } from '../../../data/store/state';
import { URL, StandardURL, standardize } from 'spica/url';
import { bind } from 'typed-dom/listener';

void bind(window, 'hashchange', () =>
  void page.sync(), true);

void bind(window, 'popstate', () =>
  isTransitable(page.state) && isTransitable(window.history.state) || void page.sync(), true);

export const page = new class {
  private $url: URL<StandardURL> = new URL(standardize(window.location.href));
  private target?: URL<StandardURL>;
  private $state: any = window.history.state;
  private available = true;
  public get url(): URL<StandardURL> {
    return this.$url;
  }
  public get state(): any {
    return this.$state;
  }
  public isAvailable(): boolean {
    return this.available;
  }
  public process(url: URL<StandardURL>): void {
    this.available = false;
    this.target = url;
  }
  public complete(): void {
    this.$url = this.target ?? new URL(standardize(window.location.href));
    this.target = void 0;
    this.$state = window.history.state;
    this.available = true;
  }
  public sync(): void {
    this.$url = new URL(standardize(window.location.href));
    this.target = void 0;
    this.$state = window.history.state;
  }
}();
