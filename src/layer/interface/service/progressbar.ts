const bar = document.createElement('div');
void window.addEventListener('pjax:fetch', () =>
  void document.documentElement.appendChild(bar));
void window.addEventListener('pjax:fetch', () =>
  bar.style.width = '5%');
void window.addEventListener('pjax:unload', () =>
  bar.style.width = '80%');
void document.addEventListener('pjax:ready', () =>
  bar.style.width = '90%');
void window.addEventListener('pjax:load', () =>
  bar.style.width = '100%');
void window.addEventListener('pjax:load', () =>
  void bar.remove())

export function progressbar(style: string): void {
  void bar.setAttribute('style', style);
}
