import * as React from 'react';
import Layout from '../../components/Layout';
import About from '../../components/section/About.mdx';
import withLocale from '../../src/hocs/withLocale';
import { GetstaticProps } from '../../src/types/next';
import locales from '../../src/translations/locales'
import useTranslation from '../../src/hooks/useTranslation';


const AboutPage = () =>{
 const {t} =   useTranslation()

 return (
  <Layout title={t('inc.name')}>
    <About />
  </Layout>
);
} 

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
      locale:  lang,
      translations: locales[lang]['common'],
    },
  };
};
