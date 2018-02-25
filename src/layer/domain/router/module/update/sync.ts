import { Either, Left, Right } from 'spica/either';
import { concat } from 'spica/concat';
import { tuple } from 'spica/tuple';

export function sync<T extends HTMLElement>(
  pairs: [T[], T | null][],
  fallback: HTMLElement,
  io = {
    before,
    remove
  }
): undefined {
  return void pairs
    .forEach(([srcs, dst]) => (
      void io.before(
        parent(dst),
        srcs.slice(-1).some(src => !!dst && src.outerHTML === dst.outerHTML)
          ? srcs.slice(0, -1)
          : srcs,
        dst),
      dst && srcs.length === 0
        ? void io.remove(dst)
        : undefined));

  function parent(dst: T | null): HTMLElement {
    return dst
      ? dst.parentElement!
      : fallback;
  }
}

export function pair<T>(srcs: T[], dsts: T[], compare: (a: T, b: T) => boolean): [T[], T | null][] {
  const link = bind(srcs, dsts, compare);
  void dsts
    .filter(dst =>
      !link.has(dst))
    .forEach(dst =>
      void link.set(dst, []));
  return [...link]
    .map(([dst, srcs]) => tuple([srcs, dst]));

  function bind<T>(srcs: T[], dsts: T[], compare: (a: T, b: T) => boolean): Map<T | null, T[]> {
    return srcs
      .reduce<Map<T | null, T[]>>((link, src) =>
        dsts.length === 0
          ? link.set(null, concat(link.get(null) || [], [src]))
          : dsts
              .reduce<Either<typeof link, typeof link>>((m, dst) =>
                m.bind(link =>
                  !link.has(dst) && compare(src, dst)
                    ? (
                      void link.set(dst, concat(link.get(null) || [], [src])),
                      void link.delete(null),
                      Left(link))
                    : Right(link))
              , Right(link))
              .fmap(link =>
                link.set(null, concat(link.get(null) || [], [src])))
              .extract(link =>
                link)
      , new Map<T, T[]>());
  }
}

function before(parent: HTMLElement, children: HTMLElement[], ref: HTMLElement | null): undefined {
  assert(!ref || ref.parentElement === parent);
  return void children
    .map(child => parent.ownerDocument.importNode(child.cloneNode(true), true) as HTMLElement)
    .forEach(child => void parent.insertBefore(child, ref));
}

function remove(el: HTMLElement): undefined {
  return void el.remove();
}
