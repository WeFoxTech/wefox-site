import React from 'react';
import { LayoutMenu } from '~/src/menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import GroupIcon from '@material-ui/icons/Group';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import InfoIcon from '@material-ui/icons/Info';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import ToolIcon from '@material-ui/icons/Build';

export const menusData: LayoutMenu[] = [
  {
    type: 'link',
    name: 'menuTechstack',
    linkProps: {
      href: '/#techstack',
      scroll: false,
    },
    icon: ViewModuleIcon,
  },
  {
    type: 'link',
    name: 'menuTeam',
    linkProps: {
      href: '/#team',
      scroll: false,
    },
    icon: GroupIcon,
  },
  {
    type: 'link',
    name: 'menuCase',
    linkProps: {
      href: '/#case',
      scroll: false,
    },
    icon: SlideshowIcon,
  },
  {
    type: 'menulist',
    name: 'tools',
    icon: ToolIcon,
    expanded: true,
    children: [
      {
        type: 'link',
        name: 'textToSpeechTool',
        icon: KeyboardVoiceIcon,
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
    icon: InfoIcon,
  },
];
