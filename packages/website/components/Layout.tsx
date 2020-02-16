import * as React from 'react';
import Link from '../src/Link';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Theme, Container, useMediaQuery } from '@material-ui/core';
import { Footer } from './Footer';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BottomNav } from './BottomNav';
import { Component } from 'react';

interface Props {
  title?: string;
  toolbar?: Component;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minHeight: '80vh',
      // background: 'linear-gradient(45deg,#fe5196,#f77062)'
    },
  })
);

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
  toolbar = null,
}) => {
  const classes = useStyles();
  const islargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between('lg', 'xl'));
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>{title}</Typography>
          {toolbar}
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Container maxWidth={islargeScreen ? 'md' : 'sm'}>{children}</Container>
      </main>
      <footer>
        <Footer />
      </footer>
      <BottomNav />
    </>
  );
};

export default Layout;
