import { extend } from 'spica/assign';
import { State } from '../schema/state';

if (window.history.state instanceof Object === false) {
  void window.history.replaceState({}, document.title);
}
assert(window.history.state instanceof Object);

void saveTitle();
void savePosition();

export function loadTitle(): State.Title {
  return window.history.state.title
      || document.title;
}

export function saveTitle(): void {
  void window.history.replaceState(
    extend<Pick<State, State.title>>(
      window.history.state || {},
      {
        title: document.title
      }),
    document.title);
}

export function loadPosition(): State.Position {
  return window.history.state.position
      || {
           top: window.pageYOffset,
           left: window.pageXOffset
         };
}

export function savePosition(): void {
  void window.history.replaceState(
    extend<Pick<State, State.position>>(
      window.history.state || {},
      {
        position: {
          top: window.pageYOffset,
          left: window.pageXOffset
        }
      }),
    document.title);
}
