import connectCircle from '@/assets/landing-page/connectCircle.png';
import event1 from '@/assets/landing-page/event1.png';
import event2 from '@/assets/landing-page/event2.png';
import event3 from '@/assets/landing-page/event3.png';
import event4 from '@/assets/landing-page/event4.png';
import card1 from '@/assets/landing-page/s2-card-1.png';
import card2 from '@/assets/landing-page/s2-card-2.png';
import card3 from '@/assets/landing-page/s2-card-3.png';
import s5photo from '@/assets/landing-page/s5-card-image.png';
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
    photo: s5photo,
    gift: 10000000,
    title: 'Anti Rungkad',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date(),
    status: 'paid'
  },
  {
    photo: s5photo,
    gift: 10000000,
    title: 'Anti Rungkad',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date(),
    status: 'paid'
  },
  {
    photo: s5photo,
    gift: 10000000,
    title: 'Anti Rungkad',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date(),
    status: 'paid'
  },
  {
    photo: s5photo,
    gift: 10000000,
    title: 'Anti Rungkad',
    participant: {
      total: 5,
      max: 10
    },
    deadline: new Date(),
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
    name: 'Tournament 1',
    image: event1,
    date: '1 June - 20 June',
    status: 'Paid'
  },
  {
    id: '2',
    name: 'Tournament 3',
    image: event2,
    date: '1 June - 20 June',
    status: 'Paid'
  },
  {
    id: '3',
    name: 'Tournament 3',
    image: event3,
    date: '1 June - 20 June',
    status: 'Paid'
  },
  {
    id: '4',
    name: 'Tournament 4',
    image: event4,
    date: '1 June - 20 June',
    status: 'Paid'
  }
];
