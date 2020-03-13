import React from 'react';
import Head from 'next/head';
import Fox from '~/components/svgs/fox';
import { getInitialLocale } from '~/src/translations/getInitialLocale';
import { Container, Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { languageNames, localeNames, Locale } from '~/src/translations/config';
import Link from '~/src/Link';
import theme from '~/src/theme';

const Index: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    const locale = getInitialLocale();
    router.push('/[lang]/', `/${locale}/`);
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Box bgcolor={theme.palette.primary.main} minHeight="100vh">
        <Container maxWidth="sm">
          <Box pt={10} px={8} textAlign="center" color="grey.50">
            <Fox />
            <Typography variant="h6">Detecting language for you...</Typography>
            <Typography variant="h1">WeFox</Typography>
            <Typography variant="h5" color="textPrimary" component="noscript">
              The current environment is no script environment, manually select a language
            </Typography>
          </Box>
          {localeNames.map(l => (
            <Box textAlign="center" py={1}>
              <Link
                variant="h5"
                color="textPrimary"
                key={l}
                lang={l}
                href={`/[lang]/`}
                as={`/${l}/`}
              >
                {languageNames[l]}
              </Link>
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default Index;
