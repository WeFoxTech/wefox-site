import React from 'react';
import Layout from '~/components/Layout';
import useTranslation from '~/src/hooks/useTranslation';
import { Typography, Divider } from '@material-ui/core';
import withLocale from '~/src/hocs/withLocale';
import { GetstaticProps } from '~/src/types/next';
import locales from '~/src/translations/locales';
import Link from '~/src/Link';
import { Mission } from '~/components/home/Mission';
import { TechStacks } from '~/components/home/TechStack';
import { Team } from '~/components/team/Team';
import { ShowCases } from '~/components/cases/Case';
import { Contact } from '~/components/Contact';
import { PageMeta } from '~/src/PageMeta';
import { LayoutMenu } from '~/src/menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import GroupIcon from '@material-ui/icons/Group';
import SlideshowIcon from '@material-ui/icons/Slideshow';

const menus: LayoutMenu[] = [
  {
    type: 'link',
    name: 'menuTechstack',
    linkProps: {
      href: '#techstack',
    },
    icon: <ViewModuleIcon color="primary" />,
  },
  {
    type: 'link',
    name: 'menuTeam',
    linkProps: {
      href: '#team',
    },
    icon: <GroupIcon color="primary" />,
  },
  {
    type: 'link',
    name: 'menuCase',
    linkProps: {
      href: '#case',
    },
    icon: <SlideshowIcon color="primary" />,
  },
];

const IndexPage: React.FC = () => {
  const { t, locale } = useTranslation();
  const commonKeyworks = ['wefox'];
  const meta: PageMeta = {
    title: 'WeFox Technology',
    keywords: [...commonKeyworks, 'technical consulting', 'Technical Adviser'],
    description: 'Professional technical consulting and consulting services',
    author: 'fox, i@fox.mn',
    zh: {
      title: '微狐科技',
      keywords: [...commonKeyworks, '微狐', '微狐科技', '技术咨询', '技术顾问'],
      description: '专业的技术咨询、顾问服务',
    },
  };

  return (
    <Layout meta={meta} menus={menus} maxWidth={false} overrideToolbarRootColor={true}>
      <Mission />
      <Divider />
      <TechStacks />
      <Divider />
      <Team />
      <Divider />
      <ShowCases />
      <Divider />
    </Layout>
  );
};

export default withLocale(IndexPage);

export async function unstable_getStaticPaths() {
  return {
    paths: ['en', 'zh'].map(l => ({ params: { lang: l } })),
  };
}

export const unstable_getStaticProps: GetstaticProps = async ({ params }) => {
  const { lang } = params;
  return {
    props: {
      locale: lang,
      translations: locales[lang]['common'],
    },
  };
};
