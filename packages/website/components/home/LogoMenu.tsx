import FoxSvg from '~/components/svgs/fox';
import Link from '~/src/Link';
import useTranslation from '~/src/hooks/useTranslation';
import { Box, Typography,  } from '@material-ui/core';
import {  Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>createStyles({
  name:{
    verticalAlign: 'super'
  }

}))

export default () => {
  const { t, locale } = useTranslation();
  const classes = useStyles();
  return (
    <Link href="/[lang]/" as={`/${locale}/`}>
      <Box>
        <FoxSvg width={32} />
        <Box className={classes.name} display="inline-block" clone pl={1} pb={0} color="grey.100" >
          <Typography variant="subtitle1">{t('inc.shortName')}</Typography>
        </Box>
      </Box>
    </Link>
  );
};
