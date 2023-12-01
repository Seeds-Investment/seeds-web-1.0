import type { AssetsInterface } from '.';

export const HelloHero: AssetsInterface = {
  src: '/assets/story-boarding/bg-hello.png',
  alt: 'hello-hero-banner'
};

export const LineChart: AssetsInterface = {
  src: '/assets/story-boarding/bg-line.png',
  alt: 'line-chart-graph'
};

export const OnBoardingType1: AssetsInterface = {
  src: '/assets/story-boarding/bg-welcome-seeds.png',
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

export const Trash: AssetsInterface = {
  src: '/assets/images/trash.svg',
  alt: 'trash'
};

export const Logout: AssetsInterface = {
  src: '/assets/story-boarding/logout.svg',
  alt: 'logout'
};

export const EarnXP: AssetsInterface = {
  src: '/assets/story-boarding/earnXp.svg',
  alt: 'earn'
};

export const KopKen: AssetsInterface = {
  src: '/assets/social/KopKen.svg',
  alt: 'kopken'
};

export const SectionOneImageOne: AssetsInterface = {
  src: '/assets/partner/section-one/image-1.svg',
  alt: 'bg'
};

const Images: Record<string, AssetsInterface> = {
  HelloHero,
  Sprout,
  Seeds,
  Sapling,
  Maintenance,
  Trash,
  Sadling,
  Tree,
  LineChart,
  BronzeMedal,
  SilverMedal,
  GoldMedal,
  Logout,
  EarnXP,
  KopKen,
  SectionOneImageOne
};

export default Images;
