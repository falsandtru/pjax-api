export interface State {
  title: State.Title;
  position: State.Position;
}
export namespace State {
  export type title = 'title';
  export type Title = string;
  export type position = 'position';
  export type Position = {
    top: number;
    left: number;
  };
}
