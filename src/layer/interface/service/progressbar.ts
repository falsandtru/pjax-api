const bar = document.createElement('div');
window.addEventListener('pjax:fetch', () =>
  void document.documentElement!.appendChild(bar));
window.addEventListener('pjax:fetch', () =>
  bar.style.width = '5%');
window.addEventListener('pjax:unload', () =>
  bar.style.width = '80%');
document.addEventListener('pjax:ready', () =>
  bar.style.width = '90%');
window.addEventListener('pjax:load', () =>
  bar.style.width = '100%');
window.addEventListener('pjax:load', () =>
  void bar.remove())

export function progressbar(style: string): void {
  bar.setAttribute('style', style);
}
