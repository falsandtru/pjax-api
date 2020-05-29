// history.state
export interface State {
  readonly title: string;
  readonly position: {
    readonly top: number;
    readonly left: number;
  };
  readonly pjax: {
    readonly transition: boolean;
  };
}
export namespace State {
  export type Title = State['title'];
  export type Position = State['position'];
  export type Pjax = State['pjax'];
}
