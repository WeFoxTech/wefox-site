import * as React from 'react';
import Layout from '~/components/Layout';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import useTranslation from '~/src/hooks/useTranslation';
import { PageMeta } from '~/src/PageMeta';
import { BitConverter } from '~/components/tool/BitConverter';

const commonKeyworks = ['wefox', 'bit unit'];
const meta: PageMeta = {
  title: 'bit unit converter',
  keywords: [...commonKeyworks, 'Bandwidth unit', 'technical consulting', 'Technical Adviser'],
  description: 'Tools to convert various bit units',
  author: 'fox, hi@fox.mn',
  zh: {
    title: '比特单位转换工具',
    keywords: [...commonKeyworks, '比特单位转换', '带宽单位', '宽带单位', '技术咨询', '技术顾问'],
    description: '转换比特单位的工具',
  },
};

const ByteUnitConvertPage = () => {
  const { t, locale } = useTranslation();

  return (
    <Layout meta={meta}>
      <BitConverter />
    </Layout>
  );
};

export default withLocale(ByteUnitConvertPage);

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
      translations: currentLocales['common'],
    },
  };
};
