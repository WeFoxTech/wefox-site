import React, { ReactElement } from 'react';
import { Card, Avatar, Grid, Typography, Link, Tooltip, Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import SiteIcon from '@material-ui/icons/Language';
import { WeiboIcon } from '../icons/Weibo';
import { MDXComponent } from '~/src/types/mdx';
import useTranslation from '~/src/hooks/useTranslation';
import { ShowCaseDataItem } from '../../src/data/casesData';
import { Site } from '../team/Menber';
import { formatWithOptions } from 'date-fns/fp';
import { differenceInDays } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';
import { Locale } from '../../src/translations/config';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import LinkIcon from '@material-ui/icons/Link';

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
      maxWidth: theme.spacing(48),
    },
  })
);

const timeFormat: (locale: Locale, fixedToday: boolean) => (date: Date) => string = (
  locale,
  fixedToday = false
) => {
  if (locale === 'zh') {
    //  https://date-fns.org/v2.10.0/docs/format
    return formatWithOptions({ locale: zhCN }, fixedToday ? 'yyyy年MMMMdo日' : 'yyyy年MMMM');
  } else {
    return formatWithOptions({ locale: enUS }, fixedToday ? 'MMM dd yyyy' : 'MMMM yyyy');
  }
};

export const Desc: React.FC<{ item: ShowCaseDataItem }> = ({ item }) => {
  const { t, locale } = useTranslation();
  let desc: string;
  if (locale === 'zh' && item.cnDesc) {
    desc = item.cnDesc;
  } else {
    desc = item.desc;
  }
  return <Typography>{desc}</Typography>;
};

const TimeBox: React.FC = ({ children }) => (
  <Box display="inline" pt={1 / 2} mx={2 / 8} color="grey.500">
    <DateRangeIcon color="secondary" fontSize="small" />
    <Typography className="text-with-icon" variant="body2" component="span">
      {children}
    </Typography>
  </Box>
);
const TimeRange: React.FC<{ item: ShowCaseDataItem }> = ({ item }) => {
  let [from, to] = item.timeRange;
  const { t, locale } = useTranslation();
  const rangeDays = differenceInDays(new Date(to === 'now' ? Date.now() : to), new Date(from));
  const fixedToday = rangeDays < 31;
  let since = timeFormat(locale, fixedToday)(new Date(from));
  let end;
  if (to === 'now') {
    if (locale === 'zh') {
      end = '至今';
    } else {
      end = 'nowadays';
    }
  } else {
    end = timeFormat(locale, fixedToday)(new Date(to));
  }

  return (
    <Box display="flex" pb={2} pt={1}>
      <TimeBox> {since}</TimeBox>
      {rangeDays > 2 && (
        <>
          <Box pt={0.5}>
            <TrendingFlatIcon color="disabled" />
          </Box>
          <TimeBox> {end}</TimeBox>
        </>
      )}
    </Box>
  );
};
const Name: React.FC<{ item: ShowCaseDataItem; showLink: boolean }> = ({ item, showLink }) => {
  const { t, locale } = useTranslation();
  let name: string;
  if (locale === 'zh' && item.cnName) {
    name = item.cnName;
  } else {
    name = item.name;
  }
  if (showLink && item.site) {
    return (
      <Link href={item.site} target="_blank">
        <Typography variant="h6" component="strong">
          <LinkIcon />
          {name}
        </Typography>
      </Link>
    );
  } else {
    return (
      <Typography variant="h6" component="strong">
        {name}
      </Typography>
    );
  }
};

export const Item: React.FC<{ item: ShowCaseDataItem }> = ({ item }) => {
  const classes = useStyles();
  const [hover, setHover] = React.useState(false);

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  return (
    <Grid item>
      <Box clone px={2} pb={2} pt={1}>
        <Card
          className={classes.card}
          elevation={hover ? 10 : 1}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          {/* <Avatar
          className={classes.avatar}
          variant="circle"
          alt={data.name}
          src={data.avatar}
        ></Avatar> */}
          <Name item={item} showLink={hover} />

          <TimeRange item={item} />
          {/* <Grid container> */}
          {/* <GitHub id={data.github}> </GitHub> */}
          {/* <Twitter id={data.twitter}> </Twitter> */}
          {/* <Weibo id={data.weibo}> </Weibo> */}
          {/* <Site url={item.site}></Site> */}
          {/* </Grid> */}
          <Desc item={item}></Desc>
        </Card>
      </Box>
    </Grid>
  );
};
