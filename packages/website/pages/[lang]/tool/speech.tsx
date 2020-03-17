
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
  title: 'About WeFox Technology',
  keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
  description: 'Professional technical consulting and consulting services',
  author: 'fox, i@fox.mn',
  zh: {
    title: '关于微狐科技',
    keywords: [...commonKeyworks, '微狐', '微狐科技', '技术咨询', '技术顾问'],
    description: '微狐科技为中小微企业以及个人提供专业的技术咨询、顾问服务',
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

