import { Avatar, Card, Typography, Container, GridList, Grid, Link } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Locale } from '../../src/translations/config';
import useTranslation from '../../src/hooks/useTranslation';
import { marginTop, marginBottom } from '../home/spacing';


const teamTitle:{ [key in Locale]: string } = {
  en: 'Our passionate team',
  zh: '我们的团队'
}

const fox = {
  name: 'fox',
  avatar: 'https://s.fox.mn/avatar/fox.png',
  weibo: 'weiboid',
  twitter: 'twiter_id',
};

const data = new Array(10).fill(null).map(e => fox);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(marginTop),
      marginBottom: theme.spacing(marginBottom),
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    teamTitle:{
      paddingBottom: theme.spacing(8),
    },
    avatar: {
      height: theme.spacing(16),
      width: theme.spacing(16),
      '& :hover': {
        height: theme.spacing(17),
        width: theme.spacing(17)
      }
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
      paddingBottom: theme.spacing(3)
    },
    geistWrapper: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
export const Team: React.FC = () => {
  const classes = useStyles();
  const {t, locale} = useTranslation();
  return (
    <Container className={classes.root} maxWidth="md">
      <Typography className={classes.teamTitle} variant="h3"  component="strong">
        {teamTitle[locale]}
      </Typography>
      <Grid className={classes.geistWrapper} container spacing={3}>
        {data.map((e, i) => (
          <Grid key={i} item xs="auto">
            <Card key={i} className={classes.card}>
              <Avatar
                className={classes.avatar}
                variant="circle"
                alt={e.name}
                src={e.avatar}
              ></Avatar>
              <Typography>{e.name}</Typography>
              <Link href={`https://twitter.com/${e.twitter}`}>{ `@${e.twitter}`}</Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
