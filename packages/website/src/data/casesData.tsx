type ShowCaseType = 'inc' | 'personal' | 'startup';
export interface ShowCaseDataItem {
  name: string;
  cnName: string;
  type: ShowCaseType;
  desc: string;
  cnDesc: string;
  timeRange: [string, string];
  site?: string;
}

export const casesData: ShowCaseDataItem[] = [
  {
    name: 'Hangzhou Yijian Technology',
    cnName: '杭州亿间科技',
    type: 'inc',
    timeRange: ['2017-04-01T00:00:00.000Z', '2017-05-01T00:00:00.000Z'],
    desc:
      "The company is committed to providing knowledge visualization services, and we have provided them with engineering consulting services. At present, the company's core technology has also joined our advisory group, which can provide you with technical advisory services in the field of VR.",
    cnDesc:
      '该公司致力于提供知识可视化服务，我们帮他们提供了工程方面的咨询服务。目前该公司的核心技术也加入了我们顾问团，可以为你提供VR领域的技术顾问服务。',
  },
  {
    name: 'Hangzhou Yerong Technology',
    cnName: '杭州也容科技',
    type: 'inc',
    timeRange: ['2018-11-01T00:00:00.000Z', '2019-01-01T00:00:00.000Z'],
    desc:
      'Helped the company to set up a product research and development team, and successfully launched a number of apps such as "Baker Welfare", "Catch Catcher" and "Sweet Friends".',
    cnDesc: '帮助公司组建产品研发团队，成功推出《贝克福利》、《口子捕手》、《甜心交友》等多款app。',
  },
  {
    name: 'Hangzhou Tongchuang Network Technology',
    cnName: '杭州同窗网络科技',
    timeRange: ['2019-02-17T00:00:00.000Z', '2019-07-01T00:00:00.000Z'],
    type: 'inc',
    desc:
      'Help the company upgrade from the traditional wedding education industry to a technical service provider with independent product research and development capabilities. Later, he successfully obtained the wedding capital injection, and acquired the "Marriage" product and research and development team.',
    cnDesc:
      '帮助公司从传统的婚庆教育行业升级为具有自主产品研发能力的技术服务商。后来成功得到婚礼纪的注资、并且收购了《婚语》产品和研发团队。',
  },
  {
    timeRange: ['2019-04-01T00:00:00.000Z', '2019-08-01T00:00:00.000Z'],
    name: 'Hangzhou Yuren Technology',
    cnName: '杭州娱人科技',
    type: 'inc',
    desc:
      'Help the company expand the independent R & D app development team from the mobile game transportation business and is currently developing its own products.',
    cnDesc: '帮助公司从手游联运业务扩展出独立自主的app研发团队，目前正在研发自己的产品。',
  },
  {
    timeRange: ['2019-04-01T00:00:00.000Z', '2019-09-27T00:00:00.000Z'],
    name: 'Hangzhou Tanglian Technology',
    cnName: '杭州糖恋科技',
    type: 'inc',
    desc:
      'Help the company\'s "Dating with Friends" app as a technical consultant. The app is currently operating in South Asia, including Taiwan, Hong Kong, and Malaysia.',
    cnDesc: '帮公司的《糖心交友》app担任技术顾问，目前该app在台湾、香港、马来西亚等南亚地区运营。',
  },
  {
    timeRange: ['2019-11-01T00:00:00.000Z', 'now'],
    site: 'http://company.hestech.cn',
    name: 'RocketX Chat',
    cnName: '火箭客服',
    type: 'startup',
    desc:
      'The entrepreneurial team is committed to providing safe, stable and affordable customer service for small, medium and micro enterprises and individuals. We helped the entrepreneurial team to solve some front-end incurable diseases, and encapsulated the desktop with Electron. At present, the core technology of the team has also joined our consultant team, which can provide technical advisory services in the field of im and customer service for you.',
    cnDesc:
      '该创业团队致力于为中小微企业和个体提供安全、稳定、实惠的客服服务。我们帮该创业团队解决一些前端的疑难杂症、以及用Electron封装了桌面端。目前该团队的核心技术也加入了我们的顾问团队，可以为你提供im、客服领域的技术顾问服务。',
  },
  {
    timeRange: ['2020-03-01T00:00:00.000Z', '2020-03-01T00:00:00.000Z'],
    name: 'ZhangYe',
    cnName: '玄晔',
    type: 'personal',
    cnDesc: '她是一名设计师，我们帮她的个人作品集网站发布到互联网上。',
    site: 'https://gexingmcv.com',
    desc:
      'She is a designer and we help her personal portfolio website to be published on the Internet.',
  },
  {
    timeRange: ['2020-01-01T00:00:00.000Z', 'now'],
    name: 'Hangzhou One Inspiration Education',
    cnName: '杭州一点智慧教育',
    type: 'inc',
    cnDesc:
      '一点智慧是一个传统教育行业的内容生成商，主要面向大学生教育，我们帮一点智慧完成线上改造，包括内容运营、注册、支付、后台管理、数据分析等全流程。一点智慧团队只需要专注核心业务。因为出色的架构，我们的解决方案只需要很少的专业知识，并几乎没有额外维护成本。',
    desc:
      'One Inspiration is a content producer in the traditional education industry, which is mainly geared to college student education. We help One Inspiration complete online transformation, including the entire process of content operation, registration, payment, background management, and data analysis. One Inspiration smart team only needs to focus on the core business. Due to the excellent architecture, our solution requires very little expertise and almost no additional maintenance costs.',
  },
];
