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
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from './Link';
import { TranslationKey } from './translations/types';
import grey from '@material-ui/core/colors/grey';
import { Locale } from '~/src/translations/config';
import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';

type LayoutMenuType = 'link' | 'button' | 'menulist';

interface ButtonMenu extends NormalMenu {
  type: 'button';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface LinkMenu extends NormalMenu {
  type: 'link';
  linkProps: LinkProps;
}

interface MenuList extends NormalMenu {
  type: 'menulist';
  children: Array<ButtonMenu | LinkMenu>;
}

interface NormalMenu {
  name: TranslationKey;
  type: LayoutMenuType;
  icon?: JSX.Element;
}

export type LayoutMenu = ButtonMenu | LinkMenu | MenuList;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(8),
    },
    toobarMenu: {
      color: grey[50],
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    menuList: {
      textTransform: 'none',
    },
    childMenu: {
      color: theme.palette.primary.main,
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

function withLinkOrButton(e: LinkMenu | ButtonMenu, i: number, isMenuChild = false) {
  const classes = useStyles();
  const { t, locale } = useTranslation();

  if (e.type === 'link') {
    return (
      <Box clone pt={1} key={isMenuChild ? undefined : i}>
        <Link className={isMenuChild ? classes.childMenu : classes.toobarMenu} {...e.linkProps}>
          {isMenuChild ? e.icon : null}
          <Typography component="span" className={'text-with-icon'}>
            {t(e.name)}
          </Typography>
        </Link>
      </Box>
    );
  } else if (e.type === 'button') {
    return (
      <Box clone pt={1} key={isMenuChild ? undefined : i}>
        <Button key={isMenuChild ? undefined : i} onClick={e.onClick} startIcon={e.icon}>
          {t(e.name)}
        </Button>
      </Box>
    );
  } else {
    return null;
  }
}

export function useToolbarMenus(menus?: LayoutMenu[]) {
  if (!menus) return null;
  const { t, locale } = useTranslation();
  const classes = useStyles();
  const [popoverMenu, setPopoverMenu] = React.useState<{ [key: string]: null | HTMLElement }>({});
  return (
    <Hidden implementation="css" only="xs">
      <Box className={classes.root} display="flex" color="grey.50">
        {menus
          .map(e => withLocale(e, locale))
          .map((e, i) => {
            if (e.type === 'link' || e.type === 'button') {
              return withLinkOrButton(e, i);
            } else if (e.type === 'menulist') {
              const id = `menu-${e.name}`;
              return (
                <React.Fragment key={i}>
                  <Button
                    aria-controls={id}
                    aria-haspopup="true"
                    className={clsx(classes.toobarMenu, classes.menuList)}
                    onClick={ev => setPopoverMenu({ ...popoverMenu, [e.name]: ev.currentTarget })}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    {t(e.name)}
                  </Button>
                  <Menu
                    id={id}
                    anchorEl={popoverMenu[e.name]}
                    keepMounted
                    open={Boolean(popoverMenu[e.name])}
                    onClose={ev => setPopoverMenu({ ...popoverMenu, [e.name]: null })}
                  >
                    {e.children.map((ce, ci) => {
                      return <MenuItem key={ci}>{withLinkOrButton(ce, ci, true)}</MenuItem>;
                    })}
                  </Menu>
                </React.Fragment>
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
            } else if (e.type === 'menulist') {
              return null;
            }
          })}
      </List>
    </Box>
  );
}
