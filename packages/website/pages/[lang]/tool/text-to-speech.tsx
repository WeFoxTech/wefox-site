
import * as React from 'react';
import Layout from '~/components/Layout';
import About from '~/components/about/About.mdx';
import AboutZh from '~/components/about/About-zh.mdx';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import useTranslation from '~/src/hooks/useTranslation';
import { PageMeta } from '~/src/PageMeta';
import { LayoutMenu } from '~/src/menu';
import { menus } from '~/pages/[lang]/index';
import { Speech } from '~/components/tool/Speech';
// import { About } from '~/components/about/About';


const commonKeyworks = ['wefox'];
const meta: PageMeta = {
  title: 'Text-to-speech tool',
  keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
  description: 'Professional technical consulting and consulting services',
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
    <Layout meta={meta} menus={menus}>
      {/* {locale === 'zh' ? <AboutZh /> : <About />} */}
      {/* <About /> */}
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

