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

const Images: Record<string, AssetsInterface> = {
  HelloHero,
  LineChart
};

export default Images;
