import appstore from '@/assets/landing-page/appstore.svg';
import email from '@/assets/landing-page/email.png';
import facebook from '@/assets/landing-page/facebook.svg';
import instagram from '@/assets/landing-page/instagram.svg';
import kemenkumham from '@/assets/landing-page/kemenkumham.svg';
import kominfo from '@/assets/landing-page/kominfo.svg';
import linkedin from '@/assets/landing-page/linkedin.svg';
import playstore from '@/assets/landing-page/playstore.svg';
import telegram from '@/assets/landing-page/telegram.png';
import tiktok from '@/assets/landing-page/tiktok.svg';
import twitter from '@/assets/landing-page/twitter.svg';
import whatsapp from '@/assets/landing-page/whatsapp.svg';
import youtube from '@/assets/landing-page/youtube.svg';
import { ISeedsInformationList } from '../interfaces/data.interfaces';

export const socialMedia = [
  {
    icon: facebook,
    url: 'https://www.facebook.com'
  },
  {
    icon: linkedin,
    url: ''
  },
  {
    icon: telegram,
    url: ''
  },
  {
    icon: whatsapp,
    url: ''
  },
  {
    icon: instagram,
    url: ''
  },
  {
    icon: twitter,
    url: ''
  },
  {
    icon: tiktok,
    url: ''
  },
  {
    icon: youtube,
    url: ''
  }
];

export const seedsInformation: ISeedsInformationList = {
  Company: [
    {
      name: 'About Us',
      url: ''
    },
    {
      name: 'Refferal Program',
      url: ''
    },
    {
      name: 'Circle Program',
      url: ''
    },
    {
      name: 'Competition Program',
      url: ''
    }
  ],
  Legal: [
    {
      name: 'Terms & Conditions',
      url: ''
    },
    {
      name: 'Privacy Policy',
      url: ''
    },
    {
      name: 'Social Guidelines',
      url: ''
    }
  ],
  Support: [
    {
      name: 'Ask Seeds',
      url: ''
    },
    {
      name: 'FAQs',
      url: ''
    }
  ],
  ['Contact Us']: [
    {
      icon: email,
      name: 'info@seeds.finance',
      url: ''
    },
    {
      icon: whatsapp,
      name: '08118883519',
      url: ''
    }
  ]
};

export const downloadOurApp = [
  {
    url: '',
    icon: appstore
  },
  {
    url: '',
    icon: playstore
  },
  {
    url: '',
    icon: kominfo
  },
  {
    url: '',
    icon: kemenkumham
  }
];
