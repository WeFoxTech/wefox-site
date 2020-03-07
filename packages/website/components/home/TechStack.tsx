import useTranslation from '../../src/hooks/useTranslation';
import { Locale } from '../../src/translations/config';
import { Typography, Container, Box, Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { marginTop, marginBottom } from './spacing';
import clsx from 'clsx';

const commonTechNames = [
  'Blockchain',
  'bitcoin',
  'ipfs',
  'filecoin',
  'DevOps',
  'VR',
  'docker',
  'k8s',
  'JAMStack',
  'TypeScript',
  'golang',
  'java',
  'dart',
  'swift',
  'C#',
  'javascript',
  'kotlin',
  'python',
  'MySql',
  'Redis',
  'Android',
  'iOS',
  'MongoDB',
  'elasticsearch',
  'spring cloud',
  'next.js',
  'react',
  'flutter',
  'OpenSource',
  'GitHub Action',
];

const techStacks: { [key in Locale]: string[] } = {
  en: [
    'AI',
    'docker',
    'k8s',
    'DevOps',
    'Bigdata',
    'react',
    'next.js',
    'electron',
    'elasticsearch',
    'spring cloud',
    ...commonTechNames,
  ],

  zh: ['区块链', '推荐算法', '大数据', '搜索', ...commonTechNames],
};

const techStackTitle: { [key in Locale]: string } = {
  en: 'Our technology stack',
  zh: '我们的技术栈',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleWraper: {
      marginTop: theme.spacing(marginTop),
      marginBottom: theme.spacing(8),
    },
    title: {
      paddingBottom: marginTop,
    },
    tag: {
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      minWidth: theme.spacing(18),
    },
    tagWraper: {
      position: 'relative',
      paddingBottom: theme.spacing(8),
    },
    center: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const Tag: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid item xs="auto">
      <Chip
        variant="default"
        color="primary"
        clickable={true}
        size="medium"
        label={children}
        className={classes.tag}
      ></Chip>
    </Grid>
  );
};

export const TechStacks: React.FC = () => {
  const { t, locale } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Container className={clsx(classes.center, classes.titleWraper)} maxWidth={'lg'}>
        <Typography className={classes.title} variant="h3">
          {techStackTitle[locale]}
        </Typography>
      </Container>

      <Container maxWidth="lg">
        <Grid container className={clsx(classes.tagWraper, classes.center)}>
          {techStacks[locale].map((e, i) => (
            <Tag key={i}>{e}</Tag>
          ))}
        </Grid>
      </Container>
    </>
  );
};
