import { MenberData } from '../../components/team/Menber';
import FoxBioCn from '~/components/team/FoxBioCn.mdx';
import BaboonBioCn from '~/components/team/BaboonBioCn.mdx';

export const teamData: MenberData[] = [
  {
    id: 'fox',
    name: 'fox', // English name , required
    cnName: undefined, // Chinese name , optional
    site: 'https://fox.mn', // personal website url , optional
    github: 'foxundermoon', // Github username , optional
    weibo: undefined, // weibo id , optional
    twitter: undefined, // twitter id , optional
    avatar: '', // avatar url , optional
    bio: <FoxBioCn />, // bio description , required  string or function Component
    bioCn: <FoxBioCn />, // Chinese bio description , required  string or function Component
  },
  {
    id:'baboon',
    name: 'Baboon',
    cnName: '吴昊',
    site: undefined,
    github: 'baboonwu',
    weibo: undefined,
    twitter: undefined,
    avatar: '',
    bio: <BaboonBioCn />,
    bioCn: <BaboonBioCn />,
  },
  {
    id: 'zhangbo',
    name: 'zhangbo',
    bio: '推荐广告算法专家',
    bioCn: '推荐广告算法专家',
  },
  {
    id: 'hermann',
    name: 'hermann',
    cnName: '青虻',
    site: undefined,
    github: undefined,
    weibo: undefined,
    twitter: undefined,
    avatar: '',
    bio: '浙大博士，对VR领域有多年的研究',
    bioCn: '浙大博士，对VR领域有多年的研究',
  },
  {
    id: 'daizi',
    name: 'daizi',
    cnName: '小袋子',
    site: 'https://www.daizi.me',
    bio: '目前阿里在职iOS工程师',
    bioCn: '目前阿里在职iOS工程师',
  },
  {
    id: 'zikai',
    name: 'zikai',
    cnName: '戴子凯',
    bio: '',
  },
];
