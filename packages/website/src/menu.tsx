import { LinkProps } from 'next/link';
import useTranslation from './hooks/useTranslation';
import {
  Hidden,
  Box,
  Link as MuiLink,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from './Link';
import { TranslationKey } from './translations/types';
import grey from '@material-ui/core/colors/grey';
import { Locale } from '~/src/translations/config';

type LayoutMenuType = 'link' | 'button';

interface ButtonMenu extends NormalMenu {
  type: 'button';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface LinkMenu extends NormalMenu {
  type: 'link';
  linkProps: LinkProps;
}

interface NormalMenu {
  name: TranslationKey;
  type: LayoutMenuType;
  icon?: JSX.Element;
}

export type LayoutMenu = ButtonMenu | LinkMenu;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(8),
    },
    toobarMenu: {
      color: grey[50],
      paddingLeft: theme.spacing(4),
    },
  })
);

function withLocale(e: LayoutMenu, locale: Locale): LayoutMenu {
  if (e.type === 'link' && e.linkProps?.href && (e.linkProps.href as string).startsWith('/')) {
    let fixedProps: LinkMenu = {
      ...e,
      linkProps: {
        ...e.linkProps,
        href: `/[lang]${e.linkProps.href}`,
        as: `/${locale}${e.linkProps.href}`,
      },
    };
    return fixedProps;
  }
  return e;
}

export function useToolbarMenus(menus?: LayoutMenu[]) {
  if (!menus) return null;
  const { t, locale } = useTranslation();
  const classes = useStyles();
  return (
    <Hidden implementation="css" only="xs">
      <Box className={classes.root} display="flex" color="grey.50">
        {menus
          .map(e => withLocale(e, locale))
          .map((e, i) => {
            if (e.type === 'link') {
              return (
                <Link className={classes.toobarMenu} key={i} {...e.linkProps}>
                  {t(e.name)}
                </Link>
              );
            } else if (e.type === 'button') {
              return (
                <Button key={i} onClick={e.onClick} startIcon={e.icon}>
                  {t(e.name)}
                </Button>
              );
            }
          })}
      </Box>
    </Hidden>
  );
}

export function useDrawerMenus(menus?: LayoutMenu[]) {
  if (!menus) return null;
  const { t, locale } = useTranslation();

  return (
    <Box minWidth={240}>
      <List>
        {menus
          .map(e => withLocale(e, locale))
          .map((e, i) => {
            if (e.type === 'link') {
              return (
                <Link key={i} {...e.linkProps}>
                  <ListItem button key={i}>
                    {e.icon && <ListItemIcon>{e.icon}</ListItemIcon>}
                    <ListItemText primary={t(e.name)} />
                  </ListItem>
                </Link>
              );
            } else if (e.type === 'button') {
              return (
                <Button key={i} onClick={e.onClick} startIcon={e.icon}>
                  {t(e.name)}
                </Button>
              );
            }
          })}
      </List>
    </Box>
  );
}
