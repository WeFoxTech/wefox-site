import * as React from 'react';
import Layout from '~/components/Layout';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import useTranslation from '~/src/hooks/useTranslation';
import { PageMeta } from '~/src/PageMeta';
import { Speech } from '~/components/tool/Speech';

const commonKeyworks = ['wefox', 'Text-to-speech'];
const meta: PageMeta = {
  title: 'Text-to-speech tool',
  keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
  description: 'Help you convert text to speech, support multiple countries, more than 80 sounds',
  author: 'fox, hi@fox.mn',
  zh: {
    title: '文字转语音工具',
    keywords: [...commonKeyworks, '文字转语音', '微狐科技', '技术咨询', '技术顾问'],
    description: '帮助你把文字转化为语音，支持多个多个国家，八十多种声音',
  },
};

const AboutPage = () => {
  const { t, locale } = useTranslation();

  return (
    <Layout meta={meta}>
      <Speech />
    </Layout>
  );
};

export default withLocale(AboutPage);

export async function getStaticPaths() {
  return {
    paths: ['en', 'zh'].map(l => ({ params: { lang: l } })),
    fallback: false,
  };
}

export const getStaticProps: GetstaticProps = async ({ params }) => {
  const { lang } = params;
  return {
    props: {
      locale: lang,
      translations: locales[lang]['common'],
    },
  };
};
