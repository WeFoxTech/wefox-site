import useTranslation from '~/src/hooks/useTranslation';
import { Locale } from '~/src/translations/config';
import { Typography, Container, Box, Chip, Grid, IconProps } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { marginTop, marginBottom } from './spacing';
import clsx from 'clsx';
import { InlineLocale } from '~/src/translations/types';
import AndroidIcon from '@material-ui/icons/Android';
import GitHubIcon from '@material-ui/icons/GitHub';
import SearchIcon from '@material-ui/icons/Search';
import { JsIcon } from '../icons/Js';
import { ReactIcon } from '../icons/React';
import { NextJsIcon } from '../icons/NextJs';
import { Html5Icon } from '../icons/Html5';
import { GolangIcon } from '../icons/Golang';
import { DockerIcon } from '../icons/Docker';
import AppleIcon from '@material-ui/icons/Apple';
import { ElasticsearchIcon } from '../icons/Elasticsearch';
import { JavaIcon } from '../icons/Java';
import { K8sIcon } from '../icons/K8s';
import { ElectronIcon } from '../icons/Electron';
import { FilecoinIcon } from '../icons/Filecoin';
import { IpfsIcon } from '../icons/Ipfs';
import { BlockchainIcon } from '../icons/Blockchain';
import { MySqlIcon } from '../icons/MySql';
import { RedisIcon } from '../icons/Redis';
import { PythonIcon } from '../icons/Python';
import { BigdataIcon } from '../icons/Bigdata';
import { DevOpsIcon  } from '../icons/DevOps';
import { CsharpIcon  } from '../icons/Csharp';
import { CplusIcon  } from '../icons/Cplus';
import { TuijianIcon   } from '../icons/Tuijian';
import { MongoDBIcon   } from '../icons/MongoDB';
import { BitcoinIcon   } from '../icons/Bitcoin';
import { VrIcon   } from '../icons/Vr';
import { SpringIcon   } from '../icons/Spring';

type TechStackData = string | [string, React.FC<IconProps>];

const commonTechNames: TechStackData[] = [
  ['Html5', Html5Icon],
  ['javascript', JsIcon],
  ['react', ReactIcon],
  ['next.js', NextJsIcon],
  'TypeScript',
  'JAMStack',
  ['electron', ElectronIcon],
  ['Blockchain',BlockchainIcon],
  ['bitcoin',BitcoinIcon],
  ['ipfs',IpfsIcon],
  ['filecoin',FilecoinIcon],
  ['DevOps',DevOpsIcon],
  ['VR',VrIcon],
  ['docker', DockerIcon],
  ['k8s', K8sIcon],
  ['golang', GolangIcon],
  ['java', JavaIcon],
  'dart',
	'swift',
	['c++',CplusIcon],
  ['Csharp',CsharpIcon],
  'kotlin',
  ['python',PythonIcon],
  ['MySql',MySqlIcon],
  ['Redis',RedisIcon],
  ['Android', AndroidIcon],
  ['iOS', AppleIcon],
  ['MongoDB',MongoDBIcon],
  ['elasticsearch', ElasticsearchIcon],
  ['spring cloud',SpringIcon],
  'flutter',
  'OpenSource',
  ['GitHub Action', GitHubIcon],
];

const techStacks: InlineLocale<TechStackData[]> = {
  en: [...commonTechNames, 'AI',  ['Bigdata',BigdataIcon]],

  zh: [...commonTechNames, ['区块链',BlockchainIcon], ['推荐算法',TuijianIcon], ['大数据',BigdataIcon], ['搜索', SearchIcon]],
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

const Tag: React.FC<{ data: TechStackData }> = ({ data }) => {
  const classes = useStyles();
  let label: string;
  let Icon = null;
  if (Array.isArray(data)) {
    [label, Icon] = data;
  } else {
    label = data;
  }
  return (
    <Grid item xs="auto">
      <Chip
        variant="default"
        icon={Icon ? <Icon fontSize="small" /> : undefined}
        color="primary"
        clickable={true}
        size="medium"
        label={label}
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
            <Tag key={i} data={e} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
