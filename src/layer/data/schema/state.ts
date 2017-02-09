export interface StateSchema {
  title: StateSchema.Title;
  position: StateSchema.Position;
}
export namespace StateSchema {
  export type title = 'title';
  export type Title = string;
  export type position = 'position';
  export type Position = {
    top: number;
    left: number;
  };
}
