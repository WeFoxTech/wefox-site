import { MenberData } from '../../components/team/Menber';
import FoxBioCn from '~/components/team/bio/FoxBioCn.mdx';
import FoxBio from '~/components/team/bio/FoxBio.mdx';
import BaboonBioCn from '~/components/team/bio/BaboonBioCn.mdx';
import BaboonBio from '~/components/team/bio/BaboonBio.mdx';
import SamBio from '~/components/team/bio/SamBio.mdx';
import SamBioCn from '~/components/team/bio/SamBioCn.mdx';

const avatarBaseUrl = '//img.wefox.tech/team/avatar';

export const teamData: MenberData[] = [
  {
    id: 'fox',
    name: 'fox', // English name , required
    cnName: undefined, // Chinese name , optional
    site: 'https://fox.mn', // personal website url , optional
    github: 'foxundermoon', // Github username , optional
    weibo: undefined, // weibo id , optional
    twitter: undefined, // twitter id , optional
    email: 'i@fox.mn', //  email address , optional
    tel: '+8613148371687', // tel number , optional
    avatar: `${avatarBaseUrl}/fox_mn.png`, // avatar url , optional
    bio: <FoxBio />, // bio description , required  string or function Component
    bioCn: <FoxBioCn />, // Chinese bio description , required  string or function Component
  },
  {
    id: 'baboon',
    name: 'Baboon',
    cnName: 'Baboon',
    site: undefined,
    github: 'baboonwu',
    weibo: undefined,
    twitter: undefined,
    avatar: `${avatarBaseUrl}/baboon.jpg`,
    bio: <BaboonBio />,
    bioCn: <BaboonBioCn />,
  },
  {
    id: 'lee',
    name: 'Lee',
    cnName: undefined,
    site: undefined,
    github: undefined,
    weibo: undefined,
    twitter: undefined,
    avatar: `${avatarBaseUrl}/jiaye.jpg`,
    bio:
      'Former Baidu senior engineer, has led large-scale machine learning computing facilities, and has extensive optimization experience in large-scale recommendation and advertising business.',
    bioCn:
      '前百度资深工程师，主导过大规模机器学习计算设施，并且在大规模推荐、广告业务有丰富的优化经验。',
  },
  {
    id: 'jambo',
    name: 'jambo',
    cnName: '张波',
    avatar: `${avatarBaseUrl}/jambo.jpg`,
    bio:
      'Recommended advertising algorithm expert. Years of research on internet advertising recommendation algorithms.',
    bioCn: '推荐广告算法专家。对互联网广告推荐算法有多年研究。',
  },
  {
    id: 'hermann',
    name: 'hermann',
    cnName: '青虻',
    site: undefined,
    github: undefined,
    weibo: undefined,
    twitter: undefined,
    avatar: `${avatarBaseUrl}/hermann.jpg`,
    bio: 'Doctor of Zhejiang University, has many years of research in the field of VR.',
    bioCn: '浙大博士，对VR领域有多年的研究。',
  },
  {
    id: 'mackun',
    name: 'MacKun',
    cnName: '麦克坤',
    avatar: `${avatarBaseUrl}/mackun.jpg`,
    github: 'MacOMNI',
    bio:
      'Having many years of experience in the blockchain market, wallet and exchange architecture . Currently  HyperPay mobile leader.',
    bioCn: '多年 区块链行情、钱包、交易所的架构经验,现任HyperPay 移动端技术负责人。',
  },
  {
    id: 'kevin1988',
    name: 'kevin1988',
    cnName: '戴子凯',
    bio:
      'He has worked in listed companies such as Flush, Daily Interactive, etc., and is currently an expert in Harbin cycling algorithms. Big data modeling and visualization for two years, three years of experience in time series data modeling, natural language processing, good at machine learning, deep learning and other technologies. In addition, interest areas include traditional signal processing, computer vision, unsupervised learning, etc.',
    bioCn:
      '先后任职过同花顺、每日互动等上市公司，现任哈啰单车算法专家。  大数据建模和可视化两年，时间序列数据建模、自然语言处理方面三年经验，擅长机器学习、深度学习等技术。此外兴趣面还包括传统信号处理，计算机视觉，无监督学习等。',
    avatar: `${avatarBaseUrl}/zikai.jpg`,
  },
  {
    id: 'steven',
    name: 'Steven🇳🇿',
    cnName: '张潮',
    hidden: false,
    avatar: `${avatarBaseUrl}/steven.jpg`,
    bio:
      'Graduated from Auckland University of Technology, Bachelor of computer and Information science. Working in a local company as front-end developer, know a thing or two about React and related staff.',
    bioCn:
      '毕业于新西兰奥克兰理工大学计算机与信息科学专业，目前在奥克兰一家科技公司做前端开发。擅长Javascript、React 等技术',
  },
  {
    id: 'sam',
    name: 'Sam🇨🇦',
    cnName: 'Sam🇨🇦',
    avatar: `${avatarBaseUrl}/sam.jpg`,
    bio: <SamBio />,
    bioCn: <SamBioCn />,
  },
  {
    id: 'joey',
    name: 'Joey',
    cnName: undefined,
    avatar: `${avatarBaseUrl}/daizi.jpg`,
    site: 'https://www.daizi.me',
    bio:
      'Currently working in a business enterprise iOS engineers with in-depth research in the field iOS.',
    bioCn: '目前某大厂在职iOS工程师，在iOS领域有着深入的研究。',
  },
  {
    id: 'jeffer',
    name: 'Jeffer',
    cnName: undefined,
    avatar: `${avatarBaseUrl}/jeffer.jpg`,
    bio:
      'Currently working Java engineer, has deep research in the field of Android, cloud native.',
    bioCn: '目前在职Java工程师，在Android、云原生领域有着深入的研究。',
  },
  {
    id: 'waterstone',
    name: 'Waterstone',
    cnName: '水石',
    bio:
      'He is currently working on his own business and has worked for many Internet companies such as Ali. He has extensive research and development experience in Android, backend, blockchain, and quantitative trading. He is good at programming languages such as java and python.',
    bioCn:
      '目前在自主创业，曾在阿里等多家互联网公司任职，对安卓，后端，区块链，量化交易有丰富研发经验，擅长java，python等编程语言。',
    avatar: `${avatarBaseUrl}/waterstone.jpg`,
  },
  {
    id: 'kai',
    name: 'Kai',
    avatar: `${avatarBaseUrl}/kai.jpg`,
    bio: 'Mobile development engineer, involving iOS, h5, WeChat applets, etc.',
    bioCn: '移动开发工程师，涉及 iOS、h5、微信小程序等。',
  },
  {
    id: 'aten',
    name: 'Aten',
    cnName: 'Aten',
    avatar: `${avatarBaseUrl}/aten.jpg`,
    site: 'https://github.com/AtenJin',
    bio: 'A blockchain infrastructure developer which have focused on blockchain more then 3 years. Early developer for Substrate blockchain framewrok and is very familiar with Bitcoin, Ethereum, Polkadot Filecoin, etc. The   former Webank developer for blockchain FISCO-BCOS, now working for ChainX and developing a rust version filecoin and miner.',
    bioCn: '3年以上区块链底层开发工程师，[Substrate](https://meiqia.com)区块链框架早期开发者，熟悉Bitcoin，Ethereum，Polkadot，Filecoin等主流区块链。曾在微众银行任职区块链开发，现为ChainX核心开发工程师以及Filecoin的Rust版本Plum及挖矿程序的核心工程师。',
  },
  {
    id: 'hellsam',
    name: 'hellsam',
    cnName: undefined,
    hidden: true,
    avatar: `${avatarBaseUrl}/`,
    bio: '',
    bioCn: '',
  },
];
