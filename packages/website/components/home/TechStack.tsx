import useTranslation from '~/src/hooks/useTranslation';
import { Locale } from '~/src/translations/config';
import { Typography, Container, Box, Chip, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { marginTop, marginBottom } from './spacing';
import clsx from 'clsx';
import { InlineLocale } from '~/src/translations/types';

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

const techStacks: InlineLocale<string[]> = {
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

const techStackTitle: InlineLocale = {
  en: 'Our technology stack',
  zh: '我们的技术栈',
};
const techStackSummary: InlineLocale = {
  en:
    'We have in-depth research in most Internet-related areas, including but not limited to the following',
  zh: '我们在大部分互联网相关领域都有深入研究，包括但不局限于下面这些',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tag: {
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      minWidth: theme.spacing(18),
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
    <Container component="section" id="techstack" maxWidth={'lg'}>
      <Box pt={16} pb={8} justifyContent="center" alignItems="center" textAlign="center">
        <Typography variant="h3">{techStackTitle[locale]}</Typography>

        <Box clone py={4}>
          <Typography>{techStackSummary[locale]}</Typography>
        </Box>

        <Grid container spacing={0} justify="center">
          {techStacks[locale].map((e, i) => (
            <Tag key={i}>{e}</Tag>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
