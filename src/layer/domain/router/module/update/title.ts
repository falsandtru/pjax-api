export function title(
  documents: {
    src: Document;
    dst: Document;
  }
): void {
  documents.dst.title = documents.src.title;
}
