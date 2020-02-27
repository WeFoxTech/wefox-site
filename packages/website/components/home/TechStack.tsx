import useTranslation from '../../src/hooks/useTranslation';
import { Locale } from '../../src/translations/config';
import { Typography, Container, Box, Chip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { marginTop, marginBottom } from './spacing';

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
  'csharp',
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

  zh: ['区块链', 'AI人工智能', '大数据', '算法', '搜索', ...commonTechNames],
};

const techStackTitle: { [key in Locale]: string } = {
  en: 'Our technology stack',
  zh: '我们的技术栈',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(marginTop),
      marginBottom: theme.spacing(marginBottom),
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    tag: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      padding: '10px 10px 10px 10px',
    },
  })
);

const Tag: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Chip
      variant="default"
      color="secondary"
      clickable={true}
      size="medium"
      label={children}
      className={classes.tag}
    >
      {/* <Typography className={classes.tag} variant="h3" component="span"> */}
      {/* {children} */}
      {/* </Typography> */}
    </Chip>
  );
};

export const TechStacks: React.FC = () => {
  const { t, locale } = useTranslation();
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography variant="h3">{techStackTitle[locale]}</Typography>
      <div>
        {techStacks[locale].map((e, i) => (
          <Tag key={i}>{e}</Tag>
        ))}
      </div>
    </Container>
  );
};
