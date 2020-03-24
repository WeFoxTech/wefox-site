import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Fab, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ReplayIcon from '@material-ui/icons/Replay';
import useTranslation from '~/src/hooks/useTranslation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(14),
      right: theme.spacing(4),
      '&:hover': {
        backgroundColor: green[300],
      },
    },
  })
);

export const ResetFab: React.FC<{
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  const classes = useStyles();
  const { t, locale } = useTranslation();

  return (
    <Tooltip title={t('reset')}>
      <Fab onClick={onClick} className={classes.fab}>
        <ReplayIcon />
      </Fab>
    </Tooltip>
  );
};
