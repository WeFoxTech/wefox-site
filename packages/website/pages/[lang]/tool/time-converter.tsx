import * as React from 'react';
import Layout from '~/components/Layout';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import useTranslation from '~/src/hooks/useTranslation';
import { PageMeta } from '~/src/PageMeta';
import { TimeConterter } from '~/components/tool/TimeConverter';

const commonKeyworks = ['wefox', 'time unit'];
const meta: PageMeta = {
  title: 'time unit converter',
  keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
  description: 'Tools to convert various time units',
  author: 'fox, hi@fox.mn',
  zh: {
    title: '时间单位转换工具',
    keywords: [...commonKeyworks, '时间单位转换', '时间单位', '技术咨询', '技术顾问'],
    description: '转换各种时间单位的工具',
  },
};

const TimeConvertPage = () => {
  const { t, locale } = useTranslation();

  return (
    <Layout meta={meta}>
      <TimeConterter />
    </Layout>
  );
};

export default withLocale(TimeConvertPage);

export async function getStaticPaths() {
  return {
    paths: ['en', 'zh'].map(l => ({ params: { lang: l } })),
    fallback: false,
  };
}

export const getStaticProps: GetstaticProps = async ({ params }) => {
  const { lang } = params;
  const currentLocales = locales[lang];
  return {
    props: {
      locale: lang,
      translations: Object.assign({}, currentLocales['common'], currentLocales['converter']),
    },
  };
};
