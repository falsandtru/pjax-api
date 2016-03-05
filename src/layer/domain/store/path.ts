import { store } from '../../data/store/path';
import { Url } from '../../../lib/url';
import { CanonicalUrl } from '../../data/model/canonicalization/url';

export function loadTitle(path: Url.Path<CanonicalUrl>): string {
  return store.link(path).title;
}

export function saveTitle(path: Url.Path<CanonicalUrl>, title: string): string {
  return store.link(path).title = title;
}

export function loadPosition(path: Url.Path<CanonicalUrl>): { top: number | undefined; left: number | undefined; } {
  return store.link(path).position;
}

export function savePosition(path: Url.Path<CanonicalUrl>, position: { top: number; left: number; }): void {
  store.link(path).position = position;
}
