// history.state
export interface State {
  readonly title: string;
  readonly position: {
    readonly top: number;
    readonly left: number;
  };
}
export namespace State {
  export type Title = State['title'];
  export type Position = State['position'];
}
