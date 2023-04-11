import card1 from '@/assets/landing-page/s2-card-1.png';
import card2 from '@/assets/landing-page/s2-card-2.png';
import card3 from '@/assets/landing-page/s2-card-3.png';
import s5photo from '@/assets/landing-page/s5-card-image.png';
import user2 from '@/assets/landing-page/user-sample-2.png';
import user1 from '@/assets/landing-page/user-sample.png';
import {
  ICompetitionItem,
  ILastNews
} from '../interfaces/components.interfaces';

export const latestNews: Array<ILastNews> = [
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

export const competitionCardList: Array<ICompetitionItem> = [
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
