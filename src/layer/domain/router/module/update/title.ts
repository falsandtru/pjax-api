export function title(
  document: {
    src: Document;
    dst: Document;
  }
): void {
  document.dst.title = document.src.title;
}
