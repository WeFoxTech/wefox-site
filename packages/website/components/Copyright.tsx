import { FunctionComponent } from 'react';
import { Typography, Theme, Tooltip, Container } from '@material-ui/core';
import Link from '../src/Link';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    link: {
      paddingLeft: theme.spacing(1),
    },
  })
);

export const Copyright: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.root}>
        &copy; {new Date().getFullYear()}
        <Tooltip title="微狐科技">
          <Link className={classes.link} href="https://vvfox.com">
            vvfox.com
          </Link>
        </Tooltip>
         All Rights Reserved
      </Typography>
    </>
  );
};
