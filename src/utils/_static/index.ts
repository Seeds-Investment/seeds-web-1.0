import appstore from '@/assets/landing-page/appstore.svg';
import email from '@/assets/landing-page/email.png';
import facebook from '@/assets/landing-page/facebook.svg';
import instagram from '@/assets/landing-page/instagram.svg';
import kemenkumham from '@/assets/landing-page/kemenkumham.svg';
import kominfo from '@/assets/landing-page/kominfo.svg';
import linkedin from '@/assets/landing-page/linkedin.svg';
import playstore from '@/assets/landing-page/playstore.svg';
// import telegram from '@/assets/landing-page/telegram.png';
import tiktok from '@/assets/landing-page/tiktok.svg';
import twitter from '@/assets/landing-page/twitter.svg';
import whatsapp from '@/assets/landing-page/whatsapp.svg';
import youtube from '@/assets/landing-page/youtube.svg';
import type { ISeedsInformationList } from '../interfaces/data.interfaces';

export const socialMedia = [
  {
    icon: facebook,
    url: 'https://www.facebook.com'
  },
  {
    icon: linkedin,
    url: 'https://www.linkedin.com/company/finance-seeds/'
  },
  // {
  //   icon: telegram,
  //   url: ''
  // },
  {
    icon: whatsapp,
    url: 'https://wa.me/08118883519'
  },
  {
    icon: instagram,
    url: 'https://instagram.com/seeds_finance'
  },
  {
    icon: twitter,
    url: 'https://twitter.com/seeds_finance'
  },
  {
    icon: tiktok,
    url: 'https://www.tiktok.com/@seeds_finance'
  },
  {
    icon: youtube,
    url: 'https://youtube.com/@seeds1234'
  }
];

export const seedsInformation: ISeedsInformationList = {
  Company: [
    {
      name: 'About Us',
      url: '/about-us'
    }
    // {
    //   name: 'Refferal Program',
    //   url: ''
    // },
    // {
    //   name: 'Circle Program',
    //   url: ''
    // },
    // {
    //   name: 'Competition Program',
    //   url: ''
    // }
  ],
  Legal: [
    {
      name: 'Terms & Conditions',
      url: '/faq-submenu/terms-condition'
    },
    {
      name: 'Privacy Policy',
      url: '/faq-submenu/privacy-policy'
    },
    {
      name: 'Social Guidelines',
      url: '/faq-submenu/social-media-guide'
    }
  ],
  Support: [
    {
      name: 'Ask Seeds',
      url: ''
    },
    {
      name: 'FAQs',
      url: '/faq'
    }
  ],
  'Contact Us': [
    {
      icon: email,
      name: 'info@seeds.finance',
      url: 'mailto:info@seeds.finance'
    },
    {
      icon: whatsapp,
      name: '08118883519',
      url: 'https://api.whatsapp.com/send?phone=628118883519'
    }
  ]
};

export const downloadOurApp = [
  {
    url: 'https://apps.apple.com/id/app/seeds-investing-together/id6443659980',
    icon: appstore,
    rate: '4.9',
    reviews: '250+'
  },
  {
    url: 'https://play.google.com/store/apps/details?id=com.seeds.investment',
    icon: playstore,
    rate: '5.0',
    reviews: '250+'
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
