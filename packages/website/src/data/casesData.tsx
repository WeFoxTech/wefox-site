type ShowCaseType = 'inc' | 'personal';
export interface ShowCaseDataItem {
  name: string;
  cnName: string;
  type: ShowCaseType;
  desc: string;
  cnDesc: string;
}

export const casesData: ShowCaseDataItem[] = [
  {
    name: 'Hangzhou Yerong Technology',
    cnName: '杭州也容科技',
    type: 'inc',
    desc:
      'Helped the company to set up a product research and development team, and successfully launched a number of apps such as "Baker Welfare", "Catch Catcher" and "Sweet Friends".',
    cnDesc: '帮助公司组建产品研发团队，成功推出《贝克福利》、《口子捕手》、《甜心交友》等多款app。',
  },
  {
    name: 'Hangzhou Tongchuang Network Technology',
    cnName: '杭州同窗网络科技',
    type: 'inc',
    desc:
      'Help the company upgrade from the traditional wedding education industry to a technical service provider with independent product research and development capabilities. Later, he successfully obtained the wedding capital injection, and acquired the "Marriage" product and research and development team.',
    cnDesc:
      '帮助公司从传统的婚庆教育行业升级为具有自主产品研发能力的技术服务商。后来成功得到婚礼纪的注资、并且收购了《婚语》产品和研发团队。',
  },
  {
    name: 'Hangzhou Yuren Technology',
    cnName: '杭州娱人科技',
    type: 'inc',
    desc:
      'Help the company expand the independent R & D app development team from the mobile game transportation business and is currently developing its own products.',
    cnDesc: '帮助公司从手游联运业务扩展出独立自主的app研发团队，目前正在研发自己的产品。',
  },
  {
    name: 'Hangzhou Tanglian Technology',
    cnName: '杭州糖恋科技',
    type: 'inc',
    desc:
      'Help the company\'s "Dating with Friends" app as a technical consultant. The app is currently operating in South Asia, including Taiwan, Hong Kong, and Malaysia.',
    cnDesc: '帮公司的《糖心交友》app担任技术顾问，目前该app在台湾、香港、马来西亚等南亚地区运营。',
  },
  {
    name: 'ZhangYe',
    cnName: '玄晔',
    type: 'personal',
    cnDesc: '她是一名设计师，我们帮她的个人作品集网站，发布到互联网上。',
    desc:
      'She is a designer and we help her personal portfolio website to be published on the Internet.',
  },
];
