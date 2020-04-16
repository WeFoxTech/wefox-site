import React, { PureComponent, FunctionComponent } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../src/theme';
import { Container, Paper, Box } from '@material-ui/core';
import { LocaleProvider } from '../context/LocaleContext';
import { Locale } from '../translations/config';
import { isLocale, Translations, Namespace } from '../translations/types';
import { LangProps } from './withLocale';
import Layout from '~/components/Layout';
import { PageMeta } from '../PageMeta';

const PostLayout: React.FC<{ meta: PageMeta }> = ({ meta, children }) => {
  return (
    <Layout meta={meta}>
      <Box px={2}>{children}</Box>
    </Layout>
  );
};

export default (meta: PageMeta): React.FC => ({ children }) => {
  return <PostLayout meta={meta}>{children}</PostLayout>;
};
