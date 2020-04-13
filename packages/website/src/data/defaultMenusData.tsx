import React from 'react';
import { LayoutMenu } from '~/src/menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import GroupIcon from '@material-ui/icons/Group';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import InfoIcon from '@material-ui/icons/Info';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ToolIcon from '@material-ui/icons/Build';
import { SdcardIcon } from '~/components/icons/Sdcard';
import { BitIcon } from '../../components/icons/Bit';

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
        name: 'toolTextToSpeech',
        icon: KeyboardVoiceIcon,
        linkProps: {
          href: '/tool/text-to-speech',
          scroll: false,
        },
      },
      {
        type: 'link',
        name: 'toolByteConverter',
        icon: SdcardIcon,
        linkProps: {
          href: '/tool/byte-unit-converter',
          scroll: false,
        },
      },
      {
        type: 'link',
        name: 'toolBiteConverter',
        icon: BitIcon,
        linkProps: {
          href: '/tool/bit-unit-converter',
          scroll: false,
        },
      },
      {
        type: 'link',
        name: 'toolTimeConverter',
        icon: AccessTimeIcon,
        linkProps: {
          href: '/tool/time-converter',
          scroll: false,
        },
      },
    ],
  },
  {
    type: 'link',
    name: 'job',
    linkProps: {
      href: '/job/ipfs',
    },
    icon: InfoIcon,
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
