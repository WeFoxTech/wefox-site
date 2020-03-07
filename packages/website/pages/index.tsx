import React from 'react';
import Head from 'next/head';
import Fox from '~/components/svgs/fox';
import { getInitialLocale } from '../src/translations/getInitialLocale';
import { Container, Box, Typography } from '@material-ui/core';

const Index: React.FC = () => {
  React.useEffect(() => {
    window.location.replace(`/${getInitialLocale()}`);
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Box bgcolor="grey.800" height="100vh">
        <Container maxWidth="sm">
          <Box pt={10} textAlign="center" color="grey.50">
            <Fox />
            <Typography variant="h1">WeFox</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Index;
