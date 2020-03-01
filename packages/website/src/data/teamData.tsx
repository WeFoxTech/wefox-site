import { MenberData } from '../../components/team/Menber';
import FoxBioCn from '~/components/team/FoxBioCn.mdx';
import BaboonBioCn from '~/components/team/BaboonBioCn.mdx';

export const teamData: MenberData[] = [
  {
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
];
