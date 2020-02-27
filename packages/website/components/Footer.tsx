import { FunctionComponent } from 'react';
import { Copyright } from './Copyright';
import { Container, Theme, Link, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Version } from './Version';
import useTranslation from '../src/hooks/useTranslation';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(1),
    },
  })
);
export const Footer: FunctionComponent<Props> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Copyright />

      <Typography component="span">
        <Link target="_blank" href="http://www.beian.miit.gov.cn/">{`浙ICP备16033599号-6`}</Link>
      </Typography>
    </Container>
  );
};
