export class UpdateValue {
  constructor(
    public readonly documents: {
      readonly src: Document;
      readonly dst: Document;
    }
  ) {
    void Object.freeze(this.documents);
    void Object.freeze(this);
  }
}
