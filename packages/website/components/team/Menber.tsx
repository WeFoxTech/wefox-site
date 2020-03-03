import React, { ReactElement } from 'react';
import { Card, Avatar, Grid, Typography, Link, Tooltip } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import SiteIcon from '@material-ui/icons/Language';
import { WeiboIcon } from '../icons/Weibo';
import { MDXComponent } from '~/src/types/mdx';
import useTranslation from '~/src/hooks/useTranslation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      maxWidth: theme.spacing(32),
    },
    links: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    social: {
      padding: theme.spacing(1),
    },
    twitter: {},
  })
);

export type MenberBio = string | MDXComponent | JSX.Element;
export interface MenberData {
  name: string;
  id: string;
  cnName?: string;
  avatar?: string;
  twitter?: string;
  weibo?: string;
  bio: MenberBio;
  bioCn?: MenberBio;
  site?: string;
  github?: string;
  hidden?: boolean;
}

export const GitHub: React.FC<{ id?: string }> = ({ id }) => {
  const classes = useStyles();

  if (id) {
    return (
      <Grid className={classes.social} item xs="auto">
        <Tooltip title={`github.com/${id}`}>
          <Link target="_blank" href={`https://github.com/${id}`}>
            <GitHubIcon />
          </Link>
        </Tooltip>
      </Grid>
    );
  } else {
    return null;
  }
};

export const Twitter: React.FC<{ id?: string }> = ({ id }) => {
  const classes = useStyles();
  if (id) {
    return (
      <Grid className={clsx(classes.social)} item xs="auto">
        <Tooltip title={`@${id}`}>
          <Link target="_blank" href={`https://twitter.com/${id}`}>
            <TwitterIcon />
          </Link>
        </Tooltip>
      </Grid>
    );
  } else {
    return null;
  }
};

export const Site: React.FC<{ url?: string }> = ({ url }) => {
  const classes = useStyles();
  if (url) {
    const short = url.replace(/https?:\/\//, '');
    return (
      <Grid className={clsx(classes.social)} item xs="auto">
        <Tooltip title={short}>
          <Link target="_blank" href={url}>
            <SiteIcon />
          </Link>
        </Tooltip>
      </Grid>
    );
  } else {
    return null;
  }
};

export const Weibo: React.FC<{ id?: string }> = ({ id }) => {
  const classes = useStyles();
  if (id) {
    return (
      <Grid className={clsx(classes.social)} item xs="auto">
        <Tooltip title={`@${id}`}>
          <Link target="_blank" href={`https://weibo.com/${id}`}>
            <WeiboIcon />
          </Link>
        </Tooltip>
      </Grid>
    );
  } else {
    return null;
  }
};

export const Bio: React.FC<{ menber: MenberData }> = ({ menber }) => {
  const { t, locale } = useTranslation();
  let bio;
  if (locale === 'zh' && menber.bioCn) {
    bio = menber.bioCn;
  } else {
    bio = menber.bio;
  }
  if (typeof bio === 'string') {
    return <Typography>{bio}</Typography>;
  } else if (React.isValidElement(bio)) {
    return <>{bio}</>;
  } else {
    throw new Error('bio must be a string or an element');
  }
};

const Name: React.FC<{ menber: MenberData }> = ({ menber }) => {
  const { t, locale } = useTranslation();
  let name: string;
  if (locale === 'zh' && menber.cnName) {
    name = menber.cnName;
  } else {
    name = menber.name;
  }

  return (
    <Typography variant="h5" component="strong">
      {name}
    </Typography>
  );
};
export interface MenberProps {
  data: MenberData;
}

export const Menber: React.FC<MenberProps> = ({ data }) => {
  const classes = useStyles();

  const [hover, setHover] = React.useState(false);

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  return (
    <Grid item xs="auto">
      <Card
        className={classes.card}
        elevation={hover ? 10 : 1}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <Avatar
          className={classes.avatar}
          variant="circle"
          alt={data.name}
          src={data.avatar}
        ></Avatar>
        <Name menber={data} />
        <Grid container className={classes.links}>
          <GitHub id={data.github}> </GitHub>
          <Twitter id={data.twitter}> </Twitter>
          <Weibo id={data.weibo}> </Weibo>
          <Site url={data.site}></Site>
        </Grid>
        <Bio menber={data}></Bio>
      </Card>
    </Grid>
  );
};
