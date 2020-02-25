import React from 'react';
import { useRouter } from 'next/router';
import { LocaleContext } from '../src/context/LocaleContext';
import { Tooltip, Button, Typography, Menu, MenuItem } from '@material-ui/core';

import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useTranslation from '../src/hooks/useTranslation';

import { languageNames, localeNames, Locale } from '../src/translations/config';

export const LocaleSwitcher: React.FC = () => {
  const { t, locale } = useTranslation();

  const router = useRouter();
  const {
    locale: { lang },
  } = React.useContext(LocaleContext);

  const [languageMenu, setLanguageMenu] = React.useState<Element | null>(null);

  const handleLocaleChange = React.useCallback(
    (l: Locale) => {
      const regex = new RegExp(`^/(${localeNames.join('|')})`);
      router.push(router.pathname, router.asPath.replace(regex, `/${l}`));
      setLanguageMenu(null);
    },
    [router]
  );

  const handleLanguageIconClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = (event: any) => {
    console.log('handleLanguageMenuClose close language menu');
    setLanguageMenu(null);
  };

  return (
    <>
      <Tooltip title={t('changeLanguage')} enterDelay={300}>
        <Button
          color="inherit"
          aria-owns={languageMenu ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-label={t('changeLanguage')}
          onClick={handleLanguageIconClick}
          data-ga-event-category="AppBar"
          data-ga-event-action="language"
        >
          <LanguageIcon />
          <Typography component="span">{languageNames[lang]}</Typography>
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>

      <Menu
        id="language-menu"
        anchorEl={languageMenu}
        open={Boolean(languageMenu)}
        onClose={handleLanguageMenuClose}
      >
        {localeNames.map(l => (
          <MenuItem key={l} selected={lang === l} onClick={e => handleLocaleChange(l)} lang={l}>
            {languageNames[l]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
