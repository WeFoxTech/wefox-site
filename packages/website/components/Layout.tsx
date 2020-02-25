import * as React from 'react';
import Link from '../src/Link';
import Head from 'next/head';
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  Container,
  useMediaQuery,
  Tooltip,
  Button,
  MenuItem,
  Divider,
  Box,
  Menu,
} from '@material-ui/core';
import { Footer } from './Footer';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BottomNav } from './BottomNav';
import { Component } from 'react';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useTranslation from '../src/hooks/useTranslation';
import { languageNames, locales, Locale } from '../src/translations/config';
import { useRouter } from 'next/router';
import { LocaleContext } from '../src/context/LocaleContext';
import { LocaleSwitcher } from './LocaleSwitcher';

interface Props {
  title?: string;
  toolbar?: Component;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      // minHeight: '80vh',
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
  const { t, locale } = useTranslation();

  const router = useRouter();
  const {
    locale: { lang },
  } = React.useContext(LocaleContext);
  const handleLocaleChange = (v: Locale) => {
    const regex = new RegExp(`^/(${locales.join('|')})`);
    router.push(router.pathname, router.asPath.replace(regex, `/${v}`));

    setLanguageMenu(null);
  };

  const [languageMenu, setLanguageMenu] = React.useState<Element | null>(null);

  const handleLanguageIconClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    console.log('handleLanguageIconClick ');
    console.log(event.currentTarget);
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = (event: any) => {
    console.log('handleLanguageMenuClose close language menu');
    setLanguageMenu(null);
    console.log(languageMenu);
  };

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

          <LocaleSwitcher />
        </Toolbar>
      </AppBar>

      <main className={classes.main}>
        <Container maxWidth="md">{children}</Container>
      </main>
      <footer>
        <Footer />
      </footer>
      <BottomNav />
    </>
  );
};

export default Layout;
