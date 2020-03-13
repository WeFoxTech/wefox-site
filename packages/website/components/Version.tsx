import { Typography, Box, Tooltip, Divider, Link, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { projectUrl } from '../src/consts';
import useTranslation from '../src/hooks/useTranslation';

interface VlinkProps {
  full: string;
  display?: string;
}

const Vlink: React.FC<VlinkProps> = ({ full, display = full }) => {
  const href = `${projectUrl}/releases/tag/${full}`;
  return (
    <Link href={href} target="_blank" rel="noopener">
      {full}
    </Link>
  );
};

const Slink: React.FC<{ sha: string; display?: string }> = ({
  sha,
  display = sha.substring(0, 7),
}) => {
  const href = `${projectUrl}/commit/${sha}`;
  return (
    <Link href={href} target="_blank">
      {display}{' '}
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'left',
    },
    link: {
      paddingLeft: theme.spacing(1),
    },
    spliter: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
);

export const Version = () => {
  const { t } = useTranslation();

  const version = process.env.VERSION;
  const buildNumber = process.env.BUILD_NUMBER;
  const fullVersion = `${version}.${buildNumber}`;
  const sha = process.env.SHA;

  const classes = useStyles();
  return (
    <>
      {version && (
        <Grid item>
          <Typography component="span">{`${t('version')}:`}</Typography>
          <Tooltip title={`${t('version')}: ${version}  ${t('buildNumber')}: ${buildNumber}`}>
            <Typography component="span">
              <Vlink full={fullVersion} />
            </Typography>
          </Tooltip>
        </Grid>
      )}
      {sha && (
        <Grid item>
          <Typography component="span">{`${t('commit')}:`}</Typography>
          <Tooltip title={`${t('commit')}: ${sha}`}>
            <Typography component="span">
              <Slink sha={sha} />
            </Typography>
          </Tooltip>
        </Grid>
      )}
    </>
  );
};
