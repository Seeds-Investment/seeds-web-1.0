import type { AssetsInterface } from '.';

export const HelloHero: AssetsInterface = {
  src: '/assets/images/hello-hero-banner.png',
  alt: 'hello-hero-banner'
};

export const LineChart: AssetsInterface = {
  src: '/assets/images/line-chart.png',
  alt: 'line-chart-graph'
};

export const OnBoardingType1: AssetsInterface = {
  src: '/assets/images/congrats-onboarding-1.png',
  alt: 'onboarding-type-1'
};

export const BronzeMedal: AssetsInterface = {
  src: '/assets/images/bronze-medal-1.png',
  alt: 'bronze-medal'
};

export const SilverMedal: AssetsInterface = {
  src: '/assets/images/silver-medal-1.png',
  alt: 'silver-medal'
};

export const GoldMedal: AssetsInterface = {
  src: '/assets/images/gold-medal-1.png',
  alt: 'gold-medal'
};

export const Sprout: AssetsInterface = {
  src: '/assets/images/sprout.svg',
  alt: 'sprout'
};

export const Seeds: AssetsInterface = {
  src: '/assets/images/seeds.svg',
  alt: 'seeds'
};
export const Sadling: AssetsInterface = {
  src: '/assets/images/seedling.svg',
  alt: 'sadling'
};
export const Sapling: AssetsInterface = {
  src: '/assets/images/sapling.svg',
  alt: 'sapling'
};
export const Tree: AssetsInterface = {
  src: '/assets/images/tree.svg',
  alt: 'tree'
};

export const Maintenance: AssetsInterface = {
  src: '/assets/images/maintenance.svg',
  alt: 'maintenance'
};

const Images: Record<string, AssetsInterface> = {
  HelloHero,
  Sprout,
  Seeds,
  Sapling,
  Maintenance,
  Sadling,
  Tree,
  LineChart,
  BronzeMedal,
  SilverMedal,
  GoldMedal
};

export default Images;
