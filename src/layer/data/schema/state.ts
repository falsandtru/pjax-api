export interface StateSchema {
  title: string;
  position: StateSchema.Position;
}
export namespace StateSchema {
  export type title = 'title';
  export type position = 'position';
  export type Position = {
    top: number;
    left: number;
  };
}
