import { State } from '../schema/state';

saveTitle();
savePosition();

export function loadTitle(): State.Title {
  return window.history.state?.title
      || document.title;
}

export function saveTitle(): void {
  window.history.replaceState(
    {
      ...window.history.state,
      title: document.title,
    },
    document.title);
}

export function loadPosition(): State.Position {
  return window.history.state?.position
      || {
           top: window.scrollY,
           left: window.scrollX,
         };
}

export function savePosition(): void {
  window.history.replaceState(
    {
      ...window.history.state,
      position: {
        ...window.history.state?.position,
        top: window.scrollY,
        left: window.scrollX,
      },
    },
    document.title);
}

export function isTransitable(state: State | null): boolean {
  return state?.pjax?.transition === true;
}

export function savePjax(): void {
  window.history.replaceState(
    {
      ...window.history.state,
      pjax: {
        ...window.history.state?.pjax,
        transition: true,
      },
    },
    document.title);
}
