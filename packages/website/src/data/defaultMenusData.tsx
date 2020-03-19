import React from 'react';
import { LayoutMenu } from '~/src/menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import GroupIcon from '@material-ui/icons/Group';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import InfoIcon from '@material-ui/icons/Info';
export const menusData: LayoutMenu[] = [
  {
    type: 'link',
    name: 'menuTechstack',
    linkProps: {
      href: '/#techstack',
      scroll: false,
    },
    icon: <ViewModuleIcon color="primary" />,
  },
  {
    type: 'link',
    name: 'menuTeam',
    linkProps: {
      href: '/#team',
      scroll: false,
    },
    icon: <GroupIcon color="primary" />,
  },
  {
    type: 'link',
    name: 'menuCase',
    linkProps: {
      href: '/#case',
      scroll: false,
    },
    icon: <SlideshowIcon color="primary" />,
  },
  {
    type: 'menulist',
    name: 'tools',
    children: [
      {
        type: 'link',
        name: 'textToSpeechTool',
        linkProps: {
          href: '/tool/text-to-speech',
          scroll: false,
        },
      },
    ],
  },
  {
    type: 'link',
    name: 'about',
    linkProps: {
      href: '/about',
    },
    icon: <InfoIcon color="primary" />,
  },
];
