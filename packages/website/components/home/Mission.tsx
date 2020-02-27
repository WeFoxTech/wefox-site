import useTranslation from '../../src/hooks/useTranslation';
import { Typography, Box, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Locale } from '../../src/translations/config';
import { marginTop, marginBottom } from './spacing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mission: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(marginBottom),
    },
  })
);

const solgan: { [key in Locale]: string } = {
  en: '——Our mission is to open up technical possibilities for you.',
  zh: '——我们专注于为各种领域提供技术咨询服务',
};

const name: { [key in Locale]: string } = {
  en: 'WeFox',
  zh: '微狐',
};

export const Mission: React.FC = () => {
  const { t, locale } = useTranslation();
  const classes = useStyles();

  return (
    <Container className={classes.mission} maxWidth="md">
      <Typography variant="h1" component="strong">
        {name[locale]}
      </Typography>

      <Typography variant="h2" component="strong">
        {solgan[locale]}
      </Typography>
    </Container>
  );
};
