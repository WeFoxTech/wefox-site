import { Locale } from './translations/config';

// https://www.cnblogs.com/FACESCORE/p/11141653.html
// https://www.w3schools.com/tags/tag_meta.asp
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
export interface HtmlMeta {
  title: string;
  keywords: string[];
  description: string;
  author?: string;
}

export type PageMeta = {
  [key in Locale]?: Partial<HtmlMeta>;
} &
  HtmlMeta;

export type HtmlMetaKey = keyof HtmlMeta;

export const metaKeys: HtmlMetaKey[] = ['description', 'keywords', 'author'];

export function getTitle(meta: PageMeta, locale: Locale): string {
  if (meta) {
    const current = meta[locale];
    if (current && current.title) {
      return current.title;
    } else if (meta.title) {
      return meta.title;
    }
  }
  console.error(`can not found title from  locale:[${locale}] in PageMeta: `, meta);
  return '';
}

function _optMeta(
  key: HtmlMetaKey,
  locale: Locale,
  meta?: PageMeta
): string | string[] | undefined {
  if (meta) {
    const current = meta[locale];
    if (current && current[key]) {
      return current[key];
    } else if (meta[key]) {
      return meta[key];
    }
  }
  console.error(`can not found [${key}] from  locale:[${locale}] in PageMeta: `, meta);
  return '';
}

export function optMeta(key: HtmlMetaKey, locale: Locale, meta?: PageMeta): string {
  let value = _optMeta(key, locale, meta);
  if (key === 'keywords') {
    if (value && Array.isArray(value)) {
      return value.join(',');
    }
  }
  if (value) {
    return value as string;
  }
  return '';
}
