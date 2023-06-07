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

const Images: Record<string, AssetsInterface> = {
  HelloHero,
  LineChart
};

export default Images;
