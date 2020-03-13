import React from 'react';
import Head from 'next/head';
import Fox from '~/components/svgs/fox';
import { getInitialLocale } from '~/src/translations/getInitialLocale';
import { Container, Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { languageNames, localeNames, Locale } from '~/src/translations/config';
import Link from '~/src/Link';

const Index: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    const locale = getInitialLocale();
    router.push('/[lang]/', `/${locale}/`);
    // window.location.replace(`/${locale}`);
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Box bgcolor="grey.400" height="100vh">
        <Container maxWidth="sm">
          <Box pt={10} px={8} textAlign="center" color="grey.50">
            <Fox />
            <Typography variant="h6">Detecting language for you...</Typography>
            <Typography variant="h1">WeFox</Typography>
            <Typography variant="h5" color="error" component="noscript">
              The current environment does not have a script environment, please select the language
              manually
            </Typography>
          </Box>
          {localeNames.map(l => (
            <Box textAlign="center" py={1}>
              <Link variant="h5" key={l} lang={l} href={`/[lang]/`} as={`/${l}/`}>
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
