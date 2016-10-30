export function blur(document: Document): void {
  if (document !== window.document || document.activeElement === document.body) return;
  void (<HTMLElement>document.activeElement).blur();
  void document.body.focus();
}
