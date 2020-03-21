import * as React from 'react';
import Layout from '~/components/Layout';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import useTranslation from '~/src/hooks/useTranslation';
import { PageMeta } from '~/src/PageMeta';
import { ByteConverter } from '~/components/tool/ByteConverter';

const commonKeyworks = ['wefox', 'Byte unit'];
const meta: PageMeta = {
  title: 'byte unit converter',
  keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
  description: 'Tools to convert various byte units',
  author: 'fox, hi@fox.mn',
  zh: {
    title: '字节单位转换工具',
    keywords: [
      ...commonKeyworks,
      '字节单位转换',
      '字节单位',
      '文件单位',
      '存储单位',
      '带宽单位',
      '技术咨询',
      '技术顾问',
    ],
    description: '转换字节单位的工具',
  },
};

const ByteUnitConvertPage = () => {
  const { t, locale } = useTranslation();

  return (
    <Layout meta={meta}>
      <ByteConverter />
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
