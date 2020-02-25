import { FunctionComponent } from 'react';
import { projectUrl } from '../src/consts';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link, Theme, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { Edit as EditIcon } from '@material-ui/icons';
import useTranslation from '../src/hooks/useTranslation';
interface EditMeProps {
  path: string;
  title?: string;
  btn?: boolean;
  newtab?: boolean;
}

const basePath = 'packages/website';

const fullBaseUrl = `${projectUrl}/${basePath}`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editMe: {
      paddingTop: 20,
      paddingBottom: 20,
    },
  })
);

export function getEditUrl(path: string) {
  let realPath;
  if (path.startsWith('packages')) {
    realPath = `/${path}`;
  } else if (path.startsWith('/packages')) {
    realPath = path;
  } else if (path.startsWith('/')) {
    realPath = `/${basePath}${path}`;
  } else {
    realPath = `/${basePath}/${path}`;
  }
  return `${projectUrl}/edit/master${realPath}`;
}

export const EditMe: FunctionComponent<EditMeProps> = ({
  path,
  title,
  btn = false,
  newtab = true,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();
  const full = getEditUrl(path);
  const target = newtab ? '_blank' : undefined;
  if (!title) {
    title = t('gh.editMe');
  }

  if (btn) {
    return (
      <Button variant="contained" color="secondary" href={full} target={target}>
        {title}
        {<EditIcon />}
      </Button>
    );
  } else {
    return (
      <Link className={classes.editMe} href={full} target={target}>
        {title}
      </Link>
    );
  }
};
