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
  IconButton,
  Hidden,
  Drawer,
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
import LogoMenu from '~/components/home/LogoMenu';
import { PageMeta, optMeta, metaKeys } from '../src/PageMeta';
import MenuIcon from '@material-ui/icons/Menu';
import { LayoutMenu, useToolbarMenus } from '~/src/menu';
import { useDrawerMenus } from '../src/menu';
interface Props {
  toolbar?: Component;
  maxWidth?: ContainerProps['maxWidth'];
  overrideToolbarRootColor?: boolean;
  meta?: PageMeta;
  menus?: LayoutMenu[];
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
      minHeight: '50vh',
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
  toolbar = null,
  maxWidth = 'md',
  overrideToolbarRootColor = false,
  meta,
  menus,
}) => {
  if (overrideToolbarRootColor) {
    overrideToolbarStyle();
  }
  const classes = useStyles();
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [languageMenu, setLanguageMenu] = React.useState<Element | null>(null);
  const toolbarMenus = useToolbarMenus(menus);
  const drawerMenus = useDrawerMenus(menus);
  return (
    <>
      <Head>
        {metaKeys.map((k, i) => {
          const value = optMeta(k, locale, meta);
          if (value) {
            return <meta key={i} name={k} content={value} />;
          }
          return null;
        })}
        <title>{optMeta('title', locale, meta)}</title>
      </Head>
      <ElevationScroll>
        <AppBar position="sticky">
          <Toolbar>
            <LogoMenu />
            {toolbar}
            {toolbarMenus}
            <div className={classes.grow}></div>
            <LocaleSwitcher />
            <Hidden smUp implementation="css">
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

      <main className={classes.main}>
        <Container className={classes.container} maxWidth={maxWidth}>
          {children}
        </Container>
      </main>
      <Drawer anchor="right" open={open} onBlur={() => setOpen(false)}>
        {drawerMenus}
      </Drawer>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
