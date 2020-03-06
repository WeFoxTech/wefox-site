import React from 'react';
import Layout from '~/components/Layout';
import useTranslation from '~/src/hooks/useTranslation';
import { Typography, Divider } from '@material-ui/core';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import Link from '~/src/Link';
import { Mission } from '~/components/home/Mission';
import { TechStacks } from '~/components/home/TechStack';
import { Team } from '~/components/team/Team';
import { ShowCases } from '../../components/cases/Case';
import { Contact } from '~/components/Contact';

const IndexPage: React.FC = () => {
  const { t, locale } = useTranslation();

  return (
    <Layout title={t('l.title')} maxWidth={false} overrideToolbarRootColor={true}>
      <Mission />
      <Divider />

      <TechStacks />
      {/* <Typography>{t('contactMe')} </Typography>

      <Link href="/[lang]/about" as={`/${locale}/about`}>
        {t('aboutLink')}
      </Link> */}
      <Divider />
      <Team />

      <Divider />

      <ShowCases />

      <Divider />

    </Layout>
  );
};

export default withLocale(IndexPage);

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
