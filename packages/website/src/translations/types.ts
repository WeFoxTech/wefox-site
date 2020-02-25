import { locales, Locale } from './config';

// import  NS from './locales/en'
// export type Locale = typeof locales[number]

// export type AllTranslations = typeof NS

export interface Translations {
  [key: string]: string;
}

export type Namespace = keyof Translations;

export type Strings = {
  [key in Locale]: Translations;
};

// export interface Namespace {
//   namespace: string
// }

export function isLocale(tested: string): tested is Locale {
  return locales.some(locale => locale === tested);
}
