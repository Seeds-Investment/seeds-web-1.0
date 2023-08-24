import forkoma from '@/assets/landing-page/EVENT-WEB-FORKOMA-UI.png';
import mbti from '@/assets/landing-page/EVENT-WEB-HIMA-MBTI.png';
import stie from '@/assets/landing-page/EVENT-WEB-STIE-TRISAKTI.png';
import tarumanegara from '@/assets/landing-page/EVENT-WEB-TARUMANAGARA.png';
import aisec from '@/assets/landing-page/PLAY-WEB-AIESEC-USU-WEEK-2.png';
import telkom from '@/assets/landing-page/PLAY-WEB-HIMA-MBTI-TELKOM.png';
import johnny from '@/assets/landing-page/PLAY-WEB-JOHNNY-WIDODO.png';
import firda from '@/assets/landing-page/PLAY-WEB-MAIN-BARENG-FIRDA.png';
import connectCircle from '@/assets/landing-page/connectCircle.png';
import card1 from '@/assets/landing-page/s2-card-1.png';
import card2 from '@/assets/landing-page/s2-card-2.png';
import card3 from '@/assets/landing-page/s2-card-3.png';
import user2 from '@/assets/landing-page/user-sample-2.png';
import user1 from '@/assets/landing-page/user-sample.png';

import type {
  ICircleLandingPage,
  ICompetitionItem,
  IEventHighlightLandingPage,
  ILastNews
} from '../interfaces/components.interfaces';

export const latestNews: ILastNews[] = [
  {
    topic: 'Trends',
    title: ' Apple : New fitur from Iphone 13 pro',
    photo: card1,
    user: {
      photo: user1,
      name: 'Robert Hans'
    },
    createdAt: '12.00'
  },
  {
    topic: 'Crypto',
    title: ' Bitcoin : Good news for you! ',
    photo: card2,
    user: {
      photo: user2,
      name: 'Margaretha'
    },
    createdAt: '5.00'
  },
  {
    topic: 'US Stocks',
    title: ' Tesla : Something bigger is coming',
    photo: card3,
    user: {
      photo: user2,
      name: 'Margaretha'
    },
    createdAt: '5.00'
  }
];

export const competitionCardList: ICompetitionItem[] = [
  {
    photo: johnny,
    gift: 1750000,
    title: 'SEEDS X JOHNNY WIDODO',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date('2023-08-24'),
    status: 'paid'
  },
  {
    photo: aisec,
    gift: 1000000,
    title: 'SEEDS X AIESEC USU WEEK 2',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date('2023-08-28'),
    status: 'paid'
  },
  {
    photo: telkom,
    gift: 450000,
    title: 'SEEDS X EDUPRENEUR TELKOM',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date('2023-08-30'),
    status: 'paid'
  },
  {
    photo: firda,
    gift: 500000,
    title: 'SEEDS MAIN BARENG FIRDA',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date('2023-09-04'),
    status: 'paid'
  }
];

export const circleTrendingLandingPage: ICircleLandingPage[] = [
  {
    id: '1',
    image: connectCircle,
    banner:
      'https://seeds-bucket.s3.ap-southeast-1.amazonaws.com/seeds1667480950752GURUCUAN-banner.jpeg',
    name: 'Circle Name 1',
    totalMember: 20,
    totalRating: 10
  },
  {
    id: '2',
    image: connectCircle,
    banner:
      'https://seeds-bucket.s3.ap-southeast-1.amazonaws.com/seeds1667480950752GURUCUAN-banner.jpeg',
    name: 'Circle Name 2',
    totalMember: 20,
    totalRating: 10
  },
  {
    id: '3',
    image: connectCircle,
    banner:
      'https://seeds-bucket.s3.ap-southeast-1.amazonaws.com/seeds1667480950752GURUCUAN-banner.jpeg',
    name: 'Circle Name 3',
    totalMember: 20,
    totalRating: 10
  }
];

export const eventHighlightLandingPage: IEventHighlightLandingPage[] = [
  {
    id: '1',
    name: 'Peningkatan Literasi Mahasiswa',
    image: forkoma,
    date: '1 June - 20 June',
    status: 'Paid'
  },
  {
    id: '2',
    name: 'Kolaborasi SEEDS HIMA MBTI TELKOM',
    image: mbti,
    date: '1 June - 20 June',
    status: 'Paid'
  },
  {
    id: '3',
    name: 'Revolution Bring Back the Euphoria',
    image: stie,
    date: '1 June - 20 June',
    status: 'Paid'
  },
  {
    id: '4',
    name: 'Peningkatan Literasi Financial',
    image: tarumanegara,
    date: '1 June - 20 June',
    status: 'Paid'
  }
];
