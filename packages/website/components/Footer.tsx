import {
  Container,
  Theme,
  Typography,
  Grid,
  Tooltip,
  Link as MuiLink,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Version } from './Version';
import Link from '~/src/Link';
import useTranslation from '../src/hooks/useTranslation';
import { Contact } from './Contact';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(1),
    },
  })
);
export const Footer: React.FC = () => {
  const { t } = useTranslation();
  // const classes = useStyles();
  return (
    <Box component="footer" bgcolor="grey.100" pt={8}>
      <Contact />
      <Box clone py={2}>
        <Grid container spacing={1} justify="center">
          <Grid item>
            <Typography component="span">&copy;2016-{new Date().getFullYear()}</Typography>
          </Grid>
          <Grid item>
            <Tooltip title={t('inc.name')}>
              <Link href="https://wefox.tech">wefox.tech</Link>
            </Tooltip>
          </Grid>
          <Grid item>
            <Typography> {t('inc.copyright')}</Typography>
          </Grid>
          <Grid item>
            <Typography component="span">
              <MuiLink
                target="_blank"
                href="https://beian.miit.gov.cn/"
              >{`浙ICP备16033599号-6`}</MuiLink>
            </Typography>
          </Grid>
          <Version />
        </Grid>
      </Box>
    </Box>
  );
};
