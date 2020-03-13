import { localeNames, Locale } from './config';

import EnLocale from './locales/en';

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

export type AllTranslations = typeof EnLocale;

export type TranslationNamespaces = keyof AllTranslations;

export type MergedTranslations = AllTranslations[TranslationNamespaces];

export type TranslationKey = keyof UnionToIntersection<MergedTranslations>;

export interface Translations {
  [key: string]: string;
}

export type Namespace = keyof Translations;

export type Strings = {
  [key in Locale]: Translations;
};

export type InlineLocale<T = string> = { [key in Locale]: T };

export function isLocale(tested: string): tested is Locale {
  return localeNames.some(locale => locale === tested);
}
