import 'typed-query-selector';

declare global {
  interface Node {
    cloneNode(deep?: boolean): this;
  }
}
