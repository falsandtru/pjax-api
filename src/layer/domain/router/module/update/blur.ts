export function blur(document: Document): void {
  if (document !== window.document || document.activeElement === document.body) return;
  void (document.activeElement as HTMLElement).blur();
  void document.body.focus();
}
