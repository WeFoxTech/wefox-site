import { Avatar, Card, Typography, Container, GridList, Grid, Link } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Locale } from '../../src/translations/config';
import { InlineLocale } from '~/src/translations/types';
import useTranslation from '../../src/hooks/useTranslation';
import { marginTop, marginBottom } from '../home/spacing';
import { Item } from './Item';
import { casesData } from '~/src/data/casesData.tsx';

const caseTitle: InlineLocale<string> = {
  en: 'Our success cases',
  zh: '我们的成功案列',
};

const caseSummary: InlineLocale<string> = {
  en: 'We have successfully helped many businesses and individuals',
  zh: '我们成功帮助过多家企业和个人',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(16),
      marginBottom: theme.spacing(8),
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    teamTitle: {
      paddingBottom: theme.spacing(4),
    },
    teamSummary: {
      paddingBottom: theme.spacing(4),
    },
    avatar: {
      height: theme.spacing(16),
      width: theme.spacing(16),
      '& :hover': {
        height: theme.spacing(17),
        width: theme.spacing(17),
      },
    },
    card: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'relative',
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingBottom: theme.spacing(3),
    },
    geistWrapper: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
export const ShowCases: React.FC = () => {
  const classes = useStyles();
  const { t, locale } = useTranslation();
  return (
    <Container className={classes.root} maxWidth="lg">
      <Typography className={classes.teamTitle} variant="h3" component="strong">
        {caseTitle[locale]}
      </Typography>

      <Typography className={classes.teamSummary}>{caseSummary[locale]}</Typography>
      <Grid className={classes.geistWrapper} container spacing={4}>
        {casesData.map((e, i) => (
          <Item key={i} item={e} />
        ))}
      </Grid>
    </Container>
  );
};
