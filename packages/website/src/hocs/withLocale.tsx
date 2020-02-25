import React from 'react'
import { NextPage } from 'next'
import Error from 'next/error'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { isLocale, Translations, Namespace } from '../translations/types'
import {  Locale } from '../translations/config'
import { LocaleProvider } from '../context/LocaleContext'
import locales from '../translations/locales'

interface LangProps {
  locale?: Locale
  translations?: Translations
  namespace: Namespace
}

export default  (WrappedPage: NextPage<any>) => {
  const WithLocale: NextPage<any, LangProps> = ({ locale, translations, namespace, ...pageProps }) => {
    if (!locale) {
      return <Error statusCode={404} />
    }
    if (!translations) {
      return <Error statusCode={500} />
    }
    return (
      <LocaleProvider lang={locale} translations={translations} namespace={namespace}>
        <WrappedPage {...pageProps} />
      </LocaleProvider>
    )
  }

  WithLocale.displayName = `withLang(${getDisplayName(WrappedPage)})`

  return WithLocale
}
