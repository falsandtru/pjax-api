export class UpdateValue {
  constructor(
    public readonly document: {
      readonly src: Document;
      readonly dst: Document;
    }
  ) {
    void Object.freeze(this.document);
    void Object.freeze(this);
  }
}
