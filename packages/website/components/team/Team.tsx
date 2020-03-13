import { Avatar, Card, Typography, Container, GridList, Grid, Link, Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Locale } from '~/src/translations/config';
import { InlineLocale } from '~/src/translations/types';
import useTranslation from '~/src/hooks/useTranslation';
import { marginTop, marginBottom } from '../home/spacing';
import { Menber, MenberData } from './Menber';
import { teamData } from '~/src/data/teamData';
import clsx from 'clsx';

const teamTitle: InlineLocale = {
  en: 'Our passionate team',
  zh: '我们的团队',
};

const teamSummary: InlineLocale = {
  en:
    'We come from all over the world, have our own job, and engage in technical consulting or consulting work in our spare time.',
  zh: '我们来自世界各地，有着自己的本职工作，业余时间从事技术咨询工作',
};

const data = teamData.filter(e => !e.hidden);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(16),
      marginBottom: theme.spacing(8),
      flexDirection: 'column',
    },
    avatar: {
      height: theme.spacing(16),
      width: theme.spacing(16),
      '& :hover': {
        height: theme.spacing(17),
        width: theme.spacing(17),
      },
    },
  })
);
export const Team: React.FC = () => {
  const classes = useStyles();
  const { t, locale } = useTranslation();
  return (
    <Container component="section" id="team" maxWidth="lg">
      <Box pt={16} pb={8} justifyContent="center" alignItems="center" textAlign="center">
        <Typography variant="h3" component="strong">
          {teamTitle[locale]}
        </Typography>
        <Box clone py={4}>
          <Typography>{teamSummary[locale]}</Typography>
        </Box>

        <Grid container spacing={3} justify="center">
          {data.map((e, i) => (
            <Menber key={i} data={e} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
