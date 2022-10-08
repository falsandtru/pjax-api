export function blur(document: Document): void {
  if (document !== window.document || document.activeElement === document.body) return;
  (document.activeElement as HTMLElement).blur();
  document.body.focus();
}
