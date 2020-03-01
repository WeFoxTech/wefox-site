import React, { PureComponent, FunctionComponent } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { NextPage } from 'next';
import Error from 'next/error';

import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../src/theme';
import { Container, Paper } from '@material-ui/core';
import { Copyright } from '~/components/Copyright';
import { LocaleProvider } from '../context/LocaleContext';
import { Locale } from '../translations/config';
import { getDisplayName } from 'next/dist/next-server/lib/utils';
import { isLocale, Translations, Namespace } from '../translations/types';
import { LangProps } from './withLocale';
import Layout from '~/components/Layout';

interface Meta {
  title: string;
}

const PostLayout: React.FC<{ meta: Meta }> = ({ meta, children }) => {
  return (
    <Layout maxWidth={false}>
      <Container maxWidth="md">{children}</Container>
    </Layout>
  );
};

export default (meta: Meta): React.FC => ({ children }) => {
  return <PostLayout meta={meta}>{children}</PostLayout>;
};
