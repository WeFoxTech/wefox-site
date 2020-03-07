import * as React from 'react';
import Head from 'next/head';
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  Container,
  useScrollTrigger,
  Box,
} from '@material-ui/core';
import { Footer } from './Footer';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BottomNav } from './BottomNav';
import { Component } from 'react';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useTranslation from '../src/hooks/useTranslation';
import { languageNames, localeNames, Locale } from '../src/translations/config';
import { useRouter } from 'next/router';
import { LocaleContext } from '../src/context/LocaleContext';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ContainerProps } from '@material-ui/core';
import LogoMenu from '~/components/home/LogoMenu'
interface Props {
  title?: string;
  toolbar?: Component;
  maxWidth?: ContainerProps['maxWidth'];
  overrideToolbarRootColor?: boolean;
}

const overrideToolbarStyle = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        background: theme.palette.primary.main,
      },
    }),
  { name: 'MuiToolbar' }
);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      // minHeight: '80vh',
      // background: 'linear-gradient(45deg,#fe5196,#f77062)'
    },
    grow: {
      flex: '1 1 auto',
    },

    container: {
      padding: 0,
    },
  })
);

const ElevationScroll: React.FC = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: typeof window === 'undefined' ? undefined : window,
  });

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  } else {
    console.error('children is not a valid react element');
    return null;
  }
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
  toolbar = null,
  maxWidth = 'md',
  overrideToolbarRootColor = false,
}) => {
  if (overrideToolbarRootColor) {
    overrideToolbarStyle();
  }
  const classes = useStyles();
  const { t, locale } = useTranslation();

  const router = useRouter();

  const [languageMenu, setLanguageMenu] = React.useState<Element | null>(null);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <ElevationScroll>
        <AppBar position="sticky">
          <Toolbar>
            <LogoMenu />
            {toolbar}

            <div className={classes.grow}></div>
            <LocaleSwitcher />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

      <main className={classes.main}>
        <Container className={classes.container} maxWidth={maxWidth}>
          {children}
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
