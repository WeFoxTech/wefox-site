import { Locale } from './translations/config';

// https://www.cnblogs.com/FACESCORE/p/11141653.html
// https://www.w3schools.com/tags/tag_meta.asp
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

// https://gist.github.com/lancejpollard/1978404

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

const defaultMeta: PageMeta = {
  title: 'WeFox Technology',
  keywords: ['wefox', 'technical consulting', 'Technical Adviser'],
  description: 'Professional technical consulting and consulting services',
  author: 'wefox, team@wefox.tech',
  zh: {
    title: '微狐科技',
    keywords: ['wefox', '微狐', '微狐科技', '技术咨询', '技术顾问'],
    description: '专业的技术咨询、顾问服务',
  },
};

function _optMeta(
  key: HtmlMetaKey,
  locale: Locale,
  meta?: PageMeta
): string | string[] | undefined {
  meta = Object.assign({}, defaultMeta, meta);
  const current = meta[locale];
  if (current && current[key]) {
    return current[key];
  } else if (meta[key]) {
    return meta[key];
  }
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
  console.error(`can not found [${key}] from  locale:[${locale}] in PageMeta: `, meta);
  return '';
}
