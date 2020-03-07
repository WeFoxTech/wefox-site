import * as React from 'react';
import Layout from '../../components/Layout';
import About from '~/components/section/About.mdx';
import withLocale from '../../src/hocs/withLocale';
import { GetstaticProps } from '../../src/types/next';
import locales from '../../src/translations/locales';
import useTranslation from '../../src/hooks/useTranslation';
import { PageMeta } from '../../src/PageMeta';

const AboutPage = () => {
  const { t, locale } = useTranslation();
  const commonKeyworks = ['wefox'];

  const meta: PageMeta = {
    title: 'About WeFox Technology',
    keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
    description: 'Professional technical consulting and consulting services',
    zh: {
      title: '关于微狐科技',
      keywords: [...commonKeyworks, '微狐', '微狐科技', '技术咨询', '技术顾问'],
      description: '专业的技术咨询、顾问服务',
    },
  };

  return (
    <Layout meta={meta}>
      <About />
    </Layout>
  );
};

export default withLocale(AboutPage);

export async function unstable_getStaticPaths() {
  return {
    paths: ['en', 'zh'].map(l => ({ params: { lang: l } })),
  };
}

export const unstable_getStaticProps: GetstaticProps = async ({ params }) => {
  const { lang } = params;

  return {
    props: {
      locale: lang,
      translations: locales[lang]['common'],
    },
  };
};
